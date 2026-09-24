# Getting started (no AI experience needed)

This guide takes you from zero to your first job audit in about 20 minutes. You don't need to know how to code, and you don't need to understand GitHub.

## What this is, in plain English

**Claude** is an AI assistant made by Anthropic. You chat with it at [claude.ai](https://claude.ai), like texting a very capable colleague.

**A skill** is a set of instructions you give Claude once, so it knows how to do a specific job well every time. Think of it as handing a new hire a detailed playbook instead of re-explaining the task every day.

**job-fit-audit** is a skill that turns Claude into a job-search coach. You paste in a job posting, and it tells you honestly whether the role is worth your time, scored against your real experience. For strong matches, it writes a tailored resume, a short cover letter, networking messages, and interview prep. It only uses facts you've confirmed, so it won't invent numbers that could trip you up in an interview.

## What you need

- A Claude account at [claude.ai](https://claude.ai). Skills work on every plan, including Free, but **a paid plan (Pro or higher) is strongly recommended.** In testing, a Free account ran out of messages right after profile setup, before its first job audit. On Free, expect to do setup in one session and your first audit after the limit resets (Claude shows the reset time).
- A computer (the setup steps are easiest on desktop; you can use it on your phone afterward).
- Your current resume, as a PDF or Word file.

## Step 1: Download the skill

1. Go to the latest release: [github.com/andrewluxem/job-fit-audit/releases/latest](https://github.com/andrewluxem/job-fit-audit/releases/latest)
2. Under **Assets**, click the file that starts with **job-fit-audit-v** (for example `job-fit-audit-v1.2.zip`) to download it. (Not "Source code (zip)." That one is the whole project and Claude will reject it.)
3. **Don't unzip it.** Claude wants the zip file as-is.

## Step 2: Turn on code execution

The skill needs this to create your resume as a Word document.

1. Go to [claude.ai](https://claude.ai) and sign in.
2. Click your name or initials (bottom left), then **Settings**.
3. Open **Capabilities** and turn on **Code execution and file creation**.

On a company Team or Enterprise account, your admin may need to allow skills first.

## Step 3: Add the skill to Claude

1. In claude.ai, go to **Customize**, then **Skills**.
2. Click **+**, then **+ Create skill**, then **Upload a skill**.
3. Choose the **job-fit-audit-v…zip** file you downloaded.
4. Make sure the skill is switched on.

That's the only setup. Claude now knows the playbook.

## Step 4: Set up a Project (recommended)

A Project is a folder in Claude that remembers files between chats. Without one, you'd redo your profile every time.

1. In the left sidebar, click **Projects**, then **New project**.
2. Name it something like "Job Search."
3. Start every job-search chat from inside this Project.

## Step 5: Build your profile (one time, 10 to 15 minutes)

In a new chat inside your Project, type:

> Use the job-fit-audit skill to set up my profile.

Then attach your resume. Claude will read it and ask you a few short rounds of questions: what roles you want, where you'll work, your salary range, which results on your resume are really yours, and who you know. Answer in your own words; short answers are fine.

When it finishes, Claude gives you three files: **profile.md**, **story-bank.md**, and **resume.json**. Download them, then add them to your Project (open the Project, find **Project knowledge** or **Files**, and upload them). Now every future chat in the Project knows your background.

## Step 6: Audit your first job

Copy the full text of a job posting (from LinkedIn, Indeed, a company careers page) and paste it into a chat in your Project. You don't even need to ask a question.

You'll get a verdict like this:

> **Verdict: APPLY NOW (Tier A, 31/35)**
> A score on seven things: the scope of the work, level, tools, pay, location, whether you know anyone there, and how fresh the posting is. Plus a few sentences on the real reasons.

- **Tier A (strong fit):** Claude builds your application package: a tailored resume you can download as a Word file, a short cover letter, networking messages, and interview prep.
- **Tier B (decent fit):** Claude gives the verdict and waits. Say **"build it"** if you want the package.
- **Tier C (poor fit):** Claude tells you to skip it and what would have changed its mind. Skipping is a win; it saves your time for better roles.

## Optional: add humanizer for a final polish

[humanizer](https://github.com/blader/humanizer) is a free skill that rewrites text so it sounds less like AI wrote it. It pairs well with job-fit-audit: after you get a cover letter or networking message, say **"Use humanizer on this"** before you send it.

To add it: open the [humanizer page](https://github.com/blader/humanizer), click the green **Code** button, then **Download ZIP**. Upload that zip under **Customize → Skills** exactly like Step 3.

## Things to try

- "Is this worth applying to?" plus a job link or pasted posting
- "Build it" (after a Tier B verdict)
- "I have an interview with [company] on Thursday. Prep me."
- "What stories should I use for a question about leading through change?"
- "Update my profile: I just got certified in [X]."
- "Make the resume one page instead of two."

## Making your usage go further

Profile setup and resume building are long conversations, so they use more of your plan's limit than regular chat. To stretch it:

- **Paste the job text instead of a link.** Links make Claude fetch and read the whole page first.
- **One job per chat.** Start a new chat inside your Project for each posting instead of continuing a long one.
- **Upload your profile files to the Project** (Step 5), so Claude doesn't redo setup.
- **Ask for the package only when you'll apply.** A Tier B verdict costs far less than a full resume, letter, and interview prep.

## Tips

- **Always review before you send.** Claude is a strong first draft, not a final one. Read every line of the resume and cover letter.
- **Correct it freely.** If a number is wrong or something doesn't sound like you, say so. It will fix the draft and can update your profile so it doesn't happen again.
- **Paste the text when a link fails.** Many job sites block automated reading. If Claude can't open a link, copy and paste the posting instead.
- **Keep your profile current.** New result, new title, new certification? Tell Claude to update your profile, then re-upload the new file to your Project.
- **Your information stays in your account.** The skill itself contains nothing about you. Your profile lives only in your own Claude Project.

## Something not working?

| Problem | Fix |
|---|---|
| Claude doesn't seem to use the skill | Say "Use the job-fit-audit skill" at the start of your message, and check the skill is switched on under Customize → Skills. |
| No Word document, just text | Turn on **Code execution and file creation** (Step 2). |
| Upload fails | Upload the zip exactly as downloaded; don't unzip or rename it. |
| "SKILL.md file must be in the top-level folder" | You downloaded "Source code (zip)" by mistake. Go back to the release and download the **job-fit-audit-v…zip** file instead. |
| "You are out of free messages" | You've hit your plan's usage limit. Wait for the reset time shown, or upgrade. See "Making your usage go further" above. |
| Claude asks the setup questions again | Add your profile files to the Project (Step 5) and start chats from inside that Project. |
| Menus look different | Claude's menus change over time. Anthropic's help article [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) has the current steps. |

Using Claude Code instead? See the main [README](README.md) for the command-line install.
