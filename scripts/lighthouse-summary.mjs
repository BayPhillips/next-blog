#!/usr/bin/env node
// Turns Lighthouse CI's filesystem output into a Markdown table.
//
//   node scripts/lighthouse-summary.mjs <reportsDir> [baselineReportsDir]
//
// With a baseline (e.g. production), each cell also shows the change from it.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [reportsDir = '.lighthouseci/reports', baselineDir] = process.argv.slice(2);

const columns = [
  { label: 'Perf', get: (lhr) => lhr.categories.performance?.score, kind: 'score' },
  { label: 'A11y', get: (lhr) => lhr.categories.accessibility?.score, kind: 'score' },
  { label: 'BP', get: (lhr) => lhr.categories['best-practices']?.score, kind: 'score' },
  { label: 'SEO', get: (lhr) => lhr.categories.seo?.score, kind: 'score' },
  { label: 'FCP', get: (lhr) => lhr.audits['first-contentful-paint']?.numericValue, kind: 'ms' },
  { label: 'LCP', get: (lhr) => lhr.audits['largest-contentful-paint']?.numericValue, kind: 'ms' },
  { label: 'TBT', get: (lhr) => lhr.audits['total-blocking-time']?.numericValue, kind: 'ms' },
  { label: 'CLS', get: (lhr) => lhr.audits['cumulative-layout-shift']?.numericValue, kind: 'cls' },
  { label: 'SI', get: (lhr) => lhr.audits['speed-index']?.numericValue, kind: 'ms' },
  { label: 'Weight', get: (lhr) => lhr.audits['total-byte-weight']?.numericValue, kind: 'kb' },
  { label: 'JS', get: (lhr) => scriptBytes(lhr), kind: 'kb' },
];

// Higher is better for scores; lower is better for everything else.
const format = {
  score: (v) => String(Math.round(v * 100)),
  ms: (v) => (v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`),
  cls: (v) => v.toFixed(3),
  kb: (v) => `${Math.round(v / 1024)}KB`,
};
const deltaFormat = {
  score: (d) => `${d > 0 ? '+' : ''}${Math.round(d * 100)}`,
  ms: (d) => `${d > 0 ? '+' : ''}${Math.round(d)}ms`,
  cls: (d) => `${d > 0 ? '+' : ''}${d.toFixed(3)}`,
  kb: (d) => `${d > 0 ? '+' : ''}${Math.round(d / 1024)}KB`,
};
// Changes smaller than this are run-to-run noise, so don't flag them.
const noise = { score: 0.03, ms: 100, cls: 0.01, kb: 5 * 1024 };

function scriptBytes(lhr) {
  const items = lhr.audits['resource-summary']?.details?.items ?? [];
  return items.find((item) => item.resourceType === 'script')?.transferSize;
}

// Lighthouse CI marks the median run of each URL as representative.
function loadRuns(dir) {
  const manifestPath = join(dir, 'manifest.json');
  if (!existsSync(manifestPath)) {
    throw new Error(`No Lighthouse CI manifest at ${manifestPath}. Run \`npm run perf\` first.`);
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const runs = new Map();
  for (const entry of manifest.filter((e) => e.isRepresentativeRun)) {
    const lhr = JSON.parse(readFileSync(entry.jsonPath, 'utf8'));
    runs.set(new URL(entry.url).pathname, lhr);
  }
  return runs;
}

function cell(column, lhr, baselineLhr) {
  const value = column.get(lhr);
  if (value == null) return '–';
  let text = format[column.kind](value);
  const base = baselineLhr && column.get(baselineLhr);
  if (base != null) {
    const delta = value - base;
    if (Math.abs(delta) >= noise[column.kind]) {
      const better = column.kind === 'score' ? delta > 0 : delta < 0;
      text += ` (${better ? '🟢' : '🔴'} ${deltaFormat[column.kind](delta)})`;
    }
  }
  return text;
}

const runs = loadRuns(reportsDir);
const baseline = baselineDir && existsSync(join(baselineDir, 'manifest.json')) ? loadRuns(baselineDir) : null;
const anyLhr = runs.values().next().value;

const lines = [];
lines.push(`| Page | ${columns.map((c) => c.label).join(' | ')} |`);
lines.push(`| --- | ${columns.map(() => '---:').join(' | ')} |`);
for (const [path, lhr] of runs) {
  lines.push(`| \`${path}\` | ${columns.map((c) => cell(c, lhr, baseline?.get(path))).join(' | ')} |`);
}
lines.push('');
const formFactor = anyLhr?.configSettings?.formFactor ?? 'mobile';
lines.push(
  `<sub>Median of each URL's runs · ${formFactor} · Lighthouse ${anyLhr?.lighthouseVersion ?? '?'}` +
    (baseline ? ' · changes are against production; smaller changes are hidden as noise' : '') +
    '</sub>',
);

console.log(lines.join('\n'));
