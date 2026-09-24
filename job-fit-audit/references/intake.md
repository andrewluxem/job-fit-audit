# Intake: building the profile

Goal: a `profile.md` accurate enough that every resume line, letter, and interview answer can trace back to it. Target 10 to 15 minutes of the user's time.

## How to run it

- **Resume first.** Ask for a resume (file, paste, or LinkedIn "Save to PDF"). Parse it fully before asking anything. Pre-fill every answer you can and turn the question into a confirmation ("Your resume says you're in Denver. Remote or Denver-area only?").
- **Batches of three or four.** With AskUserQuestion (or any multiple-choice UI), give 2 to 4 concrete options per question; "Other" is always available for free text. In plain chat, number the questions and accept short answers ("1b, 2 remote, 3 skip").
- **Skip what doesn't apply.** No direct reports ever? Skip the management questions. Individual contributor track? Adjust Level options.
- **Never ask for:** Social Security numbers, date of birth, age, marital or family status, health, immigration details, or anything else an employer can't legally ask. A resume doesn't need them and the skill doesn't either.
- **Summarize and confirm** at the end of each round in one or two lines, then move on.

## Required before writing

Do not write the profile until each of these has an answer the user gave or confirmed. If the resume pre-fills one, ask the user to confirm it rather than assuming.

- [ ] Discipline and target titles
- [ ] Level: core, stretch, floor
- [ ] Location rules, including whether relocation is really on the table
- [ ] Comp approach (numbers, or "case by case")
- [ ] Dealbreakers vs flags
- [ ] Attribution for every metric that will appear on the resume (confirm the obvious ones in one batch: "These look like your own results: A, B, C. Correct?")
- [ ] Referral network: alumni companies, communities, recruiters. This drives the Referral score, so don't defer it.
- [ ] Style rules and banned words
- [ ] Tier A behavior (auto-build or ask first)

Landmines (short tenures, gaps) can be deferred; flag them in the profile.

## Round 1: Target (always ask)

1. **Discipline.** Which marketing lane are you aiming at? Options drawn from their resume, e.g. Lifecycle/CRM/Retention, Growth/Performance, Brand, Product Marketing, Content/SEO, Demand Gen/ABM, Marketing Ops/Martech, Social/Community, Comms/PR, Generalist/CMO track. Multi-select is fine; ask which is primary.
2. **Level.** Core target, stretch, and floor. (e.g. core: Director; stretch: VP; floor: Senior Manager only if remote.)
3. **Titles to watch for.** Two to five title strings that mean "my job" (Head of Lifecycle, Director of CRM, Sr Manager Retention...). Also titles that look right but aren't.
4. **Company types.** B2C, B2B SaaS, DTC/e-commerce, marketplace, fintech, healthcare, agency, nonprofit... Any preferred stage (startup, growth, enterprise)?

## Round 2: Constraints

5. **Location.** Home metro; remote only, remote or local hybrid, open to relocation? Any regions or time zones that work?
6. **Comp.** A floor and a target, or "judge case by case." Base only, or total comp? (Store the numbers only in their local `profile.md`; never repeat them in outreach.)
7. **Dealbreakers vs flags.** Anything that should auto-skip (e.g. onsite 5 days, commission-heavy, specific industries)? Anything that should be flagged but not skipped?
8. **Timeline and posture.** How urgent is this search (start date needed, runway)? Quiet search (1:1 outreach only, no public posts) or open search?

## Round 3: Proof

9. **Top proof points.** Pick the three to six results they'd want every recruiter to know. For each, confirm:
   - Is the number exact, a range, or an estimate? (Ranges are fine; "up to" is not.)
   - **Whose result is it:** theirs, their team's, or the company's? If the company's (e.g. a revenue turnaround), record the approved phrasing that ties their scope to it without claiming it ("owned email, one channel at 30% of digital revenue, inside a turnaround that delivered X").
   - Is it public or confidential? Confidential numbers can become percentages or ratios.
10. **Anything missing from the resume?** Awards, speaking, certifications, side projects, publications, tools they've picked up recently, a promotion that got lost.
11. **Numbers they're unsure of.** Anything on an old resume they can't stand behind goes in Quarantined numbers.

## Round 4: Toolkit and network

12. **Toolkit strengths.** The platforms, channels, and methods where they're genuinely strong (these score 5 on Toolkit), and ones they've used but wouldn't lead with. See the discipline table in `rubric.md` for prompts.
13. **Problems they've solved before** that should score high even with unfamiliar tools: a platform migration, a rebrand, a 0-to-1 launch, a team build, an attribution overhaul.
14. **Referral network.** Past employers with active alumni networks, communities they're in (Slack groups, meetups, associations), recruiters they know.

## Round 5: Resume and voice

15. **Positioning.** One line on how they want to be seen ("retention leader who builds," "brand marketer with performance chops"). If they do two kinds of roles, capture two or three positioning angles.
16. **Resume format.** Length (1 or 2 pages), what contact lines to show (city, phone, email, LinkedIn, portfolio), whether to include an MBA or credentials in the name line.
17. **Style rules.** Words or punctuation they never want used (em dashes, "passionate," "synergy"), brand names they spell a specific way, American or British spelling.
18. **Tier behavior.** Auto-build the package for Tier A, or always ask first?

## Optional: story bank

Offer it; don't force it. "Want to capture two or three of your best stories now, or add them as interviews come up?" If yes, use `story-bank-template.md` and ask for one story at a time: the situation in a sentence, what they specifically did, the result with its number, and who else was involved.

## Writing the files

- `profile.md`: follow `profile-template.md` section by section. Every fact line should be something the user said or confirmed.
- `resume.json`: follow `scripts/resume.example.json`. Keep bullets verbatim from their resume unless they asked for rewrites; if you tighten wording, show them the before and after.
- Create `story-bank.md` from the template even if empty, and `pipeline.md` with its header row.
- Close setup with: where the files are, how to update them ("tell me 'update my profile'"), and "paste a job posting whenever you're ready."
