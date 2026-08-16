---
title: Code Editors
type: lab
num: 1
draft: 0
assigned_date: 2026-08-20
due_date: 2026-08-26
points: 6
---

## Introduction
Welcome to your first CSCI 338 lab! The goal of today's lab is to get you a little more comfortable doing "configuration things," including working on the command line, configuring your command line environment, and working with command line code editors. You will complete the following tasks:
1. [Set-Up](#setup)
1. [VS Code Exercises](#vscode)
1. [Command Line Exercises](#command-line)
1. [OS Environment Exercises](#dot-files)
1. [Vim / Emacs Exercises](#vim-emacs)
1. [Java Readiness Check](#java-check)

**I have curated a list of useful resources on the [course resources page](/resources/).** Please see the "Command Line" and "Code Editors" sections.

{:.info}
> When a step has <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> and <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> labels, use the line for your OS and skip the other. Shared steps have no OS label.
>
> * <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> every terminal step in this lab is in **WSL**, not PowerShell. Your home folder is `~` (something like `/home/yourname`). That is **not** the same as `C:\Users\...`.
> * <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> use the **Terminal** app. Your home folder is also `~`.

{:#setup}
## Part 1. Set-Up
1. Install [VS Code](https://code.visualstudio.com/download) if it isn't already installed on your machine.
1. <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> [follow these instructions to install WSL and a Linux distribution](/resources/wsl) (Windows Subsystem for Linux). Read / watch them carefully — if you skip steps, you will likely have to rebuild your Linux distro. When you're done, open a WSL terminal and type `pwd`. You should see a path like `/home/yourname`.
1. Create a directory called `csci338` in your home folder (`cd` then `mkdir csci338`).
    * <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> you can put `csci338` somewhere else if you want, but **not in Downloads**.

<div class="info">

**Before moving on**

[ ] VS Code is installed
[ ] `ls` shows a `csci338` folder

</div>

{:#vscode}
## Part 2. VS Code Exercises

### 2.1. Install VS Code Extensions
Please install the following VS Code Extensions:
* Live Server (by Ritwick Dey)
* Prettier (by Prettier; should have the blue "verified" badge)
* Prettier ESLint (by Rebecca Vest)

To install VS Code Extensions:
* From within VS Code, open the extensions window by clicking the extensions icon (looks like 4 squares on the left-hand bar).
* Search for the extension name using the search textbox.
* When you find the extension, install it.

### 2.2. Configuration Tasks

#### Configuring Prettier
Configure "Format on Save" using Prettier by modifying the `settings.json` file (a configuration file used to customize your VS Code Editor). To find `settings.json`, type <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> Shift + CMD + P or <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> Shift + CTRL + P and then type `settings.json` in the search textbox that appears. Then, add the following code to `settings.json` within the curly braces. Note that in JSON, each key-value pair must be separated by a comma or else there will be syntax errors:

```json
"editor.formatOnSave": true,
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

You can read more about configuring "Format on Save" using Prettier [here](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code#how-to-use-prettier-in-visual-studio-code).

When you're done, test that the "format on save" functionality works by creating a `test.js` JavaScript file with the following code:

```js
function foo(a, b) {const c=a+b; const d = c**2; return c+d;}
```

When you save the file, it should be autoformatted as follows:

```js
function foo(a, b) {
    const c = a + b;
    const d = c ** 2;
    return c + d;
}
```

<div class="info">

**Before moving on**

[ ] Saving `test.js` autoformats it

</div>

#### Optional: turn off editor AI

VS Code often pops up Copilot, Codex, Claude, and similar tools. That is noisy, and it is not allowed during Programming Readiness Verification.

If you want them **off in every folder**, follow [Turn Off Editor AI](/resources/disable-editor-ai). Download [toggle-editor-ai.py](/starter-code/vs-code/toggle-editor-ai.py), then:

```bash
python3 toggle-editor-ai.py off
```

Then Command Palette → **Developer: Reload Window**. Run the same script with `on` when you want AI back.

{:#command-line}
## Part 3. Complete the Command Line Exercises
Please complete the following command line exercises with the help of the [Command Line Reference](/resources/command-line) that has been compiled for you. Feel free to collaborate with your classmates!

### 3.1 Open a Terminal
* <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> open the Terminal app
* <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> open WSL

### 3.2. Navigation
1. Figure out which directory you're in (`pwd`).
    * <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> `explorer.exe .` from WSL opens File Explorer at your current WSL folder.
1. Navigate to the folder where you plan to save your coursework (`cd`). **Pro-tips**:
    * If any of your folder names have spaces, surround the path with quotes
    * Use the tab key to autocomplete the path
    * Use the up and down keys to revive old commands
    * Use the `history` command to see the commands you've issued in the past

### 3.3. Create
1. Navigate to the `csci338` directory you made in Part 1.
1. Create a directory called `lab01` within `csci338` (`mkdir`).
1. Navigate into the `lab01` directory you just made.
1. Create a new file called `index.html` (`touch`).
1. Create another new file called `style.css` (`touch`).
1. Copy the Google homepage locally: `curl https://www.google.com > google-home.html`

If you did everything correctly, you should have a directory structure that looks like this:

```text
csci338
└── lab01
    ├── google-home.html
    ├── index.html
    └── style.css
```

### 3.4. List
1. Verify that the new files exist in your current directory (`ls`).
1. List all of the files and folders in your home (`ls ~`).
1. List all of the files and folders in your home directory including hidden files (`ls -la ~`).
1. List files recursively with `tree`. If `tree` is not installed:
    * <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> `sudo apt-get update` then `sudo apt-get install tree`
    * <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> `brew install tree`

    Then try:
    * `tree ~ -La 1`
    * `tree ~ -La 2`

    `tree ~` with no `-L` can print a huge list; skip it if it is slow.

### 3.5. Read
1. Read the contents of the `google-home.html` file you just created (`cat`).
1. Inspect the file using some of the other read commands (`less`, `head`, `tail`, `wc`).
    * **Pro-tip:** For `less`, use the space bar to scroll down and `q` to quit.

### 3.6. Write
1. Append the sentence "Hello World" to `index.html`: `echo "Hello World" >> index.html`
1. Do it again.
1. Read the contents of `index.html` (`cat`). You should see "Hello World" twice.
1. Now replace the contents of `index.html` with "Goodbye": `echo "Goodbye" > index.html`
1. Read the contents of `index.html` (`cat`). You should see only "Goodbye".
1. You can also use `>>` and `>` to write to a new file: `echo 'Yo yo' > new.txt`
1. Read `new.txt` (`cat`).
1. Now remove it (`rm new.txt`).
1. Notice the difference: `>>` appends; `>` overwrites.

### 3.7. Move & Copy
From `lab01`, practice on files you just create:

1. `touch notes.txt`
1. `mkdir practice_folder`
1. `touch practice_folder/inside.txt`
1. Copy a file: `cp notes.txt notes-copy.txt`
1. Rename a file: `mv notes-copy.txt notes-renamed.txt`
1. Copy a directory and all subdirectories: `cp -r practice_folder practice_folder_copy`
1. Move a file into a folder: `mv notes-renamed.txt practice_folder/`

### 3.8. Search
Use grep to search files for strings / text.
1. Find the word "Goodbye" in your current directory or any descendants: `grep "Goodbye" ./ -r`
1. Same search, case insensitive: `grep "goodbye" ./ -ri`
1. Same search anywhere in your home directory: `grep "goodbye" ~ -ri`

### 3.9. Make a bash script
You can also combine multiple commands into a bash script (use the `.sh` extension). Let's make a bash script that sets up a basic web app in your current directory.

* Create a script called `start-web-prj.sh`
* Add the following lines of code to the script:

```bash
#!/bin/bash

# Prompt the user for the folder name
read -p "Enter the folder name: " DIR_NAME

# 1. Create a new directory if it doesn't already exist
if [ -d "$DIR_NAME" ]; then
    echo "Directory '$DIR_NAME' already exists. Exiting."
    exit 1
else
    mkdir "$DIR_NAME"
    echo "Directory '$DIR_NAME' created."
fi

# 2. Navigate into it
cd "$DIR_NAME" || { echo "Failed to navigate into $DIR_NAME. Exiting."; exit 1; }

# 3. Create a new starter index.html file
echo '''
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" />
    <title>Hello World</title>
</head>

<body>
    <h1>Hello World</h1>
    <p>Your starter file.</p>
</body>

</html>
''' > index.html
echo "index.html created."

# 4. Create a new starter styles.css file
echo '''
body * {
    box-sizing: border-box;
}
body {
    font-family: Arial, sans-serif;
}
''' > styles.css

echo "styles.css created."

# 5. Navigate back to the original directory
cd ..
```

When you're done, execute the script from `lab01`:

`bash ./start-web-prj.sh`

When it asks for a folder name, type `my_new_folder` and press Enter.

Take a look at what was created: `tree .`

Now open the HTML file in a browser:

* <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> `open my_new_folder/index.html`
* <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> `wslview my_new_folder/index.html`
* **Linux:** `xdg-open my_new_folder/index.html`

And finally, open the current folder in VS Code:

`code .`

* <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> if that didn't work, see [this Stack Overflow post](https://stackoverflow.com/questions/29955500/code-is-not-working-in-on-the-command-line-for-visual-studio-code-on-os-x-ma) (Command Palette → **Shell Command: Install 'code' command in PATH**).

<div class="info">

**Before moving on**

[ ] `code .` opens VS Code
[ ] Folders match the tree below (extra files from 3.7 are fine)

```text
csci338
└── lab01
    ├── google-home.html
    ├── index.html
    ├── my_new_folder
    │   ├── index.html
    │   └── styles.css
    ├── start-web-prj.sh
    └── style.css
```

</div>

{:#dot-files}
## Part 4. OS Environment Exercises
In Linux-style operating systems, you can create shortcuts, aliases, and customizations by editing your shell config file. We'll make an alias so that typing `338` takes you to your `csci338` directory.

1. Print the path you want the alias to open (`cd ~/csci338` then `pwd`) and copy it.
1. See which shell you use: `echo $SHELL`
    * **zsh** (usual on Mac): you will edit `~/.zshrc`
    * **bash** (usual on WSL): you will edit `~/.bashrc`
1. Open that file and add one line at the bottom, using **your** path from step 1:

```bash
alias 338='cd /paste/your/path/here'
```

1. Save the file, then reload it: `source ~/.zshrc` or `source ~/.bashrc` (whichever you edited).
1. Test: `cd ~` then `338` then `pwd`. You should be in `csci338`.

More about these files: [The Significance of .bashrc or .zshrc](https://medium.com/@email2smohanty/the-significance-of-bashrc-or-zshrc-configuration-file-49fa31c5da17).

<div class="info">

**Before moving on**

[ ] `338` then `pwd` shows `csci338`

</div>

{:#vim-emacs}
## Part 5. Vim / Emacs Exercises

Using either [vim](/resources/vim) or [emacs](/resources/emacs), open a file from the command line, edit it, save it, and exit.

**Vim** (from `lab01`):

```bash
vim notes.txt
```

1. Press **i** (insert mode)
1. Type a short sentence
1. Press **Esc**
1. Type `:wq` and press Enter (write and quit)

Then `cat notes.txt` to confirm your sentence is there.

<div class="info">

**Before moving on**

[ ] `cat notes.txt` shows the sentence I typed

</div>

{:#java-check}
## Part 6. Java Readiness Check
The programming-readiness verification will use Java because Java is the language used in the prerequisite courses. Before leaving today, make sure your computer can compile and run a Java program.

This environment check is **Practice**, not Verification. It confirms that your tools work; it does not earn a readiness specification.

1. From the command line, check for the Java compiler: `javac --version`
1. If `javac` is not installed:
    * <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> in WSL, run `sudo apt install default-jdk`
    * <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> install a current JDK, then reopen Terminal
1. In `lab01`, create `ReadinessCheck.java`:

```java
public class ReadinessCheck {
    public static void main(String[] args) {
        System.out.println("Java is ready");
    }
}
```

1. Compile and run it:

```bash
javac ReadinessCheck.java
java ReadinessCheck
```

<div class="info">

**Before moving on**

[ ] The terminal prints `Java is ready`

</div>

{:#turn-in}
## What do I turn in?
Under Lab 1 on Moodle, paste the command line history from today's lab (`history`). If the dump is huge, the last ~80–100 lines that include this lab is enough.

### What to study / have done after completing this lab...
* If you are a Windows user, make sure your WSL is installed and configured
* Make sure your VS Code editor is set up. If Copilot or other AI tools keep popping up, [turn them off](/resources/disable-editor-ai).
* Make sure you know some basic shell commands, and specifically how to navigate, search, create, delete, copy, read, and move files. Practice with the quiz at the bottom of this page, or these [sample command line quiz questions](https://docs.google.com/document/d/1cBdqsCEobdzdNiGrISZip3Xm45bs0VgfWyM9rJM7M8A/edit?usp=sharing).
* Make sure you know how to open, edit, save, and exit either vim or emacs.
