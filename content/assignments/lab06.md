---
title: Testing & Static Analysis
type: lab
num: 6
draft: 0
assigned_date: 2026-09-24
due_date: 2026-09-30
heading_max_level: 5
points: 6
---

## Introduction & Background
The goal of this lab is to get you familiar with some automated testing and static analysis tools that are commonly used in industry. To do this, you will:
1. Pick a language: **either** JavaScript **or** Python
2. Implement a "rock paper scissors" function
3. Write some vanilla unit tests for your function
4. Rewrite your tests using a testing framework (Mocha or unittest)
5. Run a code formatter and a linter on your code -- and fix any errors
6. Answer the questions in `answers.md`
7. Create a pull request

{:.info}
> ### This is an "Either Or" Assignment
> * You only have to complete the rock paper scissors activities in **ONE of the languages** (either JavaScript or Python).
> * **Extra Credit:** If you need to make up a lab or if you would like to earn 6 points extra credit (equivalent to 1 Lab), you can do both options.


## Set Up
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2026" target="_blank">class-exercises-fall2026</a>. 
* If you are a Windows user, you will do this lab (and all subsequent work in this class) using the WSL terminal.

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2026` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab06` folder has been created.
* Create a new branch called `lab06-b`: `git checkout -b lab06-b`
* Verify that you're on your new branch: `git branch`

## Option 1. JavaScript
The JavaScript files are located in the `lab06/javascript_rps` folder (`rps` stands for "rock paper scissors"). Navigate into this folder on the terminal -- you will run all of the commands below from here.

### 1. Implement the "Rock Paper Scissors" function
Open `your-task.mjs` and take a look at the `rps` function, which should look like this:

```js
export function rps(hand1, hand2) {
    // finish this code:
    if (hand1 === "rock" && hand2 === "paper") {
        return "Paper wins!";
    } else {
        return "Invalid";
    }
}
```

Implement the following "rock paper scissors" logic and return the corresponding message (exactly as it is shown below):
* If one hand is **rock** and the other is **paper**, return the string **"Paper wins!"**
* If one hand is **paper** and the other is **scissors**, return the string **"Scissors wins!"**
* If one hand is **scissors** and the other is **rock**, return the string **"Rock wins!"**
* If both hands are the same (and have valid arguments), return **"Tie!"**
* If anything other than rock, paper, or scissors are passed in, return **"Invalid"**

### 2. Write the tests WITHOUT a framework
As you are writing your `rps` function, write corresponding tests to verify your implementation for different possible arguments that a user might pass in. 

You will first write some tests *without* a framework. To help you, I have written two helper functions in `helpers.mjs`. The high-level point here is that **anyone can write and run tests -- simply and easily -- without using a fancy testing library**. Please open the `run-tests-vanilla.mjs` file to inspect how these two helper functions are used. Pause and try to understand what this code does.

When you've thought about it, run the test suite:

```shell
node run-tests-vanilla.mjs 
```

You should see the following output:

```shell
> node run-tests-vanilla.mjs

----------------------------------------------------
✅ Success: it returns "Hello world!"
✅ Success: paper beats rock
❌ Failure: paper beats rock (flipped)
----------------------------------------------------

😬 Only  2 out of 3 tests passed.
```

Please write all the tests to ensure that the relevant possible inputs yield the expected output. As you make new test functions, don't forget to add the name of each function to the list of tests that are passed into the `runAllTests` function (at the bottom of the file).


### 3. Install the tools
In the rest of this lab, you will use three tools, which are all installed via the npm package manager:
* **`mocha`** -- a JavaScript testing framework.
* **`prettier`** -- a code formatting tool for ensuring that your team has the same coding style conventions (indentation, curly brace placement, etc.). 
* **`eslint`** -- a linting tool for analyzing code for possible errors, style violations, or inefficiencies. Linters sometimes make code changes, but usually just point out potential issues that need to be solved manually.

Create a Node project and install all three tools as dev dependencies:

```bash
# create the package.json file:
npm init -y  

# install the tools as dev dependencies:
npm install --save-dev mocha prettier eslint eslint-plugin-mocha
```

Verify that a `package.json` file and a `node_modules` folder have been created, and that the four packages are listed under `devDependencies` in `package.json`.

Next, open `package.json` and replace the `"scripts"` section with the following:

```json
"scripts": {
    "test": "mocha",
    "format:check": "prettier --check \"**/*.{js,jsx,mjs}\"",
    "format:fix": "prettier --write \"**/*.{js,jsx,mjs}\"",
    "lint:check": "eslint . && echo \"All ES Lint checks pass!\"",
    "lint:fix": "eslint . --fix && echo \"All ES Lint checks pass!\""
},
```

Note the placement of commas after each line but the last one. These entries let you run each tool with `npm test` or `npm run <script name>`.

### 4. Rewrite your tests using Mocha
Now that you have implemented the `rps` function and written the corresponding tests using "vanilla" JavaScript, you are going to rewrite your tests using **Mocha**. Mocha offers a set of functions and objects that organize your tests and make them easier to define and write. By default, Mocha looks for tests in a folder called `test`.

#### Run the Mocha tests
Run the Mocha test suite:
    
```bash
npm test
```

If you did it correctly you should see output that looks like the following:

```bash
> mocha



  Hello World Tests
    ✔ returns "Hello world!"

  Rock Paper Scissors Tests
    1) knows that paper beats rock


  1 passing (3ms)
  1 failing

  1) Rock Paper Scissors Tests
       knows that paper beats rock:

      AssertionError [ERR_ASSERTION]: 'Invalid' == 'Paper wins!'
      + expected - actual

      -Invalid
      +Paper wins!
      
      at Context.<anonymous> (file:///.../lab06/javascript_rps/test/run-tests-mocha.mjs:60:16)
      at process.processImmediate (node:internal/timers:478:21)
```

#### Add your Mocha tests
Open the `test/run-tests-mocha.mjs` file and see if you can understand what's going on. Pause and think. What is the same and what is different?

After inspecting the code, please add new Mocha tests to exhaustively test the `rps` function. Note that instead of your functions returning **true** or **false**, you need to use Node's built-in `assert` module.

### 5. Run the formatter and linter

#### Prettier
Prettier enforces formatting rules using the `.prettierrc` configuration file. I have already made a simple `.prettierrc` file for you, but you can add additional rules to enforce additional coding style parameters. Please open it and take a look! 

First, run the format checker:

```bash
npm run format:check
```

This command will tell you which of your JavaScript files do not conform to the style guide. Take a look and make a note of these files.

To fix these files, run prettier with the `--write` flag (which you configured as `format:fix` in your `package.json` file). This command will actually reformat your code:

```bash
npm run format:fix
```

Open one of your "fixed" `.mjs` files and note what changed. Then run the prettier check again. The check should now report that no formatting errors were found.

#### ESLint
ESLint enforces linting rules using the `eslint.config.mjs` configuration file. I have already made a simple `eslint.config.mjs` file for you, but you can add additional checks and rules. Please open it and take a look! 
* Note that because we are using some Mocha functions (e.g., `describe`, `it`, etc.), we need to teach the linter that these functions are indeed valid functions so they don't raise errors (they're global functions and it's hard for `eslint` to tell where they come from). This is what the `eslint-plugin-mocha` package is for.

First, run the linter check:

```bash
npm run lint:check
```

This command will tell you which of your JavaScript files do not conform to the linting rules. Take a look and make a note of these files.

As a first step to fixing these files, run eslint with the `--fix` flag (which you configured as `lint:fix` in your `package.json` file). This command will try to auto-correct some of your linting errors...

```bash
npm run lint:fix
```
...that said, other errors might need to be corrected manually. Fix any remaining errors and run `npm run lint:check` again until all checks pass.

You are now done with the JavaScript version of this lab. Jump down to ["Answer the Questions & Submit"](#submit).


## Option 2. Python
The Python files are located in the `lab06/python_rps` folder. Navigate into this folder on the terminal -- you will run all of the commands below from here.

### 1. Configure Poetry
Initialize a Poetry project within the `python_rps` folder (the `-n` flag accepts all of the defaults):

```bash
poetry init -n
```

### 2. Implement the "Rock Paper Scissors" function
Open `your_task.py` and take a look at the `rps` function, which should look like this:

```python
def rps(hand1, hand2):
    # finish this code:
    if hand1 == "rock" and hand2 == "paper":
        return "Paper wins!"
    else:
        return "Invalid"
```

Implement the following "rock paper scissors" logic and return the corresponding message (exactly as it is shown below):
* If one hand is **rock** and the other is **paper**, return the string **"Paper wins!"**
* If one hand is **paper** and the other is **scissors**, return the string **"Scissors wins!"**
* If one hand is **scissors** and the other is **rock**, return the string **"Rock wins!"**
* If both hands are the same (and have valid arguments), return **"Tie!"**
* If anything other than rock, paper, or scissors are passed in, return **"Invalid"**


### 3. Write the tests WITHOUT a framework
As you are writing your `rps` function, write corresponding tests to verify your implementation for different possible arguments that a user might pass in.

You will first write your tests without a framework. To help you, I have written two helper functions in `helpers.py`. The high-level point here is that **anyone can write and run tests -- simply and easily -- without using a fancy testing library**. Please open the `run_tests_vanilla.py` file to inspect how these two helper functions are used. Pause and try to understand what this code does.

When you've thought about it, run the test suite:

```bash
poetry run python run_tests_vanilla.py
```

You should see the following output:

```bash
poetry run python run_tests_vanilla.py
--------------------------------------------------
✅ Success: It returns "Hello world!"
✅ Success: Paper beats rock
❌ Failure: Paper beats rock (flipped)
--------------------------------------------------

😬 Only  2 out of 3 tests passed.
```

Please write additional tests to ensure that all possible inputs yield the expected output. As you make new test functions, don't forget to add the name of each function to the list of tests that are passed into the `run_all_tests` function (at the bottom of the file).

### 4. Rewrite your tests using unittest
Now that you have implemented the `rps` function and written the corresponding tests using "vanilla" Python, you are going to rewrite your tests using **unittest** -- a testing module that is built into Python. Like Mocha, **unittest** offers programmers a set of convenience functions and classes for organizing and writing tests. Learn more here: <a href="https://docs.python.org/3/library/unittest.html" target="_blank">https://docs.python.org/3/library/unittest.html</a>

#### Run the unittest tests
Run the `unittest` version of your tests:

```bash
poetry run python run_tests_framework.py --verbose
```

If you did it correctly you should see output that looks like the following:

```bash
test_hello_world (__main__.TestStringMethods.test_hello_world) ... ok
test_paper_beats_rock (__main__.TestStringMethods.test_paper_beats_rock) ... FAIL

======================================================================
FAIL: test_paper_beats_rock (__main__.TestStringMethods.test_paper_beats_rock)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/.../labs/lab06/python_rps/run_tests_framework.py", line 51, in test_paper_beats_rock
    self.assertEqual(rps('paper', 'rock'), 'Paper wins!')
AssertionError: 'Invalid' != 'Paper wins!'
- Invalid
+ Paper wins!


----------------------------------------------------------------------
Ran 2 tests in 0.000s

FAILED (failures=1)
```

#### Add your unittest tests
Open `run_tests_framework.py`. In this file, a "starter" test class has been defined for you, which includes two starter tests that you can use as a model. Pause and think. What is the same and what is different from the vanilla version?

After inspecting the code, please add new `unittest` tests to exhaustively test the `rps` function. Note that instead of having your functions return **True** or **False**, you will now need to use the `unittest.TestCase` assertion methods. Examples:

* `self.assertTrue`
* `self.assertEqual`

A list of possible methods is described here: <a href="https://docs.python.org/3/library/unittest.html" target="_blank">https://docs.python.org/3/library/unittest.html</a>

### 5. Install and run the formatter, linter, and import sorter
We're now going to use some code formatting and linting tools: 
* **`black`** -- a code formatting tool for ensuring that your team has the same coding style conventions (indentation, naming conventions, line width, etc.). 
* **`flake8`** -- a linting tool for analyzing code for possible errors, style violations, or inefficiencies. Linters sometimes make code changes, but usually just point out potential issues that need to be solved manually.
* **`isort`** -- an import sorter for ensuring that import statements are alphabetized (for consistency).

Install all three as dev dependencies:

```bash
poetry add --group dev black flake8 isort
```

Once you have installed them, you should see all three listed as dev dependencies in your `pyproject.toml` file. 

#### Black
Black is a PEP 8 compliant opinionated formatter. Black reformats entire files in place. Style configuration options are deliberately limited and rarely added. In other words, unlike prettier, the formatting rules are typically fixed (you shouldn't need to override them).

Run the formatter:

```bash
poetry run black .
```

Don't forget the `.`, which instructs black to run on all files recursively within the current directory.

This command will tell you which of your Python files were reformatted. Open one of your "fixed" `.py` files and note what changed. If you run the black command a second time, no files should change.


#### Flake8
Some of flake8's default rules contradict black's formatting rules (for instance, the maximum line length and whether trailing whitespace is OK). To fix this, create a file called `.flake8` in your `python_rps` folder and paste the following rules into it:

```
[flake8]
max-line-length = 88
ignore = W291, W293

exclude =
    __pycache__
    .venv
```

These rules (1) make flake8's style settings match black's, and (2) tell flake8 not to analyze Python dependencies that you did not write.

Now run the linter:

```bash
poetry run flake8 .
```

This command will tell you which of your Python files do not conform to the PEP 8 / linting rules. Correct the errors manually and run flake8 again. Once all of your linter errors are corrected, you are done with this section.

#### isort
Finally, to enforce consistency in the import statements used in a file, some teams use an import sorter. We will use `isort` to do this. Run the import sorter:

```bash
poetry run isort .
```

Take a look and make a note of the files that were modified by this command. Then, open one of these files, change the import order (at the top), and run the `isort` command again. You should see that the order has been corrected / alphabetized. Now run the tests one final time to make sure they still work:

```bash
poetry run python run_tests_framework.py --verbose
```

You are now done with the Python version of this lab.

{:#submit}
## Answer the Questions & Submit
Whichever option you chose:
1. Open `answers.md` in the root of your `lab06` directory and answer the questions.
2. Stage, commit, and push your `lab06-b` branch to GitHub.
3. Make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab06-b` branch of **your repo**.
4. Paste a link to your PR in Canvas.

{:#takeaways .info}
> ## Takeaways
> A project's **test suite**, **code formatter**, **linter**, and **import sorter** (if applicable) are typically run before any pull request is made. These tools are also run by your project's continuous integration validation suite before any branch is merged into the main codebase. Test suites and automated static analysis tools are an important part of creating scalable software that is maintainable over time.
