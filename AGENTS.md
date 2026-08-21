## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project rules (read before editing content)

This site publishes an editorial policy at `/methodology` and enforces it in the
build. Before changing anything under `src/content/`, understand that:

- **Every rule on `/methodology` has a matching check.** The Zod schemas in
  `src/content.config.ts` enforce the structural ones; `scripts/lint-content.mjs`
  enforces the prose ones. If you change a rule, change both the check and the
  published page, or they drift apart and the page becomes a lie.
- **No dosing, ever.** No `10 mg`, no frequencies, nowhere.
- **No efficacy claims.** Entries describe mechanisms and cite evidence. They do
  not say something works, helps, treats, or is effective.
- **Never invent a citation.** Every `pmid` must be a real PubMed ID whose URL
  matches, and every trial status must come from ClinicalTrials.gov or the
  sponsor. Verify with the E-utilities and ClinicalTrials.gov v2 APIs rather
  than from memory.
- **`lastVerified` means a human opened the sources.** Bumping the date without
  re-reading them defeats the entire freshness mechanism.

Run `npm run validate` before considering any content change done.

## If the food table goes blank in dev

Changing `astro.config.mjs` while the dev server is running invalidates Vite's
dependency optimisation cache. The server restarts, but a browser tab held open
across the restart can keep a stale reference, and the island then dies with
`TypeError: _jsxDEV is not a function`. The dev server also logs
`The collection "foods" does not exist or is empty` when its content store is
stale.

Fix: `npm run dev:clean`.

Note that the error boundary in `FoodTable.tsx` does **not** catch this. That
boundary protects against the island throwing during render; this failure is the
JSX factory itself being undefined, so constructing the fallback element throws
too. It is a dev-only failure — production builds are unaffected.
