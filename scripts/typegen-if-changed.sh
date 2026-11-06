#!/usr/bin/env sh
# Runs Sanity typegen only when its inputs (schemas, GROQ queries, CLI
# config) changed since the last run. The hash stamp (.typegen-stamp) is
# committed so CI and Vercel builds skip the ~25s schema extract when
# nothing relevant changed. Run `npm run typegen` manually to force it,
# e.g. after a schema deploy that did not touch this repo.
set -eu

hash_inputs() {
  {
    find sanity/schemas -type f -exec cksum {} +
    grep -rl defineQuery app sanity lib --include='*.ts' --include='*.tsx' 2>/dev/null | sort | xargs cksum
    cksum sanity.cli.ts
  } | sort | cksum | cut -d' ' -f1
}

stamp=.typegen-stamp
current=$(hash_inputs)

if [ -f "$stamp" ] && [ -f sanity.types.ts ] && [ "$(cat "$stamp")" = "$current" ]; then
  echo "typegen: schema and queries unchanged, skipping"
  exit 0
fi

npm run typegen
echo "$current" > "$stamp"
