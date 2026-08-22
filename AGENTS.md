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

## Committing when another agent is working in the same tree

**Never `git add -A` or `git add .` here.** Another agent writes content into
this worktree, and its in-progress entries have been swept into a commit and
deployed that way once already. Stage explicit paths:

```
git add src/content/medications/foo.md src/lib/bar.ts
```

Before committing, run `git status --porcelain` and account for every line. If a
file appeared that you did not write, leave it — or verify it fully first and say
in the message that you did.

## Asserting an absence

The schema forces a claim to be cited. It cannot force a search for evidence
that was assumed away, so "there is no controlled evidence for X" is the one
sentence no check on this site can catch. Three such sentences shipped and were
false. Before writing one, search for the thing you are claiming does not
exist.

## If an island goes blank in dev

Symptom: the server-rendered content paints, then vanishes a fraction of a
second later. The dev server log shows
`TypeError: _jsxDEV is not a function`.

Cause: Vite discovering `react/jsx-dev-runtime` lazily and re-optimising
dependencies mid-session. A browser tab held open across that pass can end up
with the runtime resolved to a half-initialised module, so `jsxDEV` is
undefined and the island dies on its first JSX call — after the SSR markup has
already painted, which is why it appears and then disappears.

`astro.config.mjs` pins those runtimes in `optimizeDeps.include`, which prevents
the mid-session re-optimisation. **Do not remove that block.** If it regresses
anyway, `npm run dev:clean` clears both caches.

Two things worth knowing:

- The error boundary in `FoodTable.tsx` does **not** catch this, and never
  could. It protects against the island throwing during render; here the JSX
  factory itself is undefined, so constructing the fallback element throws on
  the same line.
- Production builds have never been affected. Before concluding an island is
  broken, check the built output — `npm run build && npm run preview` — rather
  than trusting the dev server.
