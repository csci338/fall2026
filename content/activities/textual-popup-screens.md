---
title: Textual Pop-Up Screens (Step by Step)
type: activity
draft: 0
start_date: 2026-10-15
date: 2026-10-15
---

Most of the remaining Project 1 tickets add a piece of the terminal interface with [Textual](https://textual.textualize.io/). This activity is the warm-up for one of them: **[Export dialog, Issue #30](https://github.com/csci338/project01-fall2026/issues/30)**. Its job: when the user presses a key, a small pop-up opens that asks "CSV, JSON, or Markdown?" and hands the answer back.

Today we build a tiny version of that pop-up **step by step**, starting from nothing.

## What you will build
A tiny terminal app with a "blue screen" pop-up:

1. The main screen says `Hello World!` and tells you to press `b`.
2. Pressing `b` opens a blue pop-up with three buttons: **CSV**, **JSON**, **Markdown**.
3. Clicking a button closes the pop-up, and the main screen says which one you chose.
4. Pressing `Escape` closes the pop-up with no choice, and the main screen says `Cancelled`.

By the end you will be able to:
* Build a pop-up (`ModalScreen`) out of widgets with `compose()`
* Respond to a button click, and return an answer from a screen with `dismiss()`
* Connect a key to an action with `BINDINGS`

You do not need to know Textual. We add **one small idea at a time** and run the app after every step. If something goes wrong, you only changed a few lines, so it is easy to find.

{:.info}
> ### This is a practice run
> The Export dialog is the instructor's ticket, so **do not open a pull request for it**. You are working on a practice branch. The point is that the next ticket you pick up (a help screen, a theme switcher, a file-name dialog) uses exactly these moves.

## Before You Begin
1. If you have a PR that has been approved and that did not request changes, please merge it!
1. If you have a PR where changes were requested, please revise and resubmit!

## Get Situated
1. Sync your fork of **project01-fall2026** on GitHub, then in your terminal:
    ```bash
    git checkout main
    git pull
    poetry run pytest
    ```
    The tests should pass before you change anything.

1. Create a new branch:
    ```bash
    # replace <yourname> with your name, no angle brackets
    git checkout -b popup-practice-<yourname>
    ```
1. Open the issue [**#30 Export dialog**](https://github.com/csci338/project01-fall2026/issues/30) in your browser and keep it open. You will not build the whole ticket today, but you will use its moves.
1. In your `project01-fall2026` folder, create a new file called `bsod_demo.py`. (You will not commit this file.)

Run your file at any time with:

```bash
poetry run python bsod_demo.py
```

Quit with `Ctrl+Q` (or `q`, once you add a key binding for it).

## Try It Yourself First
Before you look at any steps, try to build it using **only the online documentation**. Reading docs and getting stuck a little is the skill the project tickets need, and it is where most of the learning happens.

**The goal** is the four-point app from "What you will build" above. A good order to attack it in:

- [ ] A window that shows `Hello World!`
- [ ] A second screen (a pop-up) that opens when you press `b`
- [ ] Three buttons on that pop-up: CSV, JSON, Markdown
- [ ] Clicking a button closes the pop-up and shows your choice on the main screen
- [ ] `Escape` closes the pop-up and shows `Cancelled`

**Where to look** (open these in tabs):

| You need to… | Read |
| --- | --- |
| Get a first app running | [Textual: Getting started](https://textual.textualize.io/getting_started/) and [App basics](https://textual.textualize.io/guide/app/) |
| Open and close a second screen | [Screens guide](https://textual.textualize.io/guide/screens/) (look for `push_screen`, `ModalScreen` and `dismiss`) |
| Put buttons on a screen | [Button widget](https://textual.textualize.io/widgets/button/) |
| Lay widgets out side by side | [Layout guide](https://textual.textualize.io/guide/layout/) |
| Run code when a key is pressed | [Input guide](https://textual.textualize.io/guide/input/) and [Actions](https://textual.textualize.io/guide/actions/) |
| Run code when a button is clicked | [Events and messages](https://textual.textualize.io/guide/events/) |

**Rules for this part:**
1. Give it about 15 minutes, working alone or with the person next to you.
2. It is fine to get only partway. Note exactly where you got stuck (what you tried, and what happened).
3. Do **not** open the steps below until we say so. When we do, compare your approach with the steps and see which parts you did differently.

{:.info}
> If a guide's example uses a separate `.tcss` file, you can put the same CSS in a `CSS = """ ... """` string on your class instead, so you have one file to manage.

## Step-by-Step Walkthrough
Open this **after** you have tried it on your own. Each step adds one idea and has you run the app.

<details class="mb-4">
<summary><strong>Show the step-by-step walkthrough</strong> (try it yourself first!)</summary>

## Step 1: A window that says hello
Type this into `bsod_demo.py`:

```python
from textual.app import App, ComposeResult
from textual.widgets import Footer, Header, Static


class ScreenApp(App):
    BINDINGS = [("q", "quit", "Quit")]

    def compose(self) -> ComposeResult:
        yield Header()
        yield Static("Hello World!")
        yield Footer()


if __name__ == "__main__":
    ScreenApp().run()
```

Run it. You should see a title bar, `Hello World!`, and a bottom bar that says `q Quit`. Press `q` to quit.

**What is going on?**
* `App` is the program. `ScreenApp` is our version of it.
* A **widget** is one thing on the screen: `Header` (top bar), `Static` (a piece of text), `Footer` (bottom bar).
* `compose()` lists the widgets, top to bottom. Each `yield` means "add this widget next."
* `BINDINGS` connects a key to an action. `("q", "quit", "Quit")` means: key `q`, do the action `quit`, show the label `Quit` in the footer.

**Try it:** change the text of the `Static`, run it again.

---

## Step 2: Add a place to show an answer
We want the main screen to report what you chose. Add one more `Static`, with an `id` so we can find it later. Your `compose()` becomes:

```python
    def compose(self) -> ComposeResult:
        yield Header()
        yield Static("Hello World!\nPress b to open the pop-up.")
        yield Static("", id="result")
        yield Footer()
```

Run it. The second `Static` is empty, so you will not see it yet, and that is fine.

* `\n` means "start a new line."
* `id="result"` is a name tag. Later, `self.query_one("#result")` finds the widget with that name tag.

---

## Step 3: Build the pop-up (but do not open it yet)
A pop-up is a **screen** of its own that sits on top of the main one. Add this class **above** `ScreenApp` in your file, and add `Horizontal`, `Vertical`, `ModalScreen` and `Button` to the imports:

```python
from textual.containers import Horizontal, Vertical
from textual.screen import ModalScreen
from textual.widgets import Button, Footer, Header, Static


class BSOD(ModalScreen[str | None]):
    def compose(self) -> ComposeResult:
        with Vertical(id="box"):
            yield Static("Choose a format:")
            with Horizontal(id="buttons"):
                yield Button("CSV", id="csv")
                yield Button("JSON", id="json")
                yield Button("Markdown", id="markdown")
            yield Static("Press Escape to close this window.")
```

Nothing changes when you run it, because nothing opens the pop-up yet. That is the next step.

**What is going on?**
* `ModalScreen` is a pop-up screen. `[str | None]` says "when it closes it hands back a piece of text, or nothing."
* `Vertical` stacks its children top to bottom. `Horizontal` puts them side by side. The indented lines under `with` are the children.
* Each `Button` has a label (what you see) and an `id` (its name tag, which we use in step 5).

---

## Step 4: Open the pop-up with a key
Add a new binding and a new method to `ScreenApp`:

```python
class ScreenApp(App):
    BINDINGS = [
        ("b", "show_bsod", "Open pop-up"),
        ("q", "quit", "Quit"),
    ]

    # ... compose() stays the same ...

    def action_show_bsod(self) -> None:
        self.push_screen(BSOD())
```

Run it and press `b`. The pop-up appears on top. You can click the buttons, but nothing happens, and you cannot close the pop-up yet. (If you get stuck, press `Ctrl+C` in the terminal to stop the program. We fix this in the next two steps.)

**What is going on?**
* The key `b` runs the action `show_bsod`. Textual finds it by name: **action `show_bsod` → method `action_show_bsod`**.
* `push_screen(...)` puts a screen on top of the current one.

---

## Step 5: Make the buttons give an answer
Add this method **inside** the `BSOD` class (indented, below `compose`):

```python
    def on_button_pressed(self, event: Button.Pressed) -> None:
        self.dismiss(event.button.id)
```

Run it, press `b`, and click **JSON**. The pop-up closes. We have not shown the answer yet; that is the next step.

**What is going on?**
* Clicking a button sends a **message** called `Button.Pressed`. A method named `on_button_pressed` is called automatically when that message arrives. (Textual finds it by its name: `on_` + `button` + `pressed`.)
* `event.button.id` is the name tag of the button that was clicked: `"csv"`, `"json"`, or `"markdown"`.
* `self.dismiss(value)` closes the pop-up and hands `value` back.

---

## Step 6: Show the answer on the main screen
We need two small changes. First, tell `push_screen` what to do with the answer. Change `action_show_bsod`:

```python
    def action_show_bsod(self) -> None:
        self.push_screen(BSOD(), self.show_result)
```

Second, add the `show_result` method to `ScreenApp`:

```python
    def show_result(self, result: str | None) -> None:
        text = "Cancelled" if result is None else f"You chose: {result}"
        self.query_one("#result", Static).update(text)
```

Run it, press `b`, click **Markdown**. The main screen now says `You chose: markdown`.

**What is going on?**
* `self.show_result` (no parentheses) is handed over as a **callback**: "when the pop-up closes, call this with its answer."
* `query_one("#result", Static)` finds the widget with that name tag, and `.update(...)` changes its text.
* `None` means "no answer," and we will see where it comes from in the next step.

---

## Step 7: Close with Escape
Add a binding and a method **inside** `BSOD`:

```python
class BSOD(ModalScreen[str | None]):
    BINDINGS = [("escape", "cancel", "Close")]

    # ... compose() and on_button_pressed() stay the same ...

    def action_cancel(self) -> None:
        self.dismiss(None)
```

Run it, press `b`, then `Escape`. The main screen says `Cancelled`.

This is the same pattern as step 4: key → action name → `action_<name>` method.

---

## Step 8: Make it blue
Add this to the `BSOD` class, right under `BINDINGS`:

```python
    DEFAULT_CSS = """
    BSOD { align: center middle; background: #0000aa; }
    #box { width: 60; height: auto; padding: 1 2; border: round white; }
    #buttons { height: auto; margin: 1 0; }
    #buttons Button { margin-right: 1; }
    """
```

Run it and press `b`.

* The CSS looks like web CSS. `#box` styles the widget with `id="box"`.
* `BSOD { ... }` styles the whole pop-up screen: center things, make the background blue.

**Try it:** change `width: 60` to `40`, or the colors.

---

## Step 9 (optional): Say *what* is being exported
Right now the pop-up always says `Choose a format:`. Let the main screen decide the text.

In `BSOD`, add an `__init__` and use the value:

```python
    def __init__(self, what: str) -> None:
        super().__init__()   # let Textual set the screen up first
        self.what = what

    def compose(self) -> ComposeResult:
        with Vertical(id="box"):
            yield Static(f"Choose a format for {self.what}:", markup=False)
            # ... the rest stays the same ...
```

In `ScreenApp`, pass the value in:

```python
        self.push_screen(BSOD("your file"), self.show_result)
```

Run it. The pop-up now says `Choose a format for your file:`.

---

## The finished file
If anything is not working, compare yours with this one:

```python
from textual.app import App, ComposeResult
from textual.containers import Horizontal, Vertical
from textual.screen import ModalScreen
from textual.widgets import Button, Footer, Header, Static


class BSOD(ModalScreen[str | None]):
    """A pop-up screen. It answers with "csv", "json", "markdown" or None."""

    BINDINGS = [("escape", "cancel", "Close")]

    DEFAULT_CSS = """
    BSOD { align: center middle; background: #0000aa; }
    #box { width: 60; height: auto; padding: 1 2; border: round white; }
    #buttons { height: auto; margin: 1 0; }
    #buttons Button { margin-right: 1; }
    """

    def __init__(self, what: str) -> None:
        super().__init__()
        self.what = what

    def compose(self) -> ComposeResult:
        with Vertical(id="box"):
            yield Static(f"Choose a format for {self.what}:", markup=False)
            with Horizontal(id="buttons"):
                yield Button("CSV", id="csv")
                yield Button("JSON", id="json")
                yield Button("Markdown", id="markdown")
            yield Static("Press Escape to close this window.")

    def on_button_pressed(self, event: Button.Pressed) -> None:
        self.dismiss(event.button.id)

    def action_cancel(self) -> None:
        self.dismiss(None)


class ScreenApp(App):
    BINDINGS = [
        ("b", "show_bsod", "Open pop-up"),
        ("q", "quit", "Quit"),
    ]

    def compose(self) -> ComposeResult:
        yield Header()
        yield Static("Hello World!\nPress b to open the pop-up.")
        yield Static("", id="result")
        yield Footer()

    def action_show_bsod(self) -> None:
        self.push_screen(BSOD("your file"), self.show_result)

    def show_result(self, result: str | None) -> None:
        text = "Cancelled" if result is None else f"You chose: {result}"
        self.query_one("#result", Static).update(text)


if __name__ == "__main__":
    ScreenApp().run()
```

</details>

## Check your understanding
1. Which line makes the pop-up appear? Which line makes it disappear?
2. How does the main screen find out which button you clicked?
3. What would happen if you gave two buttons the same `id`? (Try it. Which of the two buttons could you still tell apart?)
4. Add a fourth button, **Excel**, so that choosing it shows `You chose: excel`. How many places did you have to change?

{:.info}
> **What you just used:** a screen (`ModalScreen`), widgets and containers (`compose`, `yield`, `with`), key bindings (`BINDINGS` + `action_<name>`), messages (`on_button_pressed`), and a callback (`push_screen(screen, callback)`). Every screen ticket in the project is built from these same pieces.
