# Performance benchmarking

The site is benchmarked with [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci). It audits five representative pages: the home page, the post list, one post, the about page and a tag page. Each page runs 3 times and the median run is reported. Settings live in [`lighthouserc.cjs`](../lighthouserc.cjs).

## Running locally

```bash
npm run perf:build && npm run perf   # local production server, mobile throttling
npm run perf:desktop                 # same, desktop settings
npm run perf:prod                    # audit https://www.bayphillips.com
```

To audit any deployment, set `LHCI_BASE_URL`, for example `LHCI_BASE_URL=https://example.vercel.app npm run perf`.

Each run prints a summary table. The full HTML reports are written to `.lighthouseci/reports/`; open one to see Lighthouse's specific suggestions.

`perf:build` builds with the `published` Sanity perspective, as production does. A plain `npm run build` uses `.env.local`, which reads drafts and adds invisible stega markers to every string; that makes the HTML about four times larger and the numbers misleading. Local results come from your machine, so use them to compare before and after a change, not as absolute numbers.

## In CI

[`.github/workflows/lighthouse.yml`](../.github/workflows/lighthouse.yml) runs in three cases:

- **Every successful Vercel preview deployment.** It audits the preview and production, then posts one comment on the PR comparing them. The comment is updated on each deploy. 🟢 and 🔴 mark changes bigger than normal run-to-run noise.
- **Weekly, on production.** The job summaries in the Actions tab become a history of how the site performs over time.
- **Manually**, from the Actions tab, against any URL.

The HTML reports are uploaded as a workflow artifact and kept for 30 days.

### Protected previews

If Vercel Deployment Protection is on, previews redirect to a login page. To audit them:

1. Create a secret under Vercel → Project Settings → Deployment Protection → Protection Bypass for Automation.
2. Save it as the `VERCEL_AUTOMATION_BYPASS_SECRET` repository secret on GitHub.

Without the secret, the workflow fails with an error that explains this.

## Budgets

The assertions in `lighthouserc.cjs` are warnings only, so a noisy run never blocks a merge. They cover:

- category scores
- LCP ≤ 2.5s
- CLS ≤ 0.1
- TBT ≤ 200ms
- page weight ≤ 1MB

Once the site consistently meets a budget, change it to `'error'` to lock in the gain.
