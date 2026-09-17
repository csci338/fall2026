---
title: Understanding Package Managers
type: lab
num: 5
draft: 0
assigned_date: 2026-09-17
due_date: 2026-09-23
points: 6
collapsible_headings: true
---

## Overview

In this lab you will practice package management with:

1. Your OS package manager:
    * <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> Mac: Homebrew
    * <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> WSL or <span class="os-icon linux" title="Linux"><i class="fa-brands fa-linux" aria-hidden="true"></i><span class="sr-only">Linux</span></span> Linux: Apt
2. `poetry` (Python) — everyone
3. `npm` (Node.js) — everyone

In addition, you will:
1. Build a simple web crawler to extract links from a web page (as part of your Poetry practice - Part 2)
2. Build a simple web-based React UI (as part of your npm practice - Part 3)

By the end, you should know how to install, update, remove, and manage dependencies with these tools.

Docs (optional reading):

{: .compact}
* [Homebrew](https://brew.sh)
* [APT](https://manpages.debian.org/bullseye/apt/apt.8.en.html)
* [Poetry](https://python-poetry.org/docs/)
* [npm](https://docs.npmjs.com/)

## Set up

This lab uses your **`class-exercises-fall2026`** fork (not `lab03-exercises`).

1. **On GitHub:** open *your* fork of `class-exercises-fall2026` and sync it with the class repo (`csci338/class-exercises-fall2026`) using **Sync fork** / **Update branch**.
2. **On your computer**, in your local `class-exercises-fall2026` folder:

    ```shell
    git checkout main
    git pull
    git checkout -b lab05-b
    git branch
    ```

    After a successful `git pull`, you should see a new `lab05` folder.
3. Confirm `git branch` shows `* lab05-b`.

You will do the package-manager work inside `class-exercises-fall2026/lab05`. **As you go**, answer the questions in `lab05/answers.md`.

<div class="info">

**Before moving on**

[ ] I am inside `class-exercises-fall2026` on branch `lab05-b`
[ ] The `lab05` folder exists (with `answers.md` and `node-demo`)

</div>

## 1. Operating System Package Manager

{:#homebrew}
### 1.1. <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> Homebrew (Mac only)

> <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> <span class="os-icon linux" title="Linux"><i class="fa-brands fa-linux" aria-hidden="true"></i><span class="sr-only">Linux</span></span> If you are a Windows or Linux user, skip this section and jump to [§1.2 Apt](#apt).

**Homebrew** is a package manager for macOS that simplifies installing software.

#### Install a package

1. Open a terminal and check whether `brew` is installed:

    ```bash
    brew
    ```

2. If Homebrew is not installed, install it from <a href="https://brew.sh/" target="_blank">https://brew.sh/</a>:

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

3. Install `wget`:

    ```bash
    brew install wget
    ```

4. Verify:

    ```bash
    wget --version
    ```

5. Download a file into your current directory:

    ```bash
    wget https://www.google.com
    ```

    If it worked, `index.html` appears. View it with `cat`, then remove it with `rm`.

6. List packages Homebrew manages:

    ```bash
    brew list
    ```

#### Update and remove packages

1. Update Homebrew:

    ```bash
    brew update
    ```

2. Uninstall `wget`:

    ```bash
    brew uninstall wget
    ```

3. Confirm it is gone (this should error):

    ```bash
    wget https://www.google.com
    ```

4. Reinstall `wget`:

    ```bash
    brew install wget
    ```

5. Confirm it works again, then delete the downloaded `index.html`.

<div class="info">

**Before moving on**

[ ] I installed `wget` (Mac)

</div>


{:#apt}
### 1.2. <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> <span class="os-icon linux" title="Linux"><i class="fa-brands fa-linux" aria-hidden="true"></i><span class="sr-only">Linux</span></span> Apt (WSL or Linux only)

> <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> If you are a Mac user, skip this section (but make sure you completed [§1.1 Homebrew](#homebrew)).

**APT** is the package manager used by Debian-based Linux (for example, Ubuntu in WSL).

#### Install a package

1. Open a terminal in a Debian-based Linux environment (<span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> WSL Ubuntu, or <span class="os-icon linux" title="Linux"><i class="fa-brands fa-linux" aria-hidden="true"></i><span class="sr-only">Linux</span></span> a native Linux shell).
2. Update the local package index:

    ```bash
    sudo apt-get update
    ```

3. Install `curl`:

    ```bash
    sudo apt-get install curl
    ```

4. Verify:

    ```bash
    curl --version
    ```

5. Save the Google homepage:

    ```bash
    curl https://www.google.com > google.html
    ```

    If it worked, `google.html` appears. View it with `cat`, then remove it with `rm`.

#### Update and remove packages

1. Upgrade installed packages:

    ```bash
    sudo apt-get upgrade
    ```

2. Remove `curl`:

    ```bash
    sudo apt-get remove curl
    ```

3. Confirm it is gone (this should error):

    ```bash
    curl https://www.google.com > google.html
    ```

4. Reinstall `curl`:

    ```bash
    sudo apt-get install curl
    ```

5. Confirm it works again, then delete `google.html`.

<div class="info">

**Before moving on**

[ ] I installed `curl` (WSL / Linux)

</div>

## 2. Poetry (Python)

**Poetry** manages dependencies for Python projects.


### 2.1 Create a Poetry project

1. Confirm you are on `lab05-b` (`git branch`). If not, return to [Set up](#set-up).
2. Check whether Poetry is installed:

    ```bash
    poetry
    ```

3. If it is not installed:

    ```bash
    curl -sSL https://install.python-poetry.org | python3 -
    ```

    {:.info}
    > If this fails on a Mac, you may need SSL certificates:
    > * Finder → Applications → Python
    > * Double-click the Certificates script
    > * Run the curl install command again

4. Verify:

    ```bash
    poetry --version
    ```

    * If you get a “command not found” error, add Poetry to your PATH (see common fixes online), for example:

      ```bash
      export PATH="$HOME/.local/bin:$PATH"
      ```

5. Go to your lab folder and create a project:

    ```bash
    cd class-exercises-fall2026/lab05
    poetry new poetry-demo
    cd poetry-demo
    ```

    Your tree should look like:

    ```text
    class-exercises-fall2026/
      lab05/
        answers.md
        node-demo/
        poetry-demo/
    ```

### 2.2 Add a dependency

1. Add `requests`:

    ```bash
    poetry add requests
    ```

2. Confirm it appears in `pyproject.toml` and is installed:

    ```bash
    poetry show
    ```

### 2.3 Run code in the virtual environment

1. Create `lab05-experiments.py` inside `poetry-demo` with this starter code:

    ```py
    import requests

    def main():
        print("hello world")
        # user_agent makes it seem like the request is coming from a web browser (versus a bot)
        user_agent = {'User-agent': 'Googlebot/2.1'}
        response = requests.get("https://new.cs.unca.edu/", headers=user_agent)
        print(response.content)

    if __name__ == "__main__":
        main()
    ```

2. Run it **inside** Poetry’s environment:

    ```bash
    poetry run python lab05-experiments.py
    ```

    You should see HTML from the CS homepage.

3. Run the same file **outside** the environment:

    ```bash
    python3 lab05-experiments.py
    ```

    You should get an error because `requests` is not installed for system Python.

### 2.4 Install Beautiful Soup and extract links

Build a small crawler that prints every link on <a href="https://new.cs.unca.edu/" target="_blank">https://new.cs.unca.edu/</a>.

1. Install `bs4` with Poetry.
2. Update `main` in `lab05-experiments.py` so it prints only the URLs of links on that page.

If it works, you should see something like (about 85 links):

```text
https://unca.edu
https://new.unca.edu/admission/apply/
/
https://new.cs.unca.edu/our-mission/
https://new.cs.unca.edu/our-programs/
https://new.cs.unca.edu/computer-systems-major/
...
```

Hints:

* Article: <a href="https://medium.com/@spaw.co/extracting-all-links-using-beautifulsoup-in-python-a96786508659" target="_blank">Extracting all links with BeautifulSoup</a>
* Import:

    ```py
    from bs4 import BeautifulSoup
    ```

* Parse HTML:

    ```py
    soup = BeautifulSoup(response.content, 'html.parser')
    ```

* Use BeautifulSoup helpers to collect links. You may ask Google or ChatGPT: “How do I extract URLs using Beautiful Soup?”

#### Optional readiness extension (Practice)

After the basic crawler works, choose one:

1. Deduplicate the links while preserving their original order.
1. Count how many links point to each domain using a Python dictionary.
1. Filter the output to include only links whose domain ends in `unca.edu`.

Write at least two small tests for the transformation logic using a hand-written list of URLs; do not make your tests depend on the live website. In a comment, name the Java collection you would use for the same algorithm and explain why.

### 2.5 Remove and re-add dependencies

1. Remove the packages:

    ```bash
    poetry remove requests
    poetry remove bs4
    ```

2. Run again and notice what happens:

    ```bash
    poetry run python lab05-experiments.py
    ```

3. Add them back:

    ```bash
    poetry add requests
    poetry add bs4
    ```

4. Run again and notice what happens:

    ```bash
    poetry run python lab05-experiments.py
    ```

<div class="info">

**Before moving on**

[ ] `poetry run python lab05-experiments.py` prints the CS homepage links
[ ] I saw the error outside the Poetry environment (system `python3`)
[ ] I removed and re-added `requests` / `bs4` and observed what happened

</div>

## 3. npm (Node.js)

**npm** is the default package manager for Node.js.

### 3.1 Install Node.js (if needed)

Check your version:

```bash
node -v
```

* If Node is missing, install it (Mac or WSL steps below).
* If your version is **less than 18**, talk to Sarah.
* If Node is already ≥ 18, skip to [§3.2](#nodejs-init).

{:#nodejs-mac}
#### <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> Mac

```bash
brew install node
node -v
```

{:#nodejs-linux}
#### <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> <span class="os-icon linux" title="Linux"><i class="fa-brands fa-linux" aria-hidden="true"></i><span class="sr-only">Linux</span></span> Ubuntu / WSL

`apt`’s Node package is often outdated, so install **nvm**, then Node:

```bash
sudo apt-get install -y curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Restart your WSL terminal, then:

```bash
nvm install node
node -v
```

Source: <a href="https://dev.to/dcodeyt/the-easiest-way-to-install-nodejs-on-wsl-mac-ubuntu-43pp" target="_blank">Installing Node on WSL / Mac / Ubuntu</a>

{:#nodejs-init}
### 3.2 Initialize a Node.js project

1. Go to the starter folder:

    ```bash
    cd class-exercises-fall2026/lab05/node-demo
    ```

    There are already React starter files here; dependencies are not installed yet.

2. Initialize npm:

    ```bash
    npm init -y
    ```

3. Confirm `package.json` was created.

### 3.3 Install React and Vite

1. Install packages:

    ```bash
    npm install react react-dom vite
    ```

2. Confirm `node_modules/`, `package.json`, and `package-lock.json` updated.
3. In `package.json`, replace the entire `"scripts"` entry with:

    ```json
    "scripts": {
        "start": "vite",
        "build": "vite build",
        "serve": "vite preview"
    },
    ```

4. From `node-demo`, start the app:

    ```bash
    npm start
    ```

5. Open <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>. You should see **Hello world!**

### 3.4 Add Ant Design and a modal

1. Stop the Vite process (`Control + C`).
2. Install Ant Design:

    ```bash
    npm install antd
    ```

3. Replace `src/App.jsx` with:

    ```jsx
    import React, { useState } from "react";
    import { Button, Modal } from "antd";
    const App = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        const handleOk = () => {
            setIsModalOpen(false);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        return (
            <>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <img
                        alt="example"
                        src="https://picsum.photos/400/300"
                        width="400"
                        height="300"
                        style={
                            {
                                width: "100%",
                            }
                        }
                    />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    };
    export default App;
    ```

4. Start again:

    ```bash
    npm start
    ```

5. Open <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>. You should see a modal:

    <img src="/images/labs/lab05/modal.png" class="large" />

Building modals from scratch is tedious; design-system packages like Ant Design let you reuse polished components.

<div class="info">

**Before moving on**

[ ] `npm start` shows **Hello world!** at localhost:5173 before the Ant Design change
[ ] After adding `antd`, the Open Modal button works
[ ] `lab05/answers.md` is filled in

</div>

## What to Turn In

Confirm all of the following:

[ ] I completed Part 1 with my OS package manager (`brew` **or** `apt-get`)
[ ] My Poetry app in `lab05/poetry-demo` extracts and prints URLs from the UNCA CS homepage
[ ] My React app in `lab05/node-demo` shows the Ant Design modal
[ ] I answered every question in `lab05/answers.md`

Then:

1. Stage, commit, and push branch `lab05-b` of `class-exercises-fall2026` to GitHub.
2. Open a Pull Request from `lab05-b` into **your** `main`.
3. Merge your `lab05-b` branch into `main`.
4. Paste a link to your closed pull request into the **Lab 05** assignment on Canvas.
