---
name: job-fit-audit
description: Score any job posting against the user's own verified career profile and return an honest apply/skip verdict with a 7-part fit rubric; for strong fits, build a tailored resume (.docx), short cover letter, 1:1 outreach notes, and STAR interview prep. On first use it interviews the user to build their profile. Use when someone pastes a job description or job URL, asks "should I apply", "score this job", "audit this JD", "is this a fit", wants a tailored resume or cover letter for a role, or says "prep me for my interview with X". Built for marketers of any discipline.
---

# Job Fit Audit

Score a job posting against the user's real career, give a verdict they can trust, and when the fit is strong, produce everything needed to apply well the same day. The point is conversion, not volume. A fast, honest "skip" is worth as much as a full application package, because the scarcest resource in a job search is the candidate's hours.

The skill has two halves. **Setup** runs once: a short interview that builds the user's profile. **Audit** runs every time they share a posting. Never audit without a profile; a verdict scored against guesses is worse than no verdict.

## The workspace

Everything personal lives in a folder the user owns, never inside this skill's folder (so the skill can be updated or shared without leaking anyone's data):

```
job-search/
  profile.md        # verified facts, search parameters, writing preferences  (source of truth)
  story-bank.md     # longer STAR stories, grows over time
  resume.json       # structured resume content the builder reads
  pipeline.md       # log of every role audited
  applications/     # one subfolder per tailored package
```

Where to put it:
- **Claude Code or any agent with a filesystem:** look for `job-search/` in the current directory, then `~/job-search/`. If the user names another path, use it and remember it for the session.
- **Cowork with a connected folder:** put `job-search/` in the connected folder.
- **claude.ai chat with no persistent filesystem:** generate the files, hand them to the user, and tell them to add `profile.md`, `story-bank.md`, and `resume.json` to a Claude Project (or re-attach them next time). Say this plainly once; don't nag.

## Setup: build the profile (first run, or "update my profile")

If `job-search/profile.md` exists, read it and skip to the audit. If not, run the intake in `references/intake.md`. The short version:

1. **Start from their resume.** Ask for it first (upload, paste, or LinkedIn "Save to PDF"). Extract everything you can before asking anything else, so the questions only cover gaps.
2. **Ask in small batches.** Use the AskUserQuestion tool (or the host's multiple-choice UI) when available, three or four questions per round, with sensible options plus "Other." In plain chat, ask at most four numbered questions per message. Never dump all twenty questions at once.
3. **Verify every number.** For each metric on their resume, confirm two things: is it accurate, and whose result is it (theirs, their team's, or the company's)? Record the answer. This is the attribution rule and it protects them at reference-check time.
4. **Don't skip the required questions.** Before writing anything, confirm you have an answer for each item in the intake's "Required before writing" checklist. Pre-filled guesses from the resume (location, relocation, titles) count only after the user confirms them.
5. **Confirm before saving.** Show the user a short summary: positioning line, search parameters, top proof points with their attribution, and writing rules. Ask "Anything wrong or missing?" and wait for the answer. Fix, then write the files using `references/profile-template.md` and `scripts/resume.example.json` as the shapes.
6. Offer the story bank (`references/story-bank-template.md`) as optional. It can be filled in later, one story at a time during interview prep.

Setup should take 10 to 15 minutes of the user's time. If they are impatient, get the resume plus the Search Parameters section and start auditing; fill gaps as roles surface them.

## Ground rules for every output

**Read `profile.md` before anything else.** Never state a career fact, metric, employer, title, or date that isn't in `profile.md` or `story-bank.md`. Tailoring means choosing, ordering, and rephrasing true things. It never means inventing or inflating. A fabricated number on a resume can cost an offer.

Also follow `references/writing-rules.md` for every word you produce, including your own chat messages to the user. The moment the user states a style rule during intake (for example, no em dashes), apply it to everything you write from then on: no AI writing tells, signed deltas, attribution discipline, and the user's own style preferences from their profile (some people ban em dashes, some ban particular words; their list wins).

## Step 1: Ingest the posting

Accept pasted JD text directly. For a URL, fetch it; if the fetch fails (job boards often block bots), ask the user to paste the text. Never guess at a posting's contents.

Extract before scoring: title and level; company and what it actually sells; location and remote policy; posted comp (or its absence); reporting line; team size; what the role owns (revenue, a channel, a program, a brand, pipeline); named tools; posting age if visible; anything unusual.

If the company is unfamiliar, do one quick search to learn what it does and roughly how big it is. Scope and tool claims in a JD only make sense in context.

## Step 2: Score the rubric

Seven dimensions, 1 to 5 each, 35 max. The full scoring guide, including what "Scope" and "Toolkit" mean for each marketing discipline, is in `references/rubric.md`. Read it the first few times; the table below is the summary.

| Dimension | 5 looks like | 1 to 2 looks like |
|---|---|---|
| Scope | Owns the outcome the user is best at, end to end | Their discipline is a support function here, or the job is mostly something else |
| Level | Matches their target level | Below their floor, or a big title with junior scope |
| Toolkit | Their strongest tools/methods named, or a problem they have solved before (a platform migration, a rebrand, a launch) | Unfamiliar toolkit with nothing transferable |
| Comp | Posted range at or above their target | Well below their floor. Unposted = 3 |
| Location | Matches their location rules | Requires presence they said they won't do |
| Referral path | Alumni company, known contact, or community tie | Pure cold |
| Freshness | Posted under 48 hours ago | 3+ weeks old, reposted, or evergreen-looking |

**Tiers:** A = 30+, B = 24 to 29, C = under 24. The user can change the cutoffs in their profile.

**Flags** are surfaced, never auto-disqualifying unless the user listed them as dealbreakers in their profile: under-resourcing signals ("wear many hats," a leadership title with no team), ghost-posting signals (vague comp plus old posting plus always-hiring company), title inflation, agency vs in-house mismatch, plus anything in the user's own flag list.

## Step 3: Deliver the verdict

Always this structure, before any assets:

```
## Verdict: [APPLY NOW / WORTH APPLYING / SKIP] (Tier [A/B/C], [score]/35)

| Scope | Level | Toolkit | Comp | Location | Referral | Freshness |
|---|---|---|---|---|---|---|
| n | n | n | n | n | n | n |

[2 to 3 sentences with the real reasons, not a restatement of the table: what makes
this worth their time or not, and what they'd be walking into.]

Flags: [list, or "none"]
Referral path: [specific: which alumni network or contact to work, or "cold: hiring-manager outreach only"]
Resume angle: [which positioning from their profile fits, plus one line of why]
```

Then branch:
- **Tier A:** build the full package (Step 4) unless the user's profile says "ask first."
- **Tier B:** stop after the verdict and end with: "Say **build it** and I'll make the package."
- **Tier C:** skip. One line on what would change the answer ("if it were remote," "if the range started 30k higher"). Build nothing.

If the user overrides a verdict ("I want this one anyway"), build the package without relitigating. Note the risk once, in one clause.

## Step 4: The package

Work from `profile.md` and `story-bank.md` facts only. Save everything to `job-search/applications/<company>-<role>/`.

### 4a. Tailored resume (.docx)
1. Copy `job-search/resume.json` to the application folder. Edit only: headline (mirror the JD's title language where truthful), summary emphasis, skills order, selected-results order, and bullet order within roles. Drop low-relevance bullets if space requires.
2. Use the JD's exact keywords only as truthful synonyms for what the user did ("customer marketing" for their "lifecycle marketing" is fine; "paid social" for work they never did is not).
3. Build it: `node <skill-dir>/scripts/build_resume.js <path-to>/resume.json <output>.docx`. The script needs the `docx` npm package (preinstalled in Claude's sandboxes; locally `npm install docx`).
4. Check it: convert to PDF (`soffice --headless --convert-to pdf`), confirm the page count matches the user's preference (default 2), render page images if you can and look for overflow, orphaned headings, and lines broken mid-item. Fix and rebuild.
5. Name the file `<First> <Last> - Resume.docx`. Internal variant names never reach an employer.

If code can't run in this environment, deliver the tailored resume as clean text in the same section order and say so.

### 4b. Cover letter
Under 200 words, three paragraphs, paste-ready text plus a .docx if the builder is available:
1. **Hook:** one specific, researched observation about their business, tied to what the user would do about it. Never "I am writing to express my interest."
2. **Proof:** two or three proof points mapped to the JD's top needs. Numbers, not adjectives.
3. **Close:** direct. What they want (a conversation) and the fastest thing they'd contribute.

Skip the letter if the application flow doesn't take one, and say so instead of producing an unused file.

### 4c. Outreach notes
From `references/outreach-templates.md`, customize three: the referral ask, the forwardable blurb, and the hiring-manager note. Respect the user's search posture from their profile (a quiet search means 1:1 messages only, never public posts). The hiring-manager note's two company-specific ideas ARE the message: spend real time on their site, app, emails, or ads to find them. Generic ideas read as spam at senior levels.

### 4d. Interview story prep
Map the JD's top five requirements to the user's proof points. For each: requirement, then the matching story in STAR outline (Situation/Task one line, Action two or three lines, Result with its verified number). Flag any requirement with no strong story. That gap is what they rehearse before the screen; pretending coverage exists helps nobody. If a story is thin, give them the one question that would fix it.

Add the behavioral set from `references/interview-prep.md` when the round is likely to include it, and three or four questions for them, at least one built from real homework on the company.

## Interview mode (no new posting to score)

When the user has an interview booked or asks for prep rather than a verdict, skip Steps 1 to 3 and build the prep pack from `references/interview-prep.md`:

1. Their business: what they sell, to whom, what their marketing looks like from the outside, anything recent worth referencing.
2. Requirement-to-story map: top five requirements, each with a STAR outline, gaps flagged.
3. The opening: a 90-second "tell me about yourself" tuned to this company.
4. Behavioral coverage: strength, weakness, failure, pressure, conflict, ownership, and managing people if the role has reports. If the company publishes values, map one story to each.
5. Questions for them: six to eight, weighted to the round, at least two company-specific.
6. Landmines: short tenures, gaps, level changes, any metric with an attribution caveat, and how to answer each in two sentences without drama.

Weight the pack to the round type (recruiter screen, hiring manager, panel, exec final, comp conversation) instead of giving all six sections equal space.

## Step 5: Log it

Append a row to `job-search/pipeline.md` (create it with this header if missing):

```
| Date | Company | Role | Tier | Score | Location | Source | Referral path | Stage | Next action |
|---|---|---|---|---|---|---|---|---|---|
```

Stage starts at SOURCED. If there's no filesystem, output the row and tell the user to paste it into their tracker.

## Keeping the profile honest

- New facts, metrics, or dates come up? Update `profile.md` (and `resume.json` if they belong on the resume) after confirming with the user. Stale facts are how wrong numbers reach a recruiter.
- A number the user can't verify, or one that conflicts with another source, goes in the profile's **Quarantined numbers** table and is never used until resolved.
- Old prep documents and past resumes are a fact source, not a copy source. Mine them for stories and numbers, verify each figure with the user, and rewrite the prose.
- Old stories win scale and depth questions; recent stories win "what have you done lately." Lead with recent.
- Two postings in one message: audit both, verdicts first, then packages for any Tier A.
- The verdict is advice from someone on their side, not cheerleading. If a Tier A role has a real problem (repeated reorgs, a leadership team in flux, bad reviews), put it in the flags.
