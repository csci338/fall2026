---
title: A Tour of Git Commands
type: lab
num: 3
draft: 0
assigned_date: 2026-09-03
due_date: 2026-09-09
points: 6
collapsible_headings: true
---

**Credit: This activity was designed by Semmy Purewall**

{:.info}
> ## Learning Goals
> By the end of this lab, you should be able to:
>
> 1. create and use a local Git repository
> 2. stage, commit, inspect, and compare changes
> 3. connect a local repository to GitHub and push your work
> 4. use a branch and pull request to make a small change

## Overview

This lab uses **one repository**: `lab03-exercises`.

You will create it on your computer first, then connect it to GitHub later in the lab. Git works on your computer without GitHub; GitHub is simply an online home for a Git repository.

You will use one file, `README.md`, for both project notes and written responses. There is no separate `answers.md` file.

The programming work in this lab is intentionally small. You already practiced the duplicate-checking problem in Lab 02. Here, you will reuse **one** of those files so that you can focus on the Git workflow.

## Part 1: Create Your Local Repository

1. Open a terminal and move to your `csci338` directory. Create a directory for this lab, move into it, and initialize Git:

    ```bash
    mkdir lab03-exercises
    cd lab03-exercises
    git init -b main
    ```

    {:.info}
    > `git init` turns the current directory into a Git repository. It creates a hidden `.git` directory where Git stores the repository's history and settings.

2. List the contents of the directory, including hidden files:

    ```bash
    ls -la
    ```

    You should see the hidden `.git` directory.

3. Create a file named `README.md` and add the following starter content:

    ```md
    # Lab 03: Git and GitHub

    ## README Responses

    ### 1.1 After initialization

    ### 1.2 First git status

    ### 1.3 After the first commit

    ### 1.4 git log

    ### 1.5 git diff

    Paste the `git status` and `git diff` commands and their output.

    How does this `git status` differ from the one in **1.2**?

    ### 1.6 Git command reflections

    In one or two sentences each, what does each command do?

    - `git init`
    - `git status`
    - `git add`
    - `git commit`
    - `git log`
    - `git diff`

    ### 1.7 Repository link

    ### 1.8 Comparing approaches

    In your own words:

    - How does the nested-loop approach check for a duplicate?
    - How does the set-based approach check for a duplicate?
    - What is the runtime and memory trade-off of each?

    ### 1.9 Pull request merge options

    In your own words, what does each GitHub merge option do?

    - Create a merge commit
    - Squash and merge
    - Rebase and merge
    ```

4. In `README.md`, under **1.1 After initialization**, paste the `ls -la` command and its output. Use a fenced code block, like this:

    ````md
    ```text
    ls -la
    ...your output here...
    ```
    ````

<div class="info ml-7">

**Before moving on**

[ ] I am inside `lab03-exercises`
[ ] `ls -la` shows a `.git` directory
[ ] I created `README.md` with the starter headings

</div>


## Part 2: Make Your First Commit

1. Check your repository's state:

    ```bash
    git status
    ```

2. Copy that `git status` output now, before you change anything else. In `README.md`, find the heading **1.2 First git status** (in the starter outline from Part 1) and paste the command plus that output under it.

3. Stage and commit `README.md` itself:

    ```bash
    git add README.md
    git commit -m "Create lab README"
    ```

4. Run these commands:

    ```bash
    git status
    git log --oneline
    ```

    In `README.md`, under **1.3 After the first commit**, paste the `git status` command and its output. In `README.md`, under **1.4 git log**, paste the `git log --oneline` command and its output.

    When `git status` says your working tree is clean, it means Git sees no uncommitted changes.

<div class="info ml-7">

**Before moving on**

[ ] I pasted `git status` under **1.2** *before* my first commit
[ ] `git log --oneline` shows the `"Create lab README"` commit
[ ] **1.3** and **1.4** in `README.md` have the post-commit `git status` and `git log` output

</div>

## Part 3: Make and Inspect a Change

1. Add this sentence **under the title** at the top of `README.md`:

    ```text
    This repository documents my practice with 
    local Git, GitHub, branches, and pull requests.
    ```

2. Before staging the change, run:

    ```bash
    git status
    git diff
    ```

3. In `README.md`, under **1.5 git diff**, paste the `git status` and `git diff` commands and their output. Then answer: 
    - How does this `git status` differ from the one in **1.2**?

4. Stage and commit the change:

    ```bash
    git add README.md
    git commit -m "Describe repository purpose"
    ```

<div class="info ml-7">

**Before moving on**

[ ] I added the purpose sentence under the title in `README.md`
[ ] **1.5** includes `git status` / `git diff` output and a short answer comparing this `git status` with **1.2**
[ ] I committed with `"Describe repository purpose"`

</div>

## Part 4: Bring Forward One Existing Program

You do **not** need to solve a new programming problem for this lab. Reuse one completed program from Lab 02:

* `ContainsPair.java`, or
* `contains_pair.py`

1. Create either a `java-practice` or `python-practice` directory in `lab03-exercises`, then copy your chosen Lab 02 file into that directory. Use only one language for this lab.

2. Run the program to confirm it still works.

3. Create a `.gitignore` file at the root of your `lab03-exercises` folder containing this line:

    ```text
    *.class
    ```

    This prevents Java's compiled `.class` files from being committed. It is fine to include this file even if you choose Python.

4. Stage and commit the program and `.gitignore` file:

    ```bash
    git add .
    git commit -m "Add duplicate-checking practice program"
    ```

<div class="info ml-7">

**Before moving on**

[ ] I have either `java-practice/` or `python-practice/` (not both) with my Lab 02 file
[ ] Running the program still works
[ ] `.gitignore` at the repo root contains `*.class`
[ ] I committed the program and `.gitignore`

</div>

## Part 5: Add Your Reflection

1. In `README.md`, under **1.6 Git command reflections**, answer in one or two sentences each: what do the following `git` commands do (do not use GenAI for this):
    - `git init`
    - `git status` 
    - `git add`
    - `git commit` 
    - `git log`
    - `git diff`

2. Commit your reflection:

    ```bash
    git add README.md
    git commit -m "Add Git command reflection"
    ```

<div class="info ml-7">

**Before moving on**

[ ] **1.6** describes `git init`, `git status`, `git add`, `git commit`, `git log`, and `git diff` in my own words
[ ] I committed the reflection

</div>

## Part 6: Connect Your Repository to GitHub

Now create an online home for your local repository.

1. On GitHub, create a repository named `lab03-exercises`.

    * Make it **public**.
    * Do **not** initialize it with a README, `.gitignore`, or license. Your local repository already has those files.

2. After GitHub creates the empty repository, copy the SSH URL shown under **push an existing repository from the command line**. It will look like this:

    ```text
    git@github.com:your-github-username/lab03-exercises.git
    ```

3. From your local `lab03-exercises` directory, connect the remote and push your work. Replace `your-github-username` with your own GitHub username:

    ```bash
    git remote add origin git@github.com:your-github-username/lab03-exercises.git
    git push -u origin main
    ```

4. Check the connection:

    ```bash
    git remote -v
    git status
    ```

    Reload the repository page on GitHub. You should see your `README.md`, program file, `.gitignore`, and commit history.

5. In `README.md`, under **1.7 Repository link**, paste the URL to your public GitHub repository. Commit and push that update:

    ```bash
    git add README.md
    git commit -m "Add repository link"
    git push
    ```

<div class="info ml-7">

**Before moving on**

[ ] I created a **public** GitHub repo named `lab03-exercises` with no extra README / license
[ ] `git remote -v` shows my SSH `origin` URL
[ ] GitHub shows `README.md`, `.gitignore`, my program, and commit history
[ ] **1.7** has the repository URL, and I pushed that commit

</div>

## Part 7: Make a Change on a Branch

So far, you have committed directly to `main`. Next, you will make a small improvement on a separate branch.

1. Create and switch to a branch named `more-tests`:

    ```bash
    git switch -c more-tests
    ```

2. Confirm that you are on the new branch:

    ```bash
    git status
    ```

3. Make these two changes on `more-tests`:

    * Add one new test case to the Java or Python program you brought forward from Lab 02. 
        - A test case is one additional program input, its expected result, and a way to see whether the actual result matches your expectation. 
        - You are adding another call to your existing program, not rewriting its duplicate-checking method or function.

    * In `README.md`, under **1.8 Comparing approaches**, answer:
        - How does the nested-loop approach check for a duplicate? 
        - How does the set-based approach check for a duplicate? 
        - What is the runtime and memory trade-off of each?

4. Run your program again to verify the new test case. Then commit the changes:

    ```bash
    git add .
    git commit -m "Document duplicate-checking approaches"
    ```

5. Compare the branch with `main`:

    ```bash
    git diff main..more-tests
    ```

    Notice that this command shows the changes that exist on `more-tests` but not on `main`.

6. Push the new branch to GitHub:

    ```bash
    git push -u origin more-tests
    ```

<div class="info ml-7">

**Before moving on**

[ ] `git status` showed I was on `more-tests` (not `main`) while making these changes
[ ] I added one new test case (another program input / expected result), without rewriting the duplicate-checking function
[ ] **1.8** describes how the nested-loop and set-based algorithms work, plus their trade-offs
[ ] I pushed `more-tests` to GitHub

</div>

## Part 8: Create and Merge a Pull Request

1. On GitHub, open a pull request with:

    * **base:** `main`
    * **compare:** `more-tests`

2. Write a short pull-request description using Markdown. Include:

    * a bullet list describing your two changes
    * a code block showing the command you used to run your program
    * a link to a relevant resource, such as the [Pro Git book](https://git-scm.com/book/en/v2) -- to practice making Markdown links.

3. Before merging, use GitHub's branch selector to look at both branches and confirm that `more-tests` contains the changes you expect.

4. Still on the pull request page, click the merge button's dropdown (do **not** merge yet). Read GitHub's descriptions of the three options. Then in `README.md`, under **1.9 Pull request merge options**, answer in your own words: what does each option do (Create a merge commit, Squash and merge, Rebase and merge)?

5. Commit and push that README update to `more-tests` (this adds a new commit to the open pull request; you still have not merged):

    ```bash
    git add README.md
    git commit -m "Explain pull request merge options"
    git push
    ```

6. Back on GitHub, refresh the pull request and confirm the new commit appears. **Now** merge: choose **Rebase and merge**. Delete the remote `more-tests` branch when GitHub offers.

<div class="info ml-7">

**Before moving on**

[ ] I opened a pull request from `more-tests` into `main` with a Markdown description
[ ] **1.9** describes merge commit, squash and merge, and rebase and merge — written *before* I merged
[ ] I merged with **"rebase and merge"** and deleted the remote `more-tests` branch

</div>

## Part 9: Update Your Local Repository

Merging on GitHub does not automatically update the copy on your computer.

1. Fetch information from GitHub:

    ```bash
    git fetch
    ```

2. Run `git status` and `git branch`. Notice what changed locally and what did not change yet.

3. Switch to `main` and pull the merged work:

    ```bash
    git switch main
    git pull
    ```

4. Delete your local feature branch:

    ```bash
    git branch -d more-tests
    ```

5. Run one final check:

    ```bash
    git status
    git log --oneline
    ```

    Your local `main` branch should now include the work that was merged through the pull request.

<div class="info ml-7">

**Before moving on**

[ ] I ran `git fetch`, then `git switch main` and `git pull`
[ ] I deleted the local `more-tests` branch
[ ] `git log --oneline` on `main` includes the work from the pull request

</div>

## What to Submit

Submit the link to your merged pull request in Canvas. Before submitting, confirm all of the following:


[ ] I created one local repository named `lab03-exercises` and connected it to GitHub.
[ ] My public GitHub repository includes `README.md`, `.gitignore`, and one reused Lab 02 program.
[ ] My `README.md` includes my command observations, reflection, repository link, approach comparison, and merge-option explanations.
[ ] I created a `more-tests` branch, made and pushed a small change on it, and opened a pull request into `main`.
[ ] I merged the pull request.
[ ] My local `main` branch includes the merged changes.
