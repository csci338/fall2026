---
title: Configuring git and GitHub
type: lab
num: 2
draft: 0
assigned_date: 2026-08-27
due_date: 2026-09-02
points: 6
collapsible_headings: true
---

## Introduction
Today we will be configuring your lab repo using **git** and **GitHub**. Next week we will be working on ***collaboration workflows***.

Here are the <a href="https://docs.google.com/presentation/d/1w4f6h1GClFr_CXN9iZ1_Z3XRtxx4DenK/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true" target="_blank">Lab 2 slides</a>.

> **Programming Readiness Tip**
> If you feel like you need more Java or Python programming practice, please see the programming review section.

## Your Tasks

### 1. Add your GitHub username to the spreadsheet
If you haven't already, please register for a GitHub account, and then add your full name and your GitHub username to <a href="https://docs.google.com/spreadsheets/d/1UFSU0B8jAJTitmVBNrfmUxMcw9gh5L-B/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true" target="_blank">this spreadsheet</a>. I will invite you to be a contributor to the relevant repos.
* Note that **you will have to confirm this invitation** via email.
* I recommend that you use your UNCA email account because you can get some student perks later from GitHub.

<div class="info">

**Before moving on**

[ ] My name and GitHub username are on the spreadsheet
[ ] I can sign in to GitHub in the browser

</div>

### 2. Set up public / private key authentication for GitHub
When accessing a remote server (including a GitHub server), a common authentication strategy involves using public and private keys. Below, you will go through the process of generating a public / private key. Your private key is for you and you alone. It is your secret, and should not be shared with anyone. Your public key, on the other hand, is typically copied to a server to which you have access.

In the workflow outlined below, all commands should be run from the command line on your  **local computer** (not arden). If you're a Windows user, activate WSL.

#### 2.1. Generate a public / private key pair
To generate a public / private key pair (use WSL if you're a Windows user):

* Type the following command (from any directory on your terminal): **`ssh-keygen`**
* This will generate your private key inside the `.ssh` folder inside your home directory (accept the default name or rename -- up to you). Typically, the private key is  called `id_rsa` and the public key is called `id_rsa.pub`.
* Verify that this worked by typing `ls -la ~/.ssh`. You should see both files (with today's timestamp).

#### 2.2. Copy your public key to GitHub
* Follow the <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account" target="_blank">GitHub instructions</a>
* More on public / private keys here: <a href="https://kb.iu.edu/d/aews" target="_blank">https://kb.iu.edu/d/aews</a>

<div class="info">

**Before moving on**

[ ] `ls -la ~/.ssh` shows `id_rsa` and `id_rsa.pub` (or equivalent key files)
[ ] My public key is added to GitHub under SSH keys

</div>

### 3. Fork the Course Repository
In this class, we're going to be working with various shared repositories on GitHub. For most of our labs and in-class exercises, we will be using the **`class-exercises-fall2026`** repository. You will "fork" your own personal copy of this repository on Github that you will periodically sync with the class repo. This will be for doing individual work and activities.

Before we get into the details of various GitHub workflows, you will create a copy of the course repo -- one that **you own** -- on GitHub. To do this:
1. Navigate to the course repository: <a href="https://github.com/csci338/class-exercises-fall2026" target="_blank">https://github.com/csci338/class-exercises-fall2026</a>
1. Click the "Fork" button (towards the top of the page on the right hand side)
1. Confirm where you would like the repo to be forked (choose your GitHub account). 

<div class="info">

**Before moving on**

[ ] I can open `https://github.com/<my-username>/class-exercises-fall2026` in the browser

</div>

### 4. Set up the course repo on your local computer
Now, on your laptop, make a copy of your repo locally (using the **SSH** protocol):

1. Navigate to your `csci338` directory on the command line.<br><br>
1. On GitHub, click the green "Code" button of the course repo that you just forked. Make sure that you copy the **SSH version** of the address:

    <img class="inline-block max-w-[46%]" src="/fall2026/images/labs/lab02/good.png" /> <img class="inline-block max-w-[46%]" src="/images/labs/lab02/bad.png" />
1. Within your `csci338` directory, clone the `class-exercises-fall2026` repo using the **ssh method** using the following command:

    ```bash
    git clone ADDRESS_YOU_JUST_COPIED
    ```
    The address should look something like this: `git@github.com:walter/class-exercises-fall2026.git`
1. Navigate into the `class-exercises-fall2026` folder (that was just created)
1. Look at commit history (`git log`)

<div class="info">

**Before moving on**

[ ] `pwd` shows I am inside `class-exercises-fall2026`
[ ] `git log` shows commit history (no authentication errors)

</div>

### 5. Make a new branch
1. Create a new branch called `lab02-b`
    * See the <a href="/resources/github">git cheatsheat</a>
1. Switch to the branch you just made (if you haven't already)
1. Verify that you are now on the `lab02-b` branch (see cheatsheet)

<div class="info">

**Before moving on**

[ ] `git branch` (or `git status`) shows I am on `lab02-b`

</div>

### 6. Write some code (Java Practice)
1. Open the entire `class-exercises-fall2026` folder in VS Code.
1. Create a folder named `lab02`
1. Inside of your `lab02` folder, create a text file called `ContainsPair.java`
1. Within the `ContainsPair.java` file, implement both a nested-loop solution and a set-based solution to determine whether a list contains a repeated value. Here's a stub to help you:

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ContainsPair {

    public static void main(String[] args) {
        checkCase(Arrays.asList(), false, "empty");
        checkCase(Arrays.asList(3), false, "singleton");
        checkCase(Arrays.asList(1, 2, 3, 2), true, "duplicate");
        checkCase(Arrays.asList(5, 2, -10, 44, 90), false, "no duplicate");
        checkCase(Arrays.asList(-2, 4, -2), true, "negative duplicate");
        checkCase(Arrays.asList(7, 7, 7), true, "repeated more than twice");
    }

    public static boolean checkNestedLoops(List<Integer> values) {
        // TODO: compare values using nested loops
        return false;
    }

    public static boolean checkWithSet(List<Integer> values) {
        // TODO: use a Set to remember values already seen
        return false;
    }

    private static void checkCase(List<Integer> values, boolean expected, String label) {
        boolean nestedResult = checkNestedLoops(values);
        boolean setResult = checkWithSet(values);
        if (nestedResult == expected && setResult == expected) {
            System.out.println("PASS: " + label);
        } else {
            System.out.println(
                "FAIL: " + label + " expected " + expected
                + " but got nested=" + nestedResult + ", set=" + setResult
            );
        }
    }
}
```
1. Compile it on the command line using the `javac` command (e.g., `javac ContainsPair.java`). See the Lecture 3 slides for potential solutions. Make sure you're in the right directory. This should generate the compiled `ContainsPair.class` file.
    * If you're on WSL and `javac` is not installed, you can install it using the apt package manager as follows:<br>`sudo apt install default-jdk`
1. Run your program on the command line by typing `java ContainsPair`

<div class="info">

**Before moving on**

[ ] `javac ContainsPair.java` succeeds
[ ] `java ContainsPair` prints `PASS` for each test case

</div>

### 7. Exclude all `.class` files
When working with version control, you don't want to commit compiled code, system files, passwords, or third-party libraries. Luckily, the `.gitignore` file makes this easy.

From the command line
1. Type `git status -u`. What happened?
    * This command should tell you all of the untracked changes you've made.
1. Edit the `.gitignore` file by adding this line: `*.class`
1. Type `git status -u` again. What happened?

If you did it correctly, git is now ignoring your `*.class` file.

<div class="info">

**Before moving on**

[ ] `.gitignore` includes `*.class`
[ ] `git status -u` no longer lists `ContainsPair.class`

</div>

### 8. Write some code in Python (Language-Transfer Practice)
First, check if python is installed:

#### Windows
If you're using WSL, python is probably installed. Open a WSL terminal and type:<br> `python --version` or `py --version` or `python3 --version`.<br> If any of those commands returns a 3.x python version, then you're good to go. Otherwise, you will need to install a new version: <a href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a>

#### Mac
If you're on a Mac, check if a 3.x version of python is installed. Open a terminal and type:<br> `python --version` or `python3 --version`.<br> If these commands aren't recognized, or if they show an older version of python, you will need to install a new version: <a href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a>

#### Write some code
1. Inside of your `lab02` folder, create another text file called `contains_pair.py`
1. Within the `contains_pair.py` file, implement one of the "contains pair" solutions we discussed in class (ideally the fastest one). Here's a stub to help you:

    ```py
    def check(l: list):
        # your code goes here
        return False


    print(check([1, 2, 3, 2]))          # should print True
    print(check([5, 2, -10, 44, 90]))   # should print False
    ```
Run / test your program on the command line by typing `python3 contains_pair.py`. 

On some systems, the python executable is invoked with a different alias (see below). So figure out which one you'll need to use and make a note of it:

* `py contains_pair.py`
* `python contains_pair.py`
* `py3 contains_pair.py`

New to Python? Begin from your working Java solution and compare the two languages. For this **Practice** section, you may ask ChatGPT to explain Python syntax or help translate your own Java code, but disclose that use in a comment. You remain responsible for tracing and explaining the Python result. This translation does not count as readiness Verification.

<div class="info">

**Before moving on**

[ ] Running my Python file prints `True` then `False`

</div>

### 9. Stage and commit your changes
1. Stage your changes using `git add .` (the dot indicates that you want to stage all of the files that have been added / deleted / edited).
1. Commit your changes using `git commit -m "Some descriptive commit message"` (e.g. "Lab 2 is completed").

<div class="info">

**Before moving on**

[ ] `git status` shows a clean working tree (or only untracked files I intentionally left out)
[ ] `git log -1` shows my latest commit message

</div>

### 10. Push (upload) your changes to GitHub
1. Push your branch to GitHub using the `git push` command
    * This command should display an error with a suggested push command (e.g., `git push --set-upstream origin <your-branch-name>`). This is telling you that there is no branch called `lab02-b` in the GitHub repository.
1. Try again by typing `git push --set-upstream origin lab02-b`


#### A note on your origin path
Within git, your **`remote origin`** variable holds both the address and the protocol you will be using to interact with a remote server (like GitHub). Some of you are accessing the remote server using the **https** protocol while others are using the **ssh** protocol. For the sake of simplicity, let's all use **ssh**. To check your origin, type: `git remote show origin`.

If it prints `git@github.com:<your-user-name>/class-exercises-fall2026`, you don't have to do anything. Otherwise, let's switch up your origin protocol to ssh as follows:

```sh
git remote rm origin  # removes current references
git remote add origin git@github.com:<your-user-name>/class-exercises-fall2026.git  # adds new reference
git remote show origin  # prints the new origin (which should be the correct one).
```

If you get a "Please tell me who you are." error message, please set the following environment variables on your machine (you will only have to do this once):

```sh
git config --global user.name "My Name"
git config --global user.email "my_email@gmail.com"
```

Please use the email you used to register with GitHub

### 11. Make a Pull Request
Now that your code is on GitHub, you're going to make a "Pull Request" so that I can review your code. Do this on **your fork** of `class-exercises-fall2026` (not the instructor's `csci338` repo).

1. Open your fork on GitHub: `https://github.com/<your-username>/class-exercises-fall2026`
1. Click **Contribute** → **Open pull request** (or the **Compare & pull request** banner if GitHub shows one).
1. Set the branch comparison like this:

    {% no-copy %}
    ```text
    base (left)                    compare (right)
    ┌─────────────────────┐        ┌───────────────────────┐
    │ your-username/main  │   ←    │ your-username/lab02-b │
    │   (your fork)       │        │   (your branch)       │
    └─────────────────────┘        └───────────────────────┘
    ```

    Both sides should show **your GitHub username** as the repository owner. If the left side says `csci338`, switch it to your fork before creating the PR.

1. Copy the URL of the pull request and keep the link handy for Canvas.

<div class="info">

**Before moving on**

[ ] The `lab02-b` branch is visible on GitHub
[ ] I opened a pull request from `lab02-b` into **my** `main` (not the instructor repo)

</div>

## What do I turn in?

Please paste a link to your pull request in the Canvas submission box. Also, please verify that...

* You created a branch called `lab02-b`.
* You have a working `ContainsPair.java` file in it.
* You have edited your `.gitignore` file so that `ContainsPair.class` is not checked into version control.
* You have a working `contains_pair.py` file in it.
