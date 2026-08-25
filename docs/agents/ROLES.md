# Who does what

Three agents work on this repo. The split is not "three seats felt right" — it
comes from the error record. Codex found four errors in Claude's content, and
**every one was an unsourced absence or an unchecked categorical claim. None was
a bad citation.** Different failures need different catchers.

## Three failure classes

| Failure | Example | Caught by |
| --- | --- | --- |
| Wrong identifier | PMID resolves to a different paper | `npm run verify:sources` |
| Right source, wrong claim | cited paper does not support the route or population as written | an agent reading the source |
| **No source at all** | "there is no controlled evidence for X" | adversarial search only |

Note what this means: the script defends a flank that has never been breached
here. It is still worth having — it makes bulk landings safe and costs nothing
after it is written — but it would not have caught a single error that actually
occurred. Those were all class 3.

## Roles

**Codex — implementation and source interpretation.** Owns the schema, the
vocabularies, and content entries. Opens primary sources and decides what they
support. Runs validation and browser QA. Commits.

**Claude — editorial review and product critique.** One consolidated pass over
the diff: patient-facing clarity, misleading labels, information architecture,
whether the published rules on `/methodology` still match the checks. Does not
re-implement what Codex has written.

**Gemini — falsification.** Bounded brief, reports only, never writes repo
files:

> Find categorical or absence claims in published medication and supplement
> content. Search specifically for evidence that could contradict them. Do not
> edit files or propose unrelated treatments. Report only counterevidence, the
> claim affected, primary sources, and confidence.

Not open-ended discovery. The backlog already holds more candidates than are
being built; the shortage is implementation and claim accuracy, not ideas.

## Pipeline

Three agent touches per batch, not five per entry.

```
mechanical source checks
        ↓
Codex — implementation and source interpretation
        ↓
Claude — consolidated editorial and diff review
        ↓
Gemini — release-level falsification sweep
        ↓
human publication decision
```

## Owned files

One writer per file. Both of the mechanical failures this repo has suffered came
from ignoring that.

| Area | Owner |
| --- | --- |
| `src/content.config.ts`, `src/lib/vocab.ts` | Codex |
| `src/content/**` | Codex |
| `src/pages/methodology.astro` | Codex, in the same commit as any schema change |
| `scripts/**`, `.github/workflows/**` | whoever is landing; announce first |
| `docs/agents/**` | shared, append-only in practice |
| research reports | Gemini, outside the repo |

**Any schema change updates `/methodology` in the same commit.** The published
rules and the enforcing checks must never drift; that promise is the whole
premise of the site.

## Ground rules

- **Never `git add -A`.** It once swept four unreviewed entries into a live
  deploy. Stage explicit paths and account for every line of
  `git status --porcelain`.
- **Never assert an absence without searching for the thing.** The schema can
  force a claim to be cited; nothing can force a search for evidence assumed
  away. This is the failure class that has actually bitten, four times.
- **`lastVerified` means a human opened the sources.** No script writes it.
- `npm run validate` stays deterministic and offline. `npm run verify:sources`
  is the networked one and runs on demand or weekly.

## Not yet built

- **Worktrees.** `git worktree` per task once parallel implementation resumes,
  so two agents cannot edit the same checkout.
- **Research packets.** `PACKET.md` holds the template. Use it for one batch
  before deciding whether to expand — the existing 3,249 lines of handoff still
  function and reorganising them has a real cost.
