# 12 — Asset Provenance and Licensing Register

**Honesty note:** no license in this document has been verified. No asset files, source pages, or license texts were available to check while writing this package. Every "License" cell is either "Unknown" or a *to-verify expectation*. Do not ship, credit, or rely on any entry until the **Verified on** column holds a date and an evidence link/file in `licenses/`. This is not legal advice.

## 1. Status vocabulary
| Status | Meaning |
|---|---|
| EXISTING-UNVERIFIED | Referenced in historical documents; actual files/licenses not located |
| PROPOSED | Candidate; not downloaded or checked |
| ORIGINAL-PLANNED | To be created for this project |
| ORIGINAL-DONE | Created and logged with author + date |
| APPROVED | License checked, evidence stored |
| REJECTED | Unsuitable; replacement noted |

## 2. Discovery sources named in `Echoes-credit.pdf`
These are **places to look**, not permission.

| ID | Source | URL (from credits) | What the credits claim | What must be verified per asset |
|---|---|---|---|---|
| SRC-01 | OpenGameArt.org | https://opengameart.org | royalty-free music, SFX, ambient | Each upload has its own license (varies; some require attribution, some restrict derivatives or have share-alike conditions) `[VERIFY]` |
| SRC-02 | Kenney.nl | https://kenney.nl/assets | free game assets incl. audio and sprites | License of each pack; many are commonly distributed under a public-domain-style dedication, but check the pack page and included license file `[VERIFY]` |
| SRC-03 | SoundImage.org (Eric Matyas) | https://soundimage.org | original music and soundscapes | Current usage terms and attribution wording on the site `[VERIFY]` |
| SRC-04 | Incompetech (Kevin MacLeod) | https://incompetech.com | royalty-free tracks | Per-track license and attribution text; commonly an attribution license `[VERIFY]` |

The credits also state: "All assets used are either public domain, Creative Commons (with attribution), or explicitly marked for commercial use." **That statement cannot be relied on** — it names no assets, licenses, or versions.

## 3. Asset register (template + current rows)

| Asset ID | Intended use | Source URL | Creator | License | Commercial OK? | Attribution? | Modification OK? | Verified on / evidence | Status | Replacement plan |
|---|---|---|---|---|---|---|---|---|---|---|
| AUD-001 | Chapter 1 ambient loop | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | Original composition or SRC-03/04 track |
| AUD-002 | Boss loop (Corruptor) | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | Original |
| SFX-001 | Footstep set | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | Record/synth original |
| SFX-002 | Dash, jump, land | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | SRC-02 pack or original |
| SFX-003 | Plate/door/Beacon | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | Original |
| SFX-004 | Trace record/launch/dissolve | — | — | n/a | n/a | n/a | n/a | — | ORIGINAL-PLANNED | Synth original |
| ART-001 | Blitz sprite set | — | project team | n/a | n/a | n/a | n/a | — | ORIGINAL-PLANNED | Placeholder shapes first |
| ART-002 | Circuit tileset | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED / ORIGINAL-PLANNED | Original |
| ART-003 | Corruptor sprite sheet | — | project team | n/a | n/a | n/a | n/a | — | ORIGINAL-PLANNED | Placeholder |
| FNT-001 | UI font | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | System-safe alternative |
| FNT-002 | Web Title font (WOFF2) | — | — | Unknown | Unknown | Unknown | Unknown | — | PROPOSED | Open-source web font with web-embedding rights (SIL OFL) `[VERIFY]` |
| LIB-001 | TypeScript | https://github.com/microsoft/TypeScript | Microsoft | Apache-2.0 | Yes | Yes | Yes | — | PROPOSED | Standard build dependency |
| LIB-002 | Vite | https://github.com/vitejs/vite | Yuxi (Evan) You / Vite Contributors | MIT | Yes | Yes | Yes | — | PROPOSED | Standard web bundler |
| LIB-003 | Vitest | https://github.com/vitest-dev/vitest | Anthony Fu / Vitest Contributors | MIT | Yes | Yes | Yes | — | PROPOSED | Unit and determinism test runner |
| LIB-004 | Playwright | https://github.com/microsoft/playwright | Microsoft | Apache-2.0 | Yes | Yes | Yes | — | PROPOSED | Browser E2E smoke test tool |
| DOC-001 | Historical story/map/credits files | local uploads | see §6 | n/a | n/a | n/a | n/a | — | EXISTING-UNVERIFIED (provenance) | — |

**Existing assets:** none identified in the source documents (no asset list exists). **Proposed assets:** rows above. **Original content:** all code, writing, designs created for this revived project are tracked as ORIGINAL-* and logged with author/date in commits.

## 4. Process
1. Before importing any third-party file: record row, download page snapshot (PDF/screenshot + date), copy the license text to `licenses/<AssetID>/`.
2. Add attribution text to `CREDITS.md` in the format the license requires.
3. Do not mix share-alike or restrictive-license assets without a decision recorded in `17_DECISION_LOG.md` (D-029).
4. Re-verify before release; update the "Verified on" date.
5. Keep a "replace by" plan so one rejected asset never blocks a milestone.
6. Generated or AI-assisted assets (if ever used) require their own policy decision; none are assumed here.

## 5. Credits file requirements
Keep a *Current team* section and a separate *Historical contributors* section; wording on historical credit is a decision for the project lead, informed by the answers in §6, not a silent edit.

## 6. Provenance and ownership checklist (old project)
Designation of a present-day project lead is **not** proof of ownership of every historical contribution.

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-001 | Who wrote each source document? `story_line_of_ECHOES.docx` is bylined Saugat Rauniyar "for the delta grp"; `map.docx` has no byline; credits PDF says by Saugat Rauniyar, checked by Prem Soni | Authorship of design text | OPEN |
| Q-002 | Did Prem Soni or Mohammad Zaid contribute code, art, audio, ideas, or text that remain in any form (including the map/story text)? | Possible third-party contributions | OPEN |
| Q-003 | Is there any written agreement (assignment, license, release, or team agreement) covering past contributions? If not, should one be obtained? | Clarify rights to reuse/modify | OPEN — consult a qualified professional |
| Q-004 | Who controls the shared contact address (info.echoesofpast@gmail.com) and the "delta grp"/team accounts, repos, drives, and any storefront/social names? | Operational control and public identity | OPEN |
| Q-005 | Is any earlier code, sprite, or sound file reused? If so, where did it come from? | Any third-party asset must be in the register | OPEN |
| Q-006 | Is "ECHOES" or "Prime Echo" in conflict with existing games or marks? | Naming/search risk | OPEN `[VERIFY]` |
| Q-007 | Are any names, designs, or plot beats unintentionally close to commercial games? | Brief forbids copying | OPEN — design review |
| Q-008 | Does the credits statement about licensing come with a list of actual assets and evidence? | Currently unsupported claim | OPEN |
| Q-009 | Did the "delta grp" / any institution have rights claims (e.g., if the original was made in an academic or club context)? | Possible third-party rights | OPEN `[VERIFY]` |
| Q-010 | How should past team members be credited, and have they been informed? | Fairness and transparency | OPEN |
