---
title: Full Stack Application
type: project
num: 2
draft: 0
assigned_date: 2026-11-19
due_date: 2026-12-04
heading_max_level: 3
points: 100
---

This guide will walk you through building a complete full-stack application from scratch. Follow each section in order, and verify your work at each checkpoint.

{% collapsible closed %}
## Collaboration & AI Policy

### Working with others
**You may:**
- Work in **pairs** or individually on this assignment -- your choice.
- If you work with a partner:
    - both parties must have their own individual repo and deploy their own repo on Railway
    - Any extra credit earned will be split evenly between the two partners to ensure fairness (e.g., if 10 extra credit points are awarded, each person will receive 5 points)
    - **both partners are responsible for being able to explain and modify the entire system**, not just the parts they wrote
- Discuss concepts, approaches, and debugging strategies with classmates
- Share links to documentation, tutorials, or Stack Overflow posts
- Help each other understand error messages or explain how technologies work

**You may NOT:**
- Share, copy, or view another student's code (including via screenshots, GitHub repos), unless it is with your partner
- Paste another student's code into an AI tool
- Post your code publicly or share it in a way that others can copy it

### Generative AI
This project is large, and AI tools can produce a lot of plausible-looking code very quickly. That is exactly the risk: **you can end up with a working app and no idea how it works.** The goal of this project is for *you* to be able to build, explain, debug, and deploy a full-stack application. Use AI to help you *learn how to do the work*, not to *do the work for you*.

**Acceptable uses**
- Ask AI to explain a concept, a piece of syntax, a library, or an error message (e.g., "What does this CORS error mean?")
- Ask AI for a hint or a general approach, and then write the code yourself
- Ask AI for feedback on code you have already written (e.g., "Why might this route return a 422?")
- Ask AI to quiz you or to explain a code example from the documentation

**Unacceptable uses**
- Asking AI to write, complete, or rewrite code for your project -- including "small" snippets, routes, components, SQL, or configuration
- Copying AI-generated code into your project, even if you retype it or modify it
- Pasting the project instructions (or a checkpoint) into an AI tool and following its output
- Using AI to generate or polish your README, PR descriptions, or any written explanation of your work -- these must be in your own words
- Using AI-enabled editors (e.g., Copilot inline suggestions or agent modes) that insert code into your files

**Tips for using AI without undermining your learning**
- Try each checkpoint yourself first. Ask for help only after you've been stuck for a while, and tell the AI what you've already tried.
- Ask for hints, not solutions. For example: *"Don't give me the code. Explain what this error means and what I should look at."*
- AI is often confidently wrong, uses outdated versions of libraries, and can suggest insecure shortcuts (e.g., allowing all origins in CORS, or hardcoding secrets). Verify against the official documentation.
- If you can't rewrite a piece of code yourself without looking at it, you don't understand it yet.

**Accountability**
- You must be able to explain, modify, and debug any part of your submission without AI assistance. You may be asked to do so live, and your project grade may depend on it.
- **Disclosure:** in your submission, include one line: either `AI assistance: none` or the tool(s) you used and what you used them for (e.g., "ChatGPT explained what a CORS preflight request is; I wrote the fix myself").
- If you aren't sure whether a particular use is okay, **ask before you do it**. Asking is always safe.
- Unauthorized AI use may require you to redo the project and may be addressed under the university's academic integrity policies.

**Remember:** If you can't explain how your code works, you haven't learned it. All submitted code must be your own work, even if you received help understanding concepts or debugging issues.


{% collapsible closed %}
## Your Tasks

### Part 1. Build Your System
1. [Introduction](/assignments/project02-00-intro)
1. [Project Setup & Git](/assignments/project02-01-setup)
1. [Database](/assignments/project02-02-database)
1. [Backend](/assignments/project02-03-backend)
1. ["Starter" Frontend](/assignments/project02-04-starter-ui)
1. [Build Your Containers with the Docker Compose File](/assignments/project02-05-docker)

### Part 2. Get React to Communicate with FastAPI
1. [Implement Frontend <> Backend Communication](/assignments/project02-06-enhanced-ui)
1. [Before Moving On: How to work with your containers](/assignments/project02-07-working-with-your-containers)
1. [Linters and Formatters](/assignments/project02-08-linters)
1. [Add Continuous Integration on GitHub](/assignments/project02-09-cicd)

### Part 3. Extending the App <span class="badge info">this part will take the longest</span>
1. [Backend + Frontend Extensions](/assignments/project02-10-enhancements) (complete all required tasks)

### Part 4. Deployment
1. [Railway Deployment](/assignments/project02-11-railway)


{% collapsible closed %}
## What To Submit


Before submitting, verify you have completed all of the following:

**Part 1: Build Your System <span class="badge info">20 pts</span>**
- [ ] Project setup with Git repository 
- [ ] Database container created and configured
- [ ] Backend API with CRUD endpoints working
- [ ] Basic React frontend running
- [ ] Docker containers built and running locally

**Part 2: React ↔ FastAPI Communication <span class="badge info">25 pts</span>**
- [ ] Frontend successfully communicates with backend API
- [ ] Can create, read, update, and delete items from the UI
- [ ] GitHub Actions CI/CD pipeline configured and passing

**Part 3: Required Enhancements <span class="badge info">35 pts</span>**
- [ ] One required backend enhancement (Option 1 or Option 2)
- [ ] One required frontend enhancement (component library integration)

**Part 4: Deployment <span class="badge info">20 pts</span>**
- [ ] Application deployed to Railway
- [ ] Production database configured
- [ ] Application accessible via public URL


**Optional:** Complete any [extra credit enhancements](project02-10-enhancements#ec) for additional points.


### Submit
Once you have verified that your project is done, paste a link to your GitHub Repo and to your Railway deployment into the Canvas submission checkbox.

