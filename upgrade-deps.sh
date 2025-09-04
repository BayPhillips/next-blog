#!/usr/bin/env bash
# File: upgrade-deps.sh
# Updated to continue on errors and log failures

# Do **not** exit on failures – use `set -u` and `set -o pipefail` only
set -u -o pipefail

log() {
  echo "$1"
}

ROOT=$(pwd)
REPORT="${ROOT}/UPGRADE_REPORT.md"
PACKAGE_JSON="${ROOT}/package.json"
LOCK_FILE="${ROOT}/package-lock.json"

# Initialize or append to report
if [[ ! -f "$REPORT" ]]; then
  echo "# Dependency Upgrade Report" > "$REPORT"
  echo "" >> "$REPORT"
  printf '| Package | Old | New | Result | Notes |
' >> "$REPORT"
  printf '|---------|-----|-----|--------|-------|
' >> "$REPORT"
fi

# Grab dependency names (only dependencies, not devDependencies)
# Grab dependency names as an array
IFS=$'\n' read -ra DEPENDENCIES < <$PACKAGE_JSON < <(jq -r '.dependencies | keys[]');

upgrade_package() {
  local pkg="$1"
  echo "\n## Upgrading $pkg …"

  local old_version
  old_version=$(jq -r ".dependencies[\"$pkg\"]" "$PACKAGE_JSON" | tr -d '"')
  if [[ "$old_version" == "null" ]]; then
    log "Skipping $pkg – not found in dependencies."
    return
  fi

  local latest
  latest=$(npm view "$pkg" version 2>/dev/null || echo "")
  if [[ -z "$latest" ]]; then
    log "❌ $pkg – could not resolve latest version."
    echo "| $pkg | $old_version | N/A | ❌ | Could not resolve latest |" >> "$REPORT"
    return
  fi

  # Back up package files
  git stash push -m "temp backup before $pkg upgrade" -- "$PACKAGE_JSON" "$LOCK_FILE" >/dev/null || true

  # Update package.json to exact version
  jq --arg p "$pkg" --arg v "$latest" '.dependencies[$p] = $v' "$PACKAGE_JSON" > "${PACKAGE_JSON}.tmp" && mv "${PACKAGE_JSON}.tmp" "$PACKAGE_JSON"

  # Install the specific package (no audit)
  log "Installing $pkg@$latest"
  npm install "$pkg@$latest" --no-audit >/dev/null || true

  # Install everything (clean install)
  log "Running npm ci …"
  npm ci --no-audit || true

  local notes=""
  local GIT_RESULT="❌"

  # Build
  if npm run build --silent; then
    # e2e tests
    if npm run test:e2e --silent; then
      notes="success"
      GIT_RESULT="✅"
      log "✅ $pkg upgraded to $latest – build & tests passed."
    else
      notes="tests failed"
      log "❌ e2e tests failed after upgrading $pkg."
    fi
  else
    notes="build failed"
    log "❌ Build failed after upgrading $pkg."
  fi

  if [[ "$GIT_RESULT" == "✅" ]]; then
    git add "$PACKAGE_JSON" "$LOCK_FILE"
    git commit -m "chore(deps): bump $pkg from $old_version to $latest" --no-edit
  else
    log "Reverting $pkg upgrade."
    git stash pop --quiet || true
  fi

  # Append to report
  echo "| $pkg | $old_version | $latest | $GIT_RESULT | $notes |" >> "$REPORT"
}

# Main loop
for pkg in "${DEPENDENCIES[@]}"; do
  upgrade_package "$pkg"
done

log "\nUpgrade finished. See $REPORT for details."
