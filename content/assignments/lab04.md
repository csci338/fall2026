---
title: Intro to Docker
type: lab
num: 4
draft: 0
assigned_date: 2026-09-10
due_date: 2026-09-16
points: 6
collapsible_headings: true
---

## 1. Background

* <a href="https://learn.microsoft.com/en-us/training/modules/intro-to-docker-containers/" target="_blank">What is Docker?</a>

## 2. Install Docker

### Mac

**Recommended:** install with Homebrew:

```shell
brew install --cask docker
docker --version
```

Then start **Docker Desktop** (Spotlight → `Docker.app`). Wait until Docker says it is running.

Verify with:

```shell
docker run hello-world
```

You should see a line that says **`Hello from Docker!`**. That means the install worked.

### Windows

1. Follow Microsoft's install guide: <a href="https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#install-docker-desktop" target="_blank">Install Docker Desktop with WSL</a>.
2. Open your **WSL Ubuntu** terminal (not PowerShell / CMD).
3. Verify with:

```shell
docker run hello-world
```

You should see **`Hello from Docker!`**.

## 3. Your Tasks

This lab uses your **`class-exercises-fall2026`** fork (not `lab03-exercises`).

### 3.1 Get ready (git)

1. **On GitHub:** open *your* fork of `class-exercises-fall2026` and sync it with the class repo (`csci338/class-exercises-fall2026`) using **Sync fork** / **Update branch**.
2. **On your computer**, in your local `class-exercises-fall2026` folder:

    ```shell
    git checkout main
    git pull
    git checkout -b lab04-b
    git branch
    ```

3. Confirm `git branch` shows `* lab04-b`.

<div class="info">

**Before moving on**

[ ] I am inside `class-exercises-fall2026` on branch `lab04-b`
[ ] Docker Desktop is running
[ ] `docker run hello-world` printed `Hello from Docker!`

</div>

### 3.2 Complete the Docker tutorial

1. Keep Docker Desktop running.
2. In a terminal, run:

    ```shell
    docker run -dp 80:80 docker/getting-started
    ```

3. Open <a href="http://localhost" target="_blank">http://localhost</a> in your browser.
4. Complete these tutorial sections (**Sharing Our App** and **Image Building Best Practices** are optional):

    1. Getting Started
    1. Our Application
    1. Updating Our App
    1. <span class="badge info">Optional</span> *Sharing Our App*
    1. Persisting our DB
    1. Using Bind Mounts
    1. Multi-Container Apps
    1. Using Docker Compose
    1. <span class="badge info">Optional</span> *Image Building Best Practices*

5. **As you work**, answer the questions in `class-exercises-fall2026/lab04/answers.md`.

### 3.3 Put your app files in the right place

When the tutorial is done, your repo should look like this:

```text
class-exercises-fall2026/
  lab04/
    answers.md          ← your written answers
    app/                ← the app folder from the tutorial
      Dockerfile
      docker-compose.yml
      ...other tutorial files...
```

If the tutorial created `app/` somewhere else, move it into `lab04/app/` before you submit.

<div class="info">

**Before moving on**

[ ] `lab04/answers.md` is filled in
[ ] `lab04/app/` exists and includes `Dockerfile` and `docker-compose.yml`

</div>

## 4. What to Turn In

1. Stage, commit, and push branch `lab04-b` of `class-exercises-fall2026` to GitHub.
2. Open a Pull Request from `lab04-b` into **your** `main` (do **not** merge — wait for Sarah to review).
3. Paste the pull request link into the **Lab 04** assignment on Canvas.

## 5. Reference (optional reading)

Use this section if you need a reminder. You do not need to memorize it before starting the tutorial.

### What is a container?

A container is an isolated process that runs on a host machine (for example, your laptop).

* It can run on any machine (and be moved to the cloud)
* It is isolated from other containers and processes
* It is created from an **image**, and can be stopped, started, or deleted
* Source: <a href="https://docs.docker.com/get-started/" target="_blank">https://docs.docker.com/get-started/</a>

### What is an image?

A Docker image is a lightweight, read-only template or "blueprint" that contains everything needed to run an application. Images are used to create containers. Dependencies, configurations, scripts, binaries, and metadata (such as environment variables and a default command) live in the image.

* Source: <a href="https://docs.docker.com/get-started/" target="_blank">https://docs.docker.com/get-started/</a>



> **Image : Class :: Container : Object**

### Docker cheatsheet

#### Images

| **docker images** | Lists available images |
| **docker build .** | Builds an image from a Dockerfile in the current directory (`.`) |
| **docker build -t `<name-of-image>` .** | Builds an image and tags it with that name |
| **docker rmi `<your-image-id>`** | Removes an image |
| **<a href="https://hub.docker.com/search?q=&type=image&image_filter=official" target="_blank">Docker Hub Image registry</a>** | Browse official images |

#### Containers

| **docker run `<name-of-image>`** | Creates and runs a new container from an image |
| **docker ps** | Lists containers that are currently running |
| **docker stop `<container-id>`** | Stops a running container |
| **docker start `<container-id>`** | Starts a stopped container |
| **docker rm `<container-id>`** | Removes a container |
| **docker exec -it `<container-id>` sh** | Runs a shell inside a running container |
| **docker exec -it `<container-id>` python** | Runs python inside a container (if python is installed) |
