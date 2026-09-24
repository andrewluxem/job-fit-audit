# job-fit-audit

*By [Andrew Luxem](https://andrewluxem.com), retention and lifecycle marketing leader.*

A Claude skill for marketers who are job hunting. Paste a job posting and get an honest apply/skip verdict scored against *your* real career, then (for strong fits) a tailored resume, a short cover letter, outreach notes, and interview prep built only from facts you've verified.

**New to AI or skills?** Start with the [Getting Started guide](GETTING-STARTED.md). It walks you through setup in about 20 minutes, no coding required.

It's built for any marketing discipline: lifecycle, growth, brand, product marketing, content, demand gen, ops, social, comms, or the CMO track.

## What it does

**First run: it interviews you.** Upload your resume and answer a few rounds of short questions (target level, location rules, comp, which numbers are really yours, your network). It writes a private profile to a `job-search/` folder that you own. About 10 to 15 minutes.

**Every run after: paste a job.** You get:

```
## Verdict: APPLY NOW (Tier A, 31/35)

| Scope | Level | Toolkit | Comp | Location | Referral | Freshness |
|---|---|---|---|---|---|---|
| 5 | 4 | 5 | 4 | 5 | 3 | 5 |

Owns retention revenue end to end and names the ESP you migrated to last year...

Flags: none
Referral path: ex-[your old employer] alumni in their growth org
Resume angle: retention leader who builds
```

- **Tier A (30+):** it builds the package: tailored `.docx` resume, cover letter, referral ask, forwardable blurb, hiring-manager note, and STAR story prep for the top five requirements.
- **Tier B (24 to 29):** verdict only; say "build it" to get the package.
- **Tier C:** skip, with one line on what would change the answer.

It also has an **interview mode**: "prep me for my interview with X" builds an opening, a requirement-to-story map, behavioral answers, questions to ask, and landmines to rehearse.

## The rules it follows

- **It never invents anything.** Every resume line and interview answer traces back to your profile. Tailoring reorders and re-emphasizes; it doesn't inflate.
- **Attribution discipline.** If a number was your company's or your team's, it uses phrasing that ties your scope to it without claiming it. That's what survives a reference check.
- **No AI writing tells.** No "passionate, results-driven leader," no "leveraging synergies," no bullets ending in "…, driving engagement and fostering growth."
- **Honest scores.** A fast "skip" saves you more time than a hopeful "maybe."

## Install

**Claude Code**

```bash
git clone https://github.com/andrewluxem/job-fit-audit.git
mkdir -p ~/.claude/skills
cp -r job-fit-audit/job-fit-audit ~/.claude/skills/
npm install -g docx        # for the .docx resume builder
```

Then in any session: paste a job posting, or say "set up my job-fit-audit profile."

**Claude.ai / Claude Desktop / Cowork**

1. Download `job-fit-audit.zip` from the latest release (or zip the inner `job-fit-audit/` folder yourself).
2. Settings → Capabilities → turn on **Code execution and file creation** (needed for the `.docx` resume).
3. Customize → Skills → **+** → **+ Create skill** → **Upload a skill** → choose the zip.
4. Start a chat and paste a job posting.

Skills work on every Claude plan, including Free. Step-by-step beginner version: [GETTING-STARTED.md](GETTING-STARTED.md).

Tip for claude.ai: create a Project called "Job Search" and add the `profile.md`, `story-bank.md`, and `resume.json` the skill generates as Project files, so you don't redo setup each chat.

## Pairs well with: humanizer

I recommend installing [humanizer](https://github.com/blader/humanizer) alongside this skill. job-fit-audit already avoids the common AI writing tells, but humanizer is a dedicated second pass that catches 25 patterns of AI-sounding prose. Run it on your cover letter and outreach notes before you send them: "Use humanizer on this cover letter."

Install instructions are in the [humanizer README](https://github.com/blader/humanizer). For claude.ai, download that repo as a ZIP (Code → Download ZIP) and upload it under Customize → Skills the same way.

## Your data stays yours

The skill folder contains no personal data. Everything about you lives in a `job-search/` folder in your own workspace (or your Claude Project):

```
job-search/
  profile.md       # verified facts and search rules (source of truth)
  story-bank.md    # STAR stories, grows as you prep
  resume.json      # structured resume the builder reads
  pipeline.md      # every role you've audited
  applications/    # one folder per tailored package
```

If you fork this repo, `.gitignore` already excludes `job-search/`. Don't commit it.

The intake never asks for anything an employer can't legally ask (age, family status, health, and so on).

## Files

```
GETTING-STARTED.md                 # beginner setup guide
job-fit-audit/
  SKILL.md                         # the workflow
  references/
    intake.md                      # first-run interview
    profile-template.md            # shape of your profile
    rubric.md                      # 7-dimension scoring, per discipline
    writing-rules.md               # truth rules + anti-AI-tell rules
    outreach-templates.md          # referral, blurb, hiring manager, recruiter
    interview-prep.md              # opening, behavioral set, questions, comp
    story-bank-template.md         # STAR story format
  scripts/
    build_resume.js                # resume.json -> .docx
    resume.example.json            # fictional example
examples/
  sample-verdict.md                # what an audit looks like
```

## Customize it

- Change tier cutoffs, dealbreakers, and auto-build behavior in your `profile.md`, not in the skill.
- Change resume fonts and colors in the `style` block of `resume.json`.
- Want a different rubric dimension (say, Industry instead of Freshness)? Edit `references/rubric.md` and the table in `SKILL.md`.

## Build the resume by hand

```bash
node job-fit-audit/scripts/build_resume.js job-search/resume.json "Your Name - Resume.docx"
```

## Why I built this

I built the first version for my own job search: a skill that scored every posting against my verified career and wouldn't let a flattering number I couldn't defend reach a recruiter. It saved me hours of hopeful applications and made the strong ones better. This is that skill with my career taken out, so it works for any marketer.

More free marketing, CRM, and leadership playbooks (also packaged as agent skills): [github.com/andrewluxem/playbooks](https://github.com/andrewluxem/playbooks)

Issues and pull requests welcome. If it helps you land something, I'd like to hear about it.

## License

MIT. Use it, fork it, share it with your network.
