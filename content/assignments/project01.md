---
title: UNCA Course Lookup
type: project
num: 1
draft: 0
assigned_date: 2026-10-01
due_date: 2026-10-27
heading_max_level: 3
points: 100
---

## Project overview

As a class, you will build a terminal app for searching UNCA course sections and
planning a schedule. The app uses Python and Textual. You will begin with small,
independent tasks, then connect those pieces to the app.

The starter project is in the [`project01-fall2026`](https://github.com/csci338/project01-fall2026)
repository. Find tasks in the [issue tracker](https://github.com/csci338/project01-fall2026/issues)
and read the [README](https://github.com/csci338/project01-fall2026/blob/main/README.md)
for setup and a preview of the app.

## 1. What you are required to do

Complete **three Round 1 issues** and submit **one pull request (PR) for each issue**.
Each PR must implement its issue and include tests. Work on one issue at a time, in
your own branch. Do not edit another student's files or another issue's files unless
your instructor asks you to.

### Claim an issue

1. Open the project's GitHub **Issues** page.
2. Filter by the "Round" label (for the first round, select **Round 1**).
3. Choose an issue that has no assignee. Read its requirements and confirm it is
   still unassigned before claiming it.
4. Assign the issue to yourself. If GitHub will not let you assign it, comment that
   you want to claim it and ask your instructor to assign it.
5. Start as soon as possible. Open a finished, review-ready PR within 7 calendar
   days of claiming the issue. If you are blocked, comment on the issue before the 7 days are up and explain what you tried and what is blocking you.
      * If you do not open a review-ready PR within 7 days, the instructor may unassign the issue so another student can claim it. Keep the issue updated as you work.

### All PRs must be submitted, approved, and merged into main by the deadline

These are suggested checkpoints to help you make steady progress:

| PR | Suggested submission date |
| --- | --- |
| First PR | Before Thursday, October 8, 2026 |
| Second PR | Before Thursday, October 15, 2026 |
| Third PR | Before Thursday, October 22, 2026 |

**Hard deadline: Tuesday, October 27, 2026.** All three PRs must be approved and **merged into `main`** by this date. Therefore, Oct 23 is the very last day you should be submitting to allow for me to review your code, provide comments if necessary, and allow you to merge. A PR is not complete until it is ready
for review (all tests and linters pass). If you are getting stuck, it is your responsibility to attend office hours and ask questions -- most problems are small, so don't be afraid to ask for help. This stuff can be confusing!

## 2. Get started

1. Accept the GitHub assignment and open your team's repository.
2. Follow the setup steps in that repository's README.
3. Read your assigned issue and the relevant sections of `docs/contracts.md`.
4. Read `course_lookup/tui/README.md` for a widget issue.
6. Start a branch from the latest `main`. Use one branch per issue and include your
   name, such as `issue-14-<your_name>`. Do not commit directly to `main`.

For your first issue, start with:

```sh
git checkout main
git pull
git checkout -b issue-14-<your_name>
```

Replace the example branch name with one for your issue and your name.

## 3. Start each work day by saving and updating your branch

Before you begin work each day, save any changes from your last session in a commit
on your issue branch. Then update your branch with the latest `main`:

```sh
git status
git add path/to/your/changed_file.py path/to/your/test_file.py
git commit -m "Work on issue 14"
git checkout main
git pull
git checkout issue-14-<your_name>
git rebase main
```

Replace the example file paths, issue number, and branch name with your own. If
`git status` shows no changes to commit, skip `git add` and `git commit`; do not make
an empty commit. Run these commands from the project repository. If a rebase reports
conflicts, resolve them, stage the resolved files, and run `git rebase --continue`.
If you have already pushed this branch to GitHub, update it after rebasing with
`git push --force-with-lease`. Ask your instructor for help if you are unsure how to
resolve a conflict.

## 4. Complete and check your issue

- Follow the acceptance criteria in your issue.
- Add tests in the test file named in your issue. Use `make_course` to build test
  courses and cover normal behavior, edge cases, and unknown data where relevant.
- Run your test file while you work. For example:

  ```sh
  poetry run pytest tests/test_filters_identity.py
  ```

- Before opening a PR, run the full test suite and both code checks from the README:

  ```sh
  poetry run pytest

  # run format checks:
  poetry run black --check course_lookup tests

  # run format fixes:
  poetry run black course_lookup tests

  # run linter:
  poetry run flake8 course_lookup tests
  ```

- Fix any failures before you submit. If Black reports formatting changes, run
  `poetry run black course_lookup tests`, then run all three checks again.

## 5. Submit a pull request

Use this checklist for each issue:

- [ ] Commit your finished code and tests on your issue branch.
- [ ] Run all tests and code checks; confirm they pass.
- [ ] Push your branch to GitHub.
- [ ] Open one PR for this issue, with `main` as the base branch.
- [ ] Give the PR a clear title, such as `Implement issue 14: calendar export`.
- [ ] Use this PR description structure:

  ```markdown
  ## What changed
  Describe the code change.

  ## Why
  Explain how it meets the issue requirements.

  ## How I tested it
  List the tests and checks you ran, and why those test cases cover the behavior.

  ## Issue
  Closes #14
  ```

- [ ] Replace `#14` with your issue number so GitHub links and closes the issue.
- [ ] If you used AI, disclose the tool and how you used it (see the AI policy).
- [ ] Confirm the PR's automated checks pass and respond to review comments promptly.

Do not merge your PR until your instructor has approved it. After approval, follow
section 6 to rebase if needed, merge into `main`, and delete the branch. See
`CONTRIBUTING.md` in the project repository for the complete PR instructions.

Sarah will review each review-ready PR within two business days. If a PR
needs revisions, Sarah will review your updated PR within two business. Submitting a PR is not the same thing as completing the PR. Completeness is necessary to receive any credit.

## 6. Merging Your Branch After Approval

Merge only after your instructor has approved the PR. Before you merge, update your
branch so it includes the latest `main` (other students may have merged since you
opened the PR):

```sh
git checkout main
git pull
git checkout issue-14-<your_name>
git rebase main
```

If the rebase reports conflicts, resolve them, stage the resolved files, and run
`git rebase --continue`. Then update your remote branch:

```sh
git push --force-with-lease
```

Confirm the PR checks still pass. On GitHub, merge the PR into `main` (use
**Rebase and merge** if that option is available), then delete the remote branch when
GitHub offers.

Finally, update your local repo and remove the local issue branch:

```sh
git checkout main
git pull
git branch -d issue-14-<your_name>
```

Replace the example branch name with yours. You are then ready to claim your next
issue from an up-to-date `main`.

## 7. Generative AI and outside-help policy

Generative AI tools (e.g., ChatGPT, Claude, GitHub Copilot) can be useful learning
resources. However, **you are expected to do your own programming, writing, and
problem-solving in this course.**

The goal is not simply to produce working software, but to develop the skills and
judgment needed to become a software engineer.

### Acceptable uses

- Ask AI to explain programming concepts, syntax, tools, or error messages.
- Use AI to explore possible approaches or debugging strategies.
- Request feedback on code you have already written.
- Generate examples to help you learn a concept.

You may discuss concepts and debugging strategies with classmates, but each student
must write and understand their own issue's implementation and tests.

### Unacceptable uses

- Ask AI to complete assignments, implement issues, or write project code.
- Copy AI-generated code into your submissions, even with minor modifications.
- Use AI to write GitHub issues, pull request summaries, progress reports, or other
  project documentation.
- Paste assignment instructions or prompts into AI tools and submit the generated
  responses as your own work.

### Pull request summaries and documentation

> **Your pull request summaries, issue descriptions, and other project documentation
must be written in your own words and in your own voice.** You should be able to
explain what you changed, why you made those changes, how you tested your work, and
any outstanding issues.
> 
> **Do not use AI to generate, rewrite, or polish these summaries.** Communicating your
technical work clearly is an essential software engineering skill, not an
administrative task.

### Accountability

You must be able to independently explain, debug, and modify everything you submit.
You may be asked to demonstrate your understanding without AI assistance.

> * **If you used AI in an acceptable way**, disclose it in your PR description: name the
tool and briefly say what you used it for (for example, “ChatGPT helped me understand
a pytest error; I wrote and verified the fix”). 
> * **If you did not use AI**, write “AI assistance: none.”

Unless an assignment explicitly states otherwise, these rules apply to all submitted
work. Unauthorized AI use may require you to redo an assignment and may be addressed
under the university's academic integrity policies.

**Bottom line:** Use AI to help you *learn how to do the work*, not to *do the work
for you*.

## Grading

* Your project grade is based on completing your three issues, the quality and
correctness of your code and tests, and your contribution to the class app. 
* Submit your PRs by the suggested checkpoints when possible.
* This is a hard deadline and no late work will be accepted. 
* This project is worth 20% of your grade.
