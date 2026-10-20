---
title: MVC
type: lab
num: 7
draft: 0
assigned_date: 2026-10-22
due_date: 2026-10-28
points: 6
---

{:.info}
> This lab is a guided introduction to MVC. You will learn what the **Model-View-Controller (MVC)** pattern is for by working in a **course search** web app (the same idea as Project 1), and make one small change in each of the Model, View, and Controller.

## 1. The Big Idea of MVC: Separation of Concerns
A **concern** is one job a program has to do. A course search has at least three:
1. **Knowing about courses**: what a course is, and the rules for it (does this course match "data"?)
2. **Showing courses**: laying out a page, a table, colors, and buttons
3. **Handling requests**: noticing that the user searched for something, getting the courses, and deciding what to show

You *could* write all of this in one big function that downloads the courses, filters them, and builds the HTML as it goes. It would work. The trouble starts when you need to change something. If you want to restyle the page, you are editing the same code that decides which courses match, and one slip can break the search. If two teammates work on the same file, they step on each other. If you want to test the matching rule, you can't, because it is tangled up with the downloading and the HTML.

**Separation of concerns** is the idea that fixes this: *give each concern its own place, so that a change to one concern doesn't force changes to the others.*

**Model-View-Controller (MVC)** is a popular way to separate concerns in an app that shows data to a user:

| Part | Concern | Question it answers |
| --- | --- | --- |
| **Model** | The data and the rules for it | "What is a course, and what can it tell me about itself?" |
| **View** | How the data is shown | "How should this list of courses look?" |
| **Controller** | Connecting the other two | "The user asked for X. What do I get, and what do I show?" |

Two rules make the pattern work:
* The **Model** knows nothing about how it is displayed, and the **View** knows nothing about how the data is stored or filtered. They never talk to each other directly.
* The **Controller** sits in the middle. It takes the request, uses the Model to get what is needed, and hands the result to the View.

You have already seen this idea in Project 1. A filter like `matches_title` knew nothing about the Textual screen, and the screen knew nothing about how titles were matched. Textual's `app.py` connected them.

{:.info}
> **A test for separation:** to add a "room number" to the course search, you should only have to change the Model (so a course has a room) and the View (so the page shows it). If the change leaks into places that have nothing to do with it, the concerns were mixed together.

## 2. Get Situated
**On GitHub:** sync your fork of the **class-exercises-fall2026** repo.

**On your local machine:** make sure all previous work is committed, then:

```bash
git checkout main
git pull
git checkout -b lab07-b
```

You should see a new `lab07` folder containing an `app` directory.

<div class="info">

**Before moving on**

[ ] `git branch` shows `* lab07-b`
[ ] I can see `lab07/app/` with `models.py`, `server.py`, `unca_api.py`, and a `templates` folder

</div>

## 3. MVC and the Course Search App
Now let's find the three parts in the course search app:

| MVC part | Its job | In the course search app |
| --- | --- | --- |
| **Model** | Represents the data: one thing (here, one course) and what it knows about itself | `app/models.py` defines a `Course` and decides whether that course matches a search |
| **View** | Shows the data | `app/templates/index.html` turns courses into a web page |
| **Controller** | Connects the two | `app/server.py` receives the request, gets the courses, asks each `Course` whether it matches, and hands the results to the View |

The app has one more file, `app/unca_api.py`. It is not part of MVC: it just downloads the raw course data from UNCA and turns each record into a `Course`.

If you worked on Project 1, this will look familiar. `Course.matches_title` is the same idea as the filters you wrote there. The difference is that here the rule lives on the **Model** (the course itself), which is separate from the screen (the **View**), and a **Controller** connects them. In Project 1's Textual app, `app.py` plays the Controller role.

{:.info}
> You will see `async def` and `await` in `unca_api.py` and `server.py`. They let the server keep working while it waits for UNCA to respond. You do not need to change them in this lab.

### Run the app
```bash
cd lab07
poetry install
cd app
poetry run uvicorn server:app --reload
```

Visit [http://127.0.0.1:8000](http://127.0.0.1:8000), then search for a title such as `data`.

<div class="info">

**Before moving on**

[ ] `poetry install` finished without errors
[ ] The server is running and the page loads in my browser
[ ] Searching for `data` shows a table of courses

</div>

### Trace a request
Open all three files in `app/` and follow one search from start to finish:
1. The form in `index.html` sends the browser to `/?title=data`.
2. `home()` in `server.py` receives the `title` and gets the list of courses (`unca_api.py` downloads them and builds a `Course` for each).
3. `filter_courses()` in `server.py` asks each `Course` whether `matches_title()` is true, and keeps the ones that match.
4. `home()` hands the matching courses to `index.html`, which loops over them and builds the table.

You can also see the Controller's results without the View at [http://127.0.0.1:8000/api?title=data](http://127.0.0.1:8000/api?title=data). It returns the same results as JSON instead of HTML.

<div class="info">

**Before moving on**

[ ] I can name the file where each step of the request happens
[ ] I can explain why `unca_api.py` is not one of the three MVC parts

</div>

## 4. Make a Change in Each Part
Add a **department** filter (for example, `CSCI`) to the search. It takes one small change in each MVC part.

### 1. Model: `app/models.py`
Add a `matches_department(self, value)` method to `Course`, next to `matches_title`. Follow the same rules the Project 1 filters use:
* Ignore capitalization and spaces around `value`.
* A blank `value` returns `True` (no restriction).
* Otherwise, return `True` only when this course's `department` equals `value`.

<div class="info">

**Before moving on**

[ ] `matches_department` is a method inside `Course`, indented under the class
[ ] It ignores capitalization and surrounding spaces, and a blank value returns `True`
[ ] I haven't changed `server.py` or `index.html` yet

</div>

### 2. Controller: `app/server.py`
In **both** endpoints (`/` and `/api`):
* Accept a `department: str = Query("")` parameter.
* Add a `department` parameter to `filter_courses()`, keep a course only if it matches the title **and** the department, and pass `department` along from both endpoints.
* In `/`, also pass `department` to the View in the dictionary that goes to the template.

<div class="info">

**Before moving on**

[ ] [http://127.0.0.1:8000/api?department=csci](http://127.0.0.1:8000/api?department=csci) returns only `CSCI` courses
[ ] [http://127.0.0.1:8000/api?title=data&department=csci](http://127.0.0.1:8000/api?title=data&department=csci) returns fewer results than `title=data` alone
[ ] The `/` page still loads without errors

</div>

{:.info}
> The Controller doesn't know *how* to match a department. It just asks each `Course`. If the rule for matching changes later, only `models.py` has to change.

### 3. View: `app/templates/index.html`
* Add a text input named `department` to the form (copy the title input and keep its `value="{{ department }}"` so the box remembers what you typed).
* Add a **Dept** column to the table that shows `{{ course.department }}`.

Reload the page and search for the department `csci`. Then try the title `data` and the department `csci` together. You can test the Model and Controller before touching the View at [http://127.0.0.1:8000/api?department=csci](http://127.0.0.1:8000/api?department=csci).

<div class="info">

**Before moving on**

[ ] The form has a `department` box that keeps what I typed after I search
[ ] The table has a **Dept** column
[ ] Searching title `data` and department `csci` together shows only `CSCI` courses

</div>

## 5. Reflect
Answer these in an `answers.md` file in your `lab07` folder (a few sentences each):

1. For each of the three changes in Part 4, which file did you edit, and why that one?
2. Why does a `Course` know whether it matches a search but never decide how it looks?
3. If you wanted to show each course's room number, which files would change? Which would not?
4. Name one thing that would have been harder if the downloading, matching, and page building were all in one function.

## Extra Tasks
* Add a `credits` filter (for example, only 3-credit courses), following the same Model, Controller, View steps.
* Show a "Full" label instead of `0` in the seats open column.
* Add a term drop-down in the View, and have the Controller download only the chosen term.

## Submission
Before you submit, make sure that:
* All three changes (Model, Controller, View) work together in the browser
* `lab07/answers.md` has your answers to the four Reflect questions
{:.checkbox-list}

1. Commit and push your `lab07-b` branch.
2. Create a pull request to `main`.
3. Submit the PR link in Canvas.

**Resources:**
* [FastAPI](https://fastapi.tiangolo.com/)
* [Jinja Templates](https://jinja.palletsprojects.com/en/stable/templates/)
