---
title: Git Collaboration Activity
type: activity
draft: 1
start_date: 2026-09-01
date: 2026-09-01
collapsible_headings: true
---

{:.info}
> **Credit:** This activity was originally designed by Semmy Purewall and has been adapted for this course.
>
> **Rule of Thumb**: Never develop directly on `main`. Create a branch for your work.



In this activity, you will work with a partner to practice:

1. collaborating with Git and GitHub
2. working on feature branches
3. resolving merge conflicts
4. comparing merge and rebase

You will use one shared repository for the entire activity.



## Part 1: Set Up

Decide roles now and keep them for the rest of the activity:

- <span class="badge person-a">Person A</span> is the **owner** of the GitHub repository (creates it and adds the collaborator).
- <span class="badge person-b">Person B</span> is the **collaborator** (clones the shared repository).

### 1.1. <span class="badge person-a">Person A</span> (Owner): Create the Repository

Inside your `csci338` folder:

```bash
mkdir git-collaboration
cd git-collaboration
git init
```

Create a `README.md` file:

```md
# Git Collaboration Practice
```

Create a file named `my_code.py`:

```python
def say_hello() -> None:
    print("hello world!")


if __name__ == "__main__":
    say_hello()
```

Commit the starter code:

```bash
git add .
git commit -m "Add starter code"
```

Now:

1. Create a private GitHub repository named `git-collaboration`.
2. Push your local repository to GitHub.
3. Add your partner (<span class="badge person-b">Person B</span>) as a collaborator.

### 1.2. <span class="badge person-b">Person B</span> (Collaborator): Clone the Repository

Inside your `csci338` folder, clone the repository using SSH.

Then:

```bash
cd git-collaboration
```

Confirm that your local repository points to the shared GitHub repository:

```bash
git remote -v
```

Both partners should now have the same `main` branch.


## Part 2: Merge Commits

You will both start from the same version of `main`, create separate feature branches, and make conflicting changes.

At the beginning, each person creates a branch from the same commit:

### 2.1 Create feature branches (in parallel)

Work on these at the same time — <span class="badge person-a">Person A</span> (owner) does the left column, <span class="badge person-b">Person B</span> (collaborator) does the right.

<div class="parallel-columns">
<div class="parallel-column">

#### <span class="badge person-a">Person A</span> Create `feature-a`

Make sure you are on `main`, then create a feature branch:

```bash
git checkout main
git checkout -b feature-a
```

<img src="/fall2026/images/activities/git-activity/p1-branch1.png" class="h-[250px] mb-4 border-4">

Change `say_hello()` so that it accepts a name.

For example:

```python
say_hello("Walter")
```

should print:

```text
Hello Walter!
```

Test your code.

Then commit and push your branch:

```bash
git add .
git commit -m "Add named greeting"
git push -u origin feature-a
```

</div>
<div class="parallel-column">

#### <span class="badge person-b">Person B</span> Create `feature-b`

Make sure you are on `main`, then create a different feature branch:

```bash
git checkout main
git checkout -b feature-b
```

<img src="/fall2026/images/activities/git-activity/p2-branch1.png" class="h-[250px] mb-4 border-4">

Change the function so that it prints `"hello world!"` a specified number of times.

For example:

```python
say_hello_n(3)
```

should print:

```text
hello world!
hello world!
hello world!
```

Test your code.

Then commit and push your branch:

```bash
git add .
git commit -m "Add repeated greeting"
git push -u origin feature-b
```

</div>
</div>

### 2.2. Sync and verify (both partners)

Once both of you have pushed your feature branch to GitHub, fetch each other's work and confirm you are still in sync.

On **both** computers:

```bash
git checkout main
git fetch origin
git pull origin main
```

List the remote branches:

```bash
git branch -r
```

You should see both `origin/feature-a` and `origin/feature-b`.

Then check that you share the same `main` commit:

```bash
git log -1 --oneline
```

Both partners should see the same commit hash and message (the starter commit from Part 1). If anything is missing, wait for your partner to finish pushing, then `fetch` again.

Your Git Tree should now look like this:

<img src="/fall2026/images/activities/git-activity/2-branches.png" class="w-[500px] mb-4 border-4">

### 2.3. Merge `feature-a` into `main`

<span class="badge person-a">Person A</span> will merge their feature first.

On <span class="badge person-a">Person A</span>'s computer:

```bash
git checkout main
git merge feature-a
git push origin main
```

Now the shared repository looks like this:

<img src="/fall2026/images/activities/git-activity/persona-merged.png" class="w-[500px] mb-4 border-4">

**Person A's** job was easy. Git simply moved the `main` pointer to their most recent commit. Compare the last two diagrams carefully so you understand what just happened. This kind of merge is called a *fast-forward*, because `main` had not diverged from `feature-a` (it was still an ancestor of that commit).

### 2.4. <span class="badge person-b">Person B</span> Update `main`
Before `feature-b` can be merged, <span class="badge person-b">Person B</span> should bring the newest `main` into their branch. On <span class="badge person-b">Person B</span>'s computer:

```bash
git checkout main
git pull origin main
```

Now switch back to the feature branch:

```bash
git checkout feature-b
```

View the history:

```bash
git log --all --graph --oneline
```

Because you edited the same part of `my_code.py`, but on a different branch than Person A, your history has diverged. Therefore, integrating your code with your partner's code should create a conflict that you will need to manually resolve.

### 2.5. Merge `main` into `feature-b`

While on `feature-b`, run:

```bash
git merge main
```

Git should report a merge conflict.

Open `my_code.py`. You should see conflict markers similar to:

```text
<<<<<<< HEAD
...
=======
...
>>>>>>> main
```

Edit the file so that:

- the named greeting still works
- the repeated greeting still works
- all conflict markers are removed

Test the program.

Then finish the merge:

```bash
git add .
git commit -m "Merge conflicts resolved"
```

View the history:

```bash
git log --all --graph --oneline
```

<img src="/fall2026/images/activities/git-activity/merge-commit.png" class="w-[500px] mb-4 border-4">

Push your updated feature branch:

```bash
git push origin feature-b
```

Then merge it into `main`:

```bash
git checkout main
git merge feature-b
git push origin main
```

View the history again:

```bash
git log --all --graph --oneline
```


<img src="/fall2026/images/activities/git-activity/feature-merged-to-main.png" class="w-[500px] mb-4 border-4">


Both partners should now pull the newest `main`:

```bash
git checkout main
git pull origin main
```



## Part 3: Rebasing

Now you will create the same kind of situation again, but resolve it using rebase instead of merge.

Switch roles so that each person gets to perform the other side of the workflow: whoever was <span class="badge person-a">Person A</span> in Part 2 should now be <span class="badge person-b">Person B</span>, and vice versa. (GitHub owner/collaborator stays the same.)

The diagrams below reuse the same shapes from Part 2 — read `rebase-a` for `feature-a` and `rebase-b` for `feature-b`.

### 3.1. <span class="badge person-a">Person A</span> Create Fresh Starter Code

On `main`, <span class="badge person-a">Person A</span> should create a new file named `rebase_code.py`:

```python
def say_goodbye() -> None:
    print("goodbye world!")


if __name__ == "__main__":
    say_goodbye()
```

Commit and push:

```bash
git add .
git commit -m "Add rebase starter code"
git push origin main
```

Both partners should pull:

```bash
git checkout main
git pull origin main
```

### 3.2. Create rebase branches (in parallel)

Work on these at the same time — <span class="badge person-a">Person A</span> does the left column, <span class="badge person-b">Person B</span> does the right.

<div class="parallel-columns">
<div class="parallel-column">

#### <span class="badge person-a">Person A</span> Create `rebase-a`

Make sure you are on `main`, then create a feature branch:

```bash
git checkout main
git checkout -b rebase-a
```

<img src="/fall2026/images/activities/git-activity/rebase-a-start.png" class="h-[200px] mb-4 border-4">

Change `say_goodbye()` so that it accepts a name.

For example:

```python
say_goodbye("Walter")
```

should print:

```text
Goodbye Walter!
```

Test your code.

Then commit and push your branch:

```bash
git add .
git commit -m "Add named goodbye"
git push -u origin rebase-a
```

<img src="/fall2026/images/activities/git-activity/rebase-a-new-commit.png" class="h-[170px] mb-4 border-4">

</div>
<div class="parallel-column">

#### <span class="badge person-b">Person B</span> Create `rebase-b`

Make sure you are on `main`, then create a different feature branch:

```bash
git checkout main
git checkout -b rebase-b
```

<img src="/fall2026/images/activities/git-activity/rebase-b-start.png" class="h-[200px] mb-4 border-4">

Change the function so that it prints `"goodbye world!"` a specified number of times.

For example:

```python
say_goodbye_n(3)
```

should print:

```text
goodbye world!
goodbye world!
goodbye world!
```

Test your code.

Then commit and push your branch:

```bash
git add .
git commit -m "Add repeated goodbye"
git push -u origin rebase-b
```

<img src="/fall2026/images/activities/git-activity/rebase-b-new-commit.png" class="h-[170px] mb-4 border-4">

</div>
</div>

### 3.3. Sync and verify (both partners)

Once both of you have pushed your rebase branch to GitHub, fetch each other's work and confirm you are still in sync.

On **both** computers:

```bash
git checkout main
git fetch origin
git pull origin main
```

List the remote branches:

```bash
git branch -r
```

You should see both `origin/rebase-a` and `origin/rebase-b`.

Then check that you share the same `main` commit:

```bash
git log -1 --oneline
```

Both partners should see the same commit hash and message. If anything is missing, wait for your partner to finish pushing, then `fetch` again.

Your Git tree should now look like this:

<img src="/fall2026/images/activities/git-activity/rebase-start.png" class="w-[500px] mb-4 border-4">

### 3.4. Merge `rebase-a` into `main`

<span class="badge person-a">Person A</span> merges first:

```bash
git checkout main
git merge rebase-a
git push origin main
```

Now the shared repository looks like this:

<img src="/fall2026/images/activities/git-activity/person-a-rebased-ff.png" class="max-w-[600px] mb-4 border-4">

Again, this is a *fast-forward*: `main` had not diverged from `rebase-a`.

<span class="badge person-b">Person B</span>'s branch was created from an older version of `main`. This time, instead of merging `main` into the feature branch, you will rebase the feature branch onto `main`.

### 3.5. <span class="badge person-b">Person B</span> Update `main`

On <span class="badge person-b">Person B</span>'s computer:

```bash
git checkout main
git pull origin main
git checkout rebase-b
```

You are now here (same shape as after Person A's merge):

<img src="/fall2026/images/activities/git-activity/person-a-rebased-ff.png" class="max-w-[600px] mb-4 border-4">

### 3.6. Rebase `rebase-b` onto `main`

While on `rebase-b`, run:

```bash
git rebase main
```

Git should stop because of a conflict.

Open `rebase_code.py` and resolve the conflict so that both features work.

Then:

```bash
git add .
git rebase --continue
```

When the rebase finishes, view the history:

```bash
git log --all --graph --oneline
```

<img src="/fall2026/images/activities/git-activity/rebase-complete.png" class="max-w-[600px] mb-4 border-4">

What just happened, simply:

- Git took the commits that only existed on `rebase-b`
- It **replayed** those changes on top of the newest `main`
- Those `rebase-b` commits get **new commit hashes** (they are rewritten)
- The commits on `main` are **not** rewritten — they stay exactly as they were

So , instead of creating a merge commit (like in Part 2), you end up with a straight line. 

The history is now **linear**.

### 3.7. Merge the Rebased Branch

Switch to `main`:

```bash
git checkout main
```

Merge `rebase-b`:

```bash
git merge rebase-b
```

This should be a fast-forward merge — `main` is an ancestor of the rebased `rebase-b`, so Git only moves the `main` pointer forward.

The history remains linear:

<img src="/fall2026/images/activities/git-activity/rebase-complete-main-merge.png" class="max-w-[600px] mb-4 border-4">

Push:

```bash
git push origin main
```

Both partners should pull the newest `main`:

```bash
git checkout main
git pull origin main
```


## Part 4: Reflection
After going through the merge commit and rebase process, it is useful to compare and contrast the two approachs. Please look at the history and then discussion the questions below with your partner:

```bash
git log --all --graph --oneline
```

<img src="/fall2026/images/activities/git-activity/history.png" class="w-full mb-4 border-4">

1. Why did the conflicts happen?
2. What happened when you merged `main` into a feature branch?
3. What happened when you rebased a feature branch onto `main`?
4. How did the resulting Git histories differ?
5. Which approach makes more sense to you right now?
