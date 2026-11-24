---
title: Final Exam Study Guide
type: activity
draft: 0
featured_quicklink: 1
featured_quicklink_order: 1
start_date: 2026-11-23
date: 2026-11-23
---

The final exam is **Tuesday, December 8, at 8:00 AM**. Use Project 2 to connect the ideas from Labs 1–10. Practice tracing a request from the browser to the database and back, and explain what each tool contributes along the way.

{:.info}
> **How to use this guide**
>
> 1. **Explain why.** Describe the problem the tool or technique solves in your own words.
> 2. **Apply it.** Explain what you would do in each scenario and why.
> 3. **Check your technical knowledge.** Answer the questions from memory, then open **Answers** to check your work.
> 4. **Practice.** Redo the exercises at the end of each section without notes.
>
> The explanation and scenario questions are for discussion or self-study. Try answering them aloud or reviewing your reasoning with a classmate.

{% collapsible %}

## The Full Stack at a Glance

{:.list-spaced}
1. **Command line and editor** <a class="badge" href="/assignments/lab01">Lab 1</a>\
   How do you navigate, edit files, and automate repeated tasks from the command line?
2. **Git and GitHub** <a class="badge" href="/assignments/lab02">Lab 2</a> <a class="badge" href="/assignments/lab03">Lab 3</a>\
   How do teammates track changes, review code, and resolve conflicts?
3. **Docker** <a class="badge" href="/assignments/lab04">Lab 4</a>\
   How does Docker give an application a consistent runtime environment?
4. **Package managers** <a class="badge" href="/assignments/lab05">Lab 5</a>\
   How do package managers and lock files help you install the same dependency versions?
5. **Testing and static analysis** <a class="badge" href="/assignments/lab06">Lab 6</a>\
   What kinds of problems do tests, formatters, linters, and CI help catch?
6. **MVC** <a class="badge" href="/assignments/lab07">Lab 7</a>\
   How does separating responsibilities make an application easier to change?
7. **Databases, SQL, and ORMs** <a class="badge" href="/assignments/lab08">Lab 8</a>\
   How does an application store, query, and update data?
8. **Concurrency** <a class="badge" href="/activities/asyncio">AsyncIO activity</a> <a class="badge" href="/assignments/lab08">Lab 8</a>\
   How can tasks overlap, and when must one task wait for another?
9. **REST and HTTP** <a class="badge" href="/assignments/lab10">Lab 10</a>\
   How do clients use HTTP methods and status codes to work with API resources?
10. **React** <a class="badge" href="/assignments/lab09">Lab 9</a>\
    How do components, props, and state determine what appears on screen?
11. **Design systems and APIs** <a class="badge" href="/assignments/lab10">Lab 10</a>\
    How does a browser request data and display it with reusable components?
12. **Integration and deployment** <a class="badge" href="/assignments/project02">Project 2</a>\
    How do Compose, GitHub Actions, and Railway support development and deployment?

---

{% collapsible closed %}

## 1. The Command Line and Your Editor

### Explain why

- Why do tools such as Git, Docker, npm, Poetry, and psql provide a command-line interface?
- What makes a command easier to document, repeat, or automate than a series of clicks?

### Apply it

A teammate set up their development environment through menus and cannot remember the steps.

- How would you record the setup so another teammate could repeat it?

- How does your shell use `PATH` to find a program such as `git` or `docker`?

### Technical questions

- What do `pwd`, `ls`, `cd`, `cat`, `mv`, `cp`, `rm`, `mkdir`, and `touch` do?
- How do you search for the text `TODO` in all files under the current directory?
- What does `~/.zshrc` or `~/.bashrc` configure?
- When does the shell read that file?
- What permission does `chmod +x script.sh` add?
- How can you run the script after adding that permission?
- How do you open a file, edit it, save, and quit in **vim** (or **emacs**, whichever you practiced)?
- Which shell environment should you use for the labs on Windows?
- Where does `~` point in WSL?

<details>
<summary>Answers</summary>

- Print working directory; list files; change directory; print a file; move/rename; copy; remove; make directory; create an empty file (or update its timestamp).
- `grep -r "TODO" .`
- It defines shell settings such as aliases, `PATH`, and environment variables.
- The shell reads it when starting an interactive session of the corresponding type.
- It adds execute permission.
- Run it as `./script.sh`.
- Vim: `i` to insert, `Esc` to leave insert mode, `:wq` to save and quit (`:q!` to quit without saving). Emacs: `Ctrl-x Ctrl-s` to save, `Ctrl-x Ctrl-c` to quit.
- Use a Linux-style shell in WSL for the lab commands.
- It points to your Linux home directory, such as `/home/you`.
</details>

### What to practice

Redo the navigation, search, move/copy, and bash-script exercises from Lab 1 without notes. Take the command-line quiz.

---

{% collapsible closed %}

## 2. Configuring Git and GitHub

### Explain why

- Why is version control important?
- Why do we authenticate with GitHub using an SSH key pair instead of a password?

### Apply it

A compiled `ContainsPair.class` file was committed, and teammates now get merge conflicts on it.

- Why is the compiled file causing conflicts?
- What changes would prevent it from causing conflicts again?

### Technical questions

- How do **Git** and **GitHub** differ?
- How do a **fork** and a **clone** differ?
- What is the `origin` remote?
- Which command shows its URL?
- Which SSH key do you upload to GitHub?
- Why should you keep the other key private?
- List, in order, the commands to create a branch, commit a change, and push it.
- What does `.gitignore` do?
- How do you stop tracking a file that is already in the repository?
- What is a pull request?
- How do the base and compare branches differ?

<details>
<summary>Answers</summary>

- git is the version-control program that runs locally. GitHub is a hosting and collaboration service built around git remotes (pull requests, issues, Actions).
- A fork is your own *server-side* copy of someone else's repo on GitHub. A clone is a *local* copy of a repo on your computer.
- It is the default name Git gives the remote you cloned from.
- `git remote -v`.
- Upload the public key.
- Someone with the private key could use it to authenticate as you.
- `git checkout -b lab02-b` (or `git switch -c`), `git add .`, `git commit -m "message"`, `git push -u origin lab02-b`.
- It tells Git which untracked files to ignore.
- Use `git rm --cached <file>`, then commit the change.
- It proposes merging changes and gives teammates a place to review them.
- The base branch will receive the changes. The compare branch contains the proposed changes.
</details>

### What to practice

Walk through the whole clone, branch, commit, push, PR flow from a blank folder, saying what each command does.

---

{% collapsible closed %}

## 3. A Tour of Git Commands

### Explain why

- What role do staging, commits, and branches play before you share a change?
- How does opening a pull request help a team review changes to `main`?

### Apply it

Two teammates edited the same line of `README.md` on separate branches. The second teammate gets a conflict after the first branch is merged.

- How would you resolve the conflict?
- What team practice could reduce the chance of a similar conflict?

### Technical questions

- What do `git init`, `status`, `add`, `commit`, `log`, and `diff` each do?
- What is the difference between the working directory, the staging area, and the repository?
- How do `git merge` and `git rebase` change branch history?
- When can rebasing disrupt a teammate’s work?
- GitHub offers three ways to merge a PR: merge commit, squash, and rebase. How do they differ?
- After your PR is merged on GitHub, what must you do locally to get the change?
- What does `git diff` show versus `git diff --staged`?

<details>
<summary>Answers</summary>

- Create a repo; show changed/staged/untracked files; stage changes; record a snapshot; show history; show line-level differences.
- Working directory: your actual files. Staging area: changes selected for the next commit. Repository: the stored commits.
- A merge combines histories and can fast-forward when the target branch has no divergent commits. A rebase replays commits on a new base, creating new commit IDs.
- Rebasing a shared branch can disrupt teammates who already pulled the original commits.
- *Merge commit*: keeps all commits plus a merge commit. *Squash*: combines all PR commits into one on `main`. *Rebase*: replays each commit onto `main` without a merge commit.
- `git checkout main` and `git pull`.
- `git diff` shows unstaged changes. `git diff --staged` shows what is staged and will be in the next commit.
</details>

### What to practice

Create a branch, make a change, open a PR, merge it, then update `main` locally. Then deliberately create and resolve a merge conflict.

---

{% collapsible closed %}

## 4. Introduction to Docker

### Explain why

- How do containers reduce differences between teammates’ runtime environments?
- What do you gain by keeping the `Dockerfile` and `docker-compose.yml` in version control?

### Apply it

A teammate runs `docker compose down` and loses the database’s test data.

- Where was the data likely stored?
- How would you configure storage so it survives the next shutdown?

### Technical questions

- Explain **image** vs. **container**. (The lab gives an analogy.)
- How do a Docker volume and a bind mount differ?
- When would you use each?
- What does `docker run -dp 80:80 docker/getting-started` start?
- What does `-d` do?
- What does `-p 80:80` do?
- Why would you use **Docker Compose**?
- Which port would you open on your machine if you ran a container with `-p 8000:80`?
- Name the Dockerfile instructions `FROM`, `WORKDIR`, `COPY`, `RUN`, and `CMD`, and say what each does.
- How are containers different from virtual machines?

<details>
<summary>Answers</summary>

- An image is a read-only template. A container is an instance created from an image. It can be running or stopped. Think of the image as a class and the container as an object.
- A volume is managed by Docker. A bind mount maps a specific host path into a container.
- Use a volume for database files and a bind mount to make local source edits visible inside a dev container.
- It starts a container from the `docker/getting-started` image.
- It runs the container in the background.
- It maps port 80 on the host to port 80 in the container.
- It describes a multi-container app (frontend, backend, database) in one file and starts, stops, and networks them together with one command.
- Open port 8000 on the host. Docker forwards it to port 80 in the container.
- `FROM`: the base image. `WORKDIR`: the working directory for later steps. `COPY`: copies files into the image. `RUN`: runs a command at *build* time (e.g., install dependencies). `CMD`: the default command that runs when the *container* starts.
- Containers share the host OS kernel and isolate processes, so they are small and fast to start. VMs run a full guest OS on a hypervisor.
</details>

### What to practice

Read a Dockerfile and a `docker-compose.yml` and explain every line. Be able to say which services need a volume and which need a bind mount.

---

{% collapsible closed %}

## 5. Package Managers

### Explain why

- What work does a package manager do for you?
- Why do teams commit lock files?
- What risks can a new dependency introduce?

### Apply it

Your React app needs to display dates such as “December 8, 2026.” One teammate suggests adding a date library. Another suggests using JavaScript’s built-in `Intl.DateTimeFormat`.

- Which option would you choose for this requirement? Explain your choice.
- What new requirement might change your decision?

### Technical questions

- What is the difference between an **OS package manager**, a **language package manager**, and a **container image**? Give an example of each.
- Why does Poetry use a virtual environment?
- How do you run a Python script in that environment?
- What do `poetry add`, `poetry remove`, and `poetry install` do?
- What do `npm install`, `npm install <pkg>`, and `npm run dev` do?
- What is stored in `node_modules/`?
- Which npm files should you commit to reproduce an install?
- What is the difference between a **dependency** and a **dev dependency**? Give an example of each in this course.
- What is a transitive dependency?
- Why can transitive dependencies complicate upgrades?

<details>
<summary>Answers</summary>

- OS manager: `brew`, `apt`. Installs system-level software. Language manager: `poetry`/`pip`, `npm`. Installs libraries for one language. Image: a Docker image that bundles the OS layer, the language runtime, and your app.
- It isolates the project’s Python packages so their versions can differ from packages used elsewhere.
- `poetry run python main.py`.
- Add a dependency (and update the manifest and lock file); remove one; install everything the lock file specifies.
- Install everything listed in `package.json`; install and record a new package; run the script named `dev` in `package.json` (e.g., start Vite).
- It holds installed packages and is normally ignored by Git.
- Commit `package.json` and `package-lock.json`.
- A dependency is needed to run the app (React, antd, SQLAlchemy). A dev dependency is needed only for development (Prettier, ESLint, Mocha, Black, flake8).
- It is a package required by one of your dependencies, directly or indirectly.
- Upgrading one package can change which versions work elsewhere in the dependency tree.
</details>

### What to practice

Create a new Poetry project and a new npm project from scratch. Add, remove, and re-add a dependency, and watch what changes in the manifest and lock file.

---

{% collapsible closed %}

## 6. Testing and Static Analysis

### Explain why

- What kinds of problems can automated tests catch?
- What work do formatters and linters automate?
- Why run these checks in CI before merging?
- What does “shifting left” mean in this workflow?

### Apply it

You need to change a widely used function in a project without tests.

- What would you do before editing the function?
- Which existing behaviors would you test first?

### Technical questions

- What makes a test deterministic?
- What can make a test flaky?
- What did writing a test without a framework help you learn?
- What does a test framework add?
- What is the difference between a **formatter** (Prettier/Black), a **linter** (ESLint/flake8), and an **import sorter** (isort)?
- What does **static** mean in "static analysis"?
- In rock-paper-scissors, which test cases would you write?
- Name the three test "sizes" and how they differ.
- Which testing and code quality tools did you use for JavaScript?
- Which did you use for Python?

<details>
<summary>Answers</summary>

- It gives the same result when run under the same conditions.
- Timing, randomness, network calls, shared state, and test order can cause inconsistent results.
- A test calls code and checks its result against an expectation.
- A framework adds discovery, assertions, failure reports, setup and teardown, and output that CI can use.
- A formatter *rewrites* code into a consistent style. A linter *reports* likely bugs and rule violations. An import sorter orders imports consistently.
- It analyzes the code **without executing it**.
- All nine combinations of valid moves, including the three ties. Test invalid input if the function handles it.
- Small (one process, no network or disk, fast), medium (one machine, may use a database or localhost), large (multiple machines, slow, most likely to be flaky). The more you can verify in small tests, the faster and more reliable your suite.
- Mocha, Prettier, and ESLint.
- `unittest`, Black, flake8, and isort.
</details>

### What to practice

Write a tiny function with unit tests in Python *and* JavaScript, then run the formatter and linter, and fix what they report.

---

{% collapsible closed %}

## 7. MVC and Separation of Concerns

### Explain why

- How does MVC apply separation of concerns?
- How does that separation help teammates work independently?
- How does it make individual parts easier to test?

### Apply it

A single route function queries the database, filters results, and builds HTML. The team wants to change the card layout and add a filter.

- Why could making both changes in that function be difficult?
- How would you divide its responsibilities?

### Technical questions

- What is a "concern" in software design?
- What does it mean to separate concerns?
- What is the role of the Model in MVC?
- What is the role of the View in MVC?
- What is the role of the Controller in MVC?

<details>
<summary>Answers</summary>

- A concern is a responsibility the program has.
- Give each responsibility a place so it can change independently.
- `app/models.py` defines `Course` and its matching rule.
- `app/server.py` handles requests and coordinates filtering and responses.
- `app/templates/index.html` renders the results as HTML.
- The Controller uses the Model to work with course data and passes the results to the View for display.
- The form sends `?title=data`; `home()` receives it and gets the course list (via `unca_api.py`); `filter_courses()` keeps those where `matches_title()` is true; `home()` passes the matches to `index.html`, which loops and builds the table.
- The matching rule is a rule about *the data*, so it belongs with the data. How it looks is a presentation concern that may change independently.
- The `/` route renders HTML, and the `/api` route returns JSON.
- Both can use the same model and filtering logic.
- It is a data-access helper that downloads and parses course data; it is not the data's rules (Model), the request handling (Controller), or the display (View).
</details>

### What to practice

Add a new field to the course search app and list the file(s) you touched in each part. Be able to defend each choice.

---

{% collapsible closed %}

## 8. Databases, SQL, and ORMs

### Explain why

- What features does a relational database provide that you would have to build yourself if you stored your data in a plain file?
- Pick one feature and explain how it would help an app that stores films and their categories.
- Name three things an ORM does that make it easier to work with a relational database.

### Apply it

A slow page runs one query to list films and then one more query per film to load its categories.

- What is this query pattern called?
- How would you confirm that the application is doing it?
- How would you reduce the number of queries?

### Technical questions

- What is a primary key?
- What is a foreign key?
- How does `film_category` represent the relationship between films and categories?
- Write SQL for each task. Use these tables and columns.

  ```text
  +--------------+      +------------------+      +------------------+
  | film         |      | film_category    |      | category         |
  +--------------+      +------------------+      +------------------+
  | film_id (PK) |<-----| film_id (FK)     |      | name             |
  | title        |      | category_id (FK) |----->| category_id (PK) |
  | release_year |      +------------------+      +------------------+
  | rating       |
  | rental_rate  |
  +--------------+

  +------------------+
  | customer         |
  +------------------+
  | customer_id (PK) |
  | last_name        |
  +------------------+
  ```

  PK = primary key. FK = foreign key. Each arrow points from a foreign key to the key it references.

  - List titles and release years of all films.
  - Find customers whose last name starts with `S`.
  - Count films for each rating.
  - List each film's title with its category name.
  - Count films in the `Action` category.
  - Raise one film's `rental_rate` by 10%.
- What happens if you run `UPDATE` or `DELETE` without a `WHERE` clause?
- What does `select(Film.title)` build?
- How do you execute that statement with an async session?
- In this SQLAlchemy insert, what does `session.add(category)` do?
- Consider the following SQLAlchemy statement:

  ```python
  category = Category(name="Adventure")
  session.add(category)
  await session.commit()
  await session.refresh(category)
  ```

   - What does `await session.commit()` do to the pending insert?
   - After the commit, what does `await session.refresh(category)` do to the Python object?
   - What happens to an uncommitted change if the transaction is rolled back?
- What are the pros and cons of an ORM versus hand-written SQL?

<details>
<summary>Answers</summary>

- A primary key uniquely identifies a row.
- A foreign key references a key in another table or in the same table.
- `film_category` stores pairs of film and category IDs to represent a many-to-many relationship.
- SQL examples

  - `SELECT title, release_year FROM film;`
  - `SELECT * FROM customer WHERE last_name LIKE 'S%';`
  - `SELECT rating, COUNT(*) FROM film GROUP BY rating;`
  - `SELECT f.title, c.name FROM film f JOIN film_category fc ON fc.film_id = f.film_id JOIN category c ON c.category_id = fc.category_id;`
  - `SELECT COUNT(*) FROM film_category fc JOIN category c ON c.category_id = fc.category_id WHERE c.name = 'Action';`
  - `UPDATE film SET rental_rate = rental_rate * 1.10 WHERE film_id = 1;`
- It affects **every row** in the table. Always `SELECT` with the same `WHERE` first to check what it will touch.
- It builds a query that selects film titles.
- Pass the statement to `await session.execute(...)`.
- It marks the new `Category` object as pending so SQLAlchemy can insert it when the session flushes.
- It flushes the pending insert and commits the transaction, saving the new category.
- It reads the saved row back from the database and updates the `category` object with the row’s current values.
- The change is discarded.
- ORM pros: less boilerplate, Python-native objects, safer parameter handling, schema in code. Cons: leaky abstraction, easy to write inefficient queries (N+1), another layer to learn. You still need SQL to debug and understand it.
</details>

### What to practice

Redo the 9 SQL tasks and 7 ORM functions from Lab 8 with no notes, and use `show_sql_for_query` to compare your Python with the SQL it generates.

---

{% collapsible closed %}

## 9. Concurrency

### Python (asyncio)

#### Explain why

- Why is asyncio useful for a server that spends time waiting for database or network responses?
- How does concurrency differ from parallelism?

#### Apply it

A dashboard needs data from two independent APIs. The first request takes about 2 seconds, and the second takes about 1 second. Assume they start at nearly the same time when run concurrently.

- If the dashboard waits for the first request to finish before starting the second, how long will it take to have both results?
- If the dashboard starts both requests concurrently, which one will likely finish first?
- When will both results likely be ready in the concurrent version?
- If the second request needs a value from the first response, when can it start?

#### Technical questions

- What does calling an `async def` function return?
- Why await an asynchronous database operation?
- What does `coroutine ... was never awaited` mean?

<details>
<summary>Answers</summary>

- It returns a coroutine object. The coroutine runs when it is awaited or scheduled.
- While the database operation waits for I/O, the event loop can run other tasks.
- A coroutine was created and discarded before it was awaited or scheduled.
</details>

#### What to practice

Redo the synchronous and asynchronous drink-order examples from the [AsyncIO activity](/activities/asyncio). Explain why the elapsed times differ.


### Java (threads)

#### Explain why

- When would you put a slow operation on a separate thread?
- Why can two threads updating the same variable produce an incorrect result?

#### Apply it

A Java program starts one worker thread to read a file and another to download data. The main thread needs both results to build a report.

- Does starting the file-reading thread first guarantee that it will finish first?
- Where should the main thread wait for the workers to finish?
- What could go wrong if the main thread waits for the first worker before starting the second?

#### Technical questions

- What is the difference between calling `start()` on a thread and calling its `run()` method directly?
- What does `join()` do?
- How can a `synchronized` block protect a shared counter?

<details>
<summary>Answers</summary>

- `start()` starts a separate thread that executes `run()`. Calling `run()` directly executes it on the calling thread.
- `join()` makes the calling thread wait until the target thread finishes.
- If both threads use the same lock, only one at a time can enter the block that reads and updates the counter.
</details>

#### What to practice

Sketch the order of events when the main thread starts both workers before calling `join()` on either one. Mark where the main thread can safely begin building the report.

---

{% collapsible closed %}

## 10. REST and HTTP

### Explain why

- Why give a resource such as a class its own URL?
- How do HTTP methods tell the server what the client wants to do?
- Why should the client check the response status before updating the interface?

### Apply it

A course scheduling app exposes a collection at `/classes` and an individual class at `/classes/42`.

- Which method and URL would you use to list the classes?
- Which method and URL would you use to create a class?
- Which method would you use to change just the location of class 42?
- Which method and URL would you use to remove the class?
- What should the interface do if the API returns `404` while the user is trying to edit the class?

### Technical questions

- What do `GET` and `POST` typically do in a REST API?
- How does `PUT` differ from `PATCH`?
- What does `DELETE` ask the server to do?
- What do `200 OK`, `201 Created`, and `204 No Content` tell you?
- How do `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error` differ?
- How can you use the response from `fetch()` to tell whether an HTTP request succeeded?

<details>
<summary>Answers</summary>

- `GET` retrieves a resource or collection. `POST` commonly sends data to a collection to create a new resource.
- `PUT` replaces the resource’s representation. `PATCH` applies a partial modification, such as changing one field.
- `DELETE` asks the server to remove the resource at the target URL.
- `200` indicates success, `201` indicates that a resource was created, and `204` indicates success with no response body.
- `400` indicates a client error in the request. `404` means the target was not found. `500` indicates an unexpected failure on the server.
- A response such as `404` or `500` still resolves to a `Response` object. Check `response.ok` for a status in the 200–299 range, or inspect `response.status` for a specific code.

</details>

### What to practice

In the browser’s Network panel, inspect one successful request and one failed request. Identify each request’s method and URL, its response status, and whether it has a response body.

---

{% collapsible closed %}

## 11. React, Components, and State

### Explain why

- How do components help organize a user interface?
- How does state keep the DOM in sync with changing data?

### Apply it

You have a `people` array and want to show one card per person, with a **Like** button and a separate count for each card.

- Which components would you create?
- What state would you store?
- Which component would own that state?

### Technical questions

- What do `npm init -y`, `npm install vite`, and `npm run dev` do?
- What does Vite provide during development?
- What is a bundler? Give an example of a tool from the labs that handles bundling.
- What is a React component?
- What is a prop?
- What does this JSX render?
  ```jsx
  {people.map((p) => <PersonCard key={p.id} name={p.name} />)}
  ```
- Why does each rendered card need a stable `key`?
- What initial state does `const [count, setCount] = useState(0)` create?
- What happens when you call `setCount(count + 1)`?
- Why is `count = count + 1` wrong in React?
- What is the difference between props and state?
- How do you insert a JavaScript value in JSX?
- How do you attach a click handler in JSX?
- What is JSON?
- How can you turn a JavaScript array of objects into JSON text?

<details>
<summary>Answers</summary>

- They create `package.json` with defaults, install Vite, and run the script named `dev`, respectively.
- Vite provides a local dev server that serves modules and updates the page when you edit files.
- A bundler follows your app’s imports and packages its code and dependencies into files the browser can load. Vite handles bundling when you build the React app for production.
- In this lab, a component is a function that returns JSX.
- A prop is an input passed to a component.
- It creates one `PersonCard` per element of `people`.
- A stable `key` lets React identify the same item across renders, even when the list order changes.
- `count` starts at 0.
- React schedules an update with the new count and renders the component with the updated state.
- Assigning directly does not tell React anything changed, so nothing redraws (and the value is reset on the next render). You must call the setter.
- Props are passed *in* from a parent and are read-only to the child. State is owned *by* the component and changes over time.
- Use curly braces, as in `{value}`.
- Pass the handler function, as in `onClick={handler}`.
- JSON is a text format for structured data.
- Use `JSON.stringify(people)` for an array named `people`.
</details>

### What to practice

Without looking, build a component that renders a list from an array and has a button that changes state.

---

{% collapsible closed %}

## 12. Design Systems and External Data

### Explain why

- Why use a design system or component library?
- What roles do the user event, HTTP request, and state update play in displaying new search results?

### Apply it

Your search page freezes on load, and the browser’s network panel shows hundreds of requests.

- What might be causing the requests to repeat?
- How would you fix the code?

### Technical questions

- What does `await fetch(url)` return?
- How do you parse a JSON response body?
- Write a function `fetchData(q, limit)` that queries `https://www.apitutor.org/spotify/simple/v1/search` and stores the result in state.
- Trace the flow from "user clicks Search" to "carousel shows new slides."
- When does Ant Design call `onFinish`?
- Where do the fields in `values` come from?
- Which query parameters does the API Tutor search endpoint take?
- Which HTTP method does the search use?
- Why do we **never** "tell the Carousel to redraw"?
- What does "lift state up" mean? Give an example.
- What does a component library provide?
- What are two benefits and one cost of adopting a component library?
- What is a REST API?
- What do GET, POST, PUT, PATCH, and DELETE typically do in a REST API?
- Why can users see API keys included in front-end code?
- How does the Spotify proxy protect the API key?

<details>
<summary>Answers</summary>

- It returns a `Response` object.
- Use `await response.json()`.
- ```javascript
  async function fetchData(q, limit) {
    const params = new URLSearchParams({ q, type: "track", limit: String(limit) });
    const url = `https://www.apitutor.org/spotify/simple/v1/search?${params}`;
    const response = await fetch(url);
    const data = await response.json();
    setTracks(data);
  }
  ```
- Submit calls `onFinish(values)`; it calls `fetchData(q, limit)`; `fetch()` returns; `setTracks(data)` updates state; React re-renders `App`; `tracks.map(...)` produces new slides.
- It calls `onFinish` after a successful form submission and validation.
- Each named form item supplies a value under its `name`.
- `q` is the search term, `type` is the result type, and `limit` is the maximum number of results.
- `GET`.
- The Carousel is written as "one slide per item in `tracks`." When state changes, React re-runs the component and the UI follows.
- When two components need the same data, move the state to their closest common parent and pass values/functions down as props. In the lab's extra credit, `tracks` and `fetchData` live in `App`. The form gets an `onSearch` prop, and the carousel gets a `tracks` prop.
- It provides reusable UI components with a consistent look and behavior.
- A library can speed up development and improve consistency. It can also increase the bundle size.
- A REST API exposes resources through URLs and uses HTTP methods to interact with them.
- GET reads, POST commonly creates, PUT replaces, PATCH partially updates, and DELETE removes.
- The browser downloads the code, so users can inspect it.
- The proxy makes the Spotify request on the server, where the key is stored.
</details>

### What to practice

Rebuild the Spotify search from a blank Vite project, from the Form to the fetch to the Carousel. Then practice explaining it using only the words *event*, *fetch*, *state*, and *render*.

