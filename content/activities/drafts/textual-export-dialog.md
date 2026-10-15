---
title: Building a Textual Screen (Export Dialog)
type: activity
draft: 0
start_date: 2026-10-15
date: 2026-10-15
---

## Objective
Most of the remaining Project 1 tickets add a piece of the terminal interface with [Textual](https://textual.textualize.io/). Today we will build one of those pieces **together, start to finish**:
* **[Export dialog: Issue #30](https://github.com/csci338/project01-fall2026/issues/30)**. Job: when the user clicks a button, a small pop-up opens that asks "CSV, JSON, or Markdown?" and hands the answer back.

By the end you will be able to:
* Read a Textual ticket and turn its tables into code and tests
* Build a pop-up (`ModalScreen`) out of widgets with `compose()`
* Respond to a button click, and return an answer from a screen with `dismiss()`
* Test a screen with a simulated user (`pilot`)

{:.info}
> ### This is a practice run
> The Export dialog is the instructor's ticket, so **do not open a pull request for it**. You are working on a practice branch. The point is that the next ticket you pick up (a help screen, a theme switcher, a file-name dialog) uses exactly these moves.

## 0. Before You Begin
1. If you have PR that has been approved and that did not request changes, please marge it! 
1. If you have a PR where changes were requested, please revise and resubmit!

## 1. Get Situated
1. Sync your fork of **project01-fall2026** on GitHub, then in your terminal:
    ```bash
    git checkout main
    git pull
    poetry run pytest
    ```
    The tests should pass before you change anything.

1. Create a new branch:
    ```bash
    # replace <yourname> with yourname no angle brackets
    git checkout -b export-dialog-practice-<yourname>  
    ```
1. Open the issue [**#30 Export dialog**](https://github.com/csci338/project01-fall2026/issues/30) in your browser and keep it open.

## 2. A Two-Minute Tour of Textual (all together)
Open `course_lookup/tui/app.py` and find these four things. We will point at each one on the projector.

| Look for | What it is |
| --- | --- |
| `class CourseLookupApp(App)` | The app itself: the class that starts the program and decides what shows up on screen. |
| `def compose(self)` with `yield` lines | Lists the **widgets** on the screen, top to bottom. Read each `yield` as "add this widget." |
| `with Vertical(...)` | A **container**. Everything yielded inside the `with` becomes its child. |
| `BINDINGS` and `action_reload` | A key press runs the method named `action_<name>`. |

<details class="mb-4">
<summary><strong>What does <code>yield</code> mean?</strong> (click to expand)</summary>

`compose()` has one job: hand Textual the list of widgets to show. Here is the same method written two ways.

**With a list** (no `yield`): build the whole list, then give it back at the end.

```python
def compose(self):
    widgets = []
    widgets.append(Header())
    widgets.append(Static("Press e to open the dialog."))
    widgets.append(Footer())
    return widgets
```

**With `yield`**: hand over one widget at a time, in the order they appear on screen.

```python
def compose(self):
    yield Header()
    yield Static("Press e to open the dialog.")
    yield Footer()
```

Textual ends up with the same three widgets in the same order either way. `yield` is shorthand: instead of collecting widgets in a list and returning it, each `yield` says "here is the next one."

You can see the difference with a plain Python example that has nothing to do with Textual:

```python
def with_a_list():
    items = []
    print("building the list...")
    items.append("a")
    items.append("b")
    return items          # everything is ready at once


def with_yield():
    print("starting...")
    yield "a"             # pauses here and hands over "a"
    print("...resuming")
    yield "b"             # pauses again, hands over "b"


for x in with_a_list():
    print("got", x)
# building the list...
# got a
# got b

for x in with_yield():
    print("got", x)
# starting...
# got a
# ...resuming
# got b
```

The function with `yield` runs a little, pauses at each `yield`, and picks up where it left off when asked for the next item. (Python calls this a *generator*.) For `compose()` you can ignore all that: **read every `yield` as "add this widget to the screen."**

#### The actual Python meaning
A function containing `yield` is a **generator**. Calling it does not run it; it returns a "paused function" that gives back one value each time it is asked for the next one, then pauses where it left off.

```python
def count_up(limit):
    n = 1
    while n <= limit:
        yield n          # hand back n, then pause here
        n += 1


gen = count_up(3)
print(next(gen))         # 1
print(next(gen))         # 2
print(list(count_up(3))) # [1, 2, 3]  (list() and for loops call next() for you)
```

`return` ends a function with one value. `yield` hands back a value and keeps the function alive so it can hand back more.

{:.info}
> The `with Vertical(...):` blocks work the same way. Anything yielded inside the block becomes a child of that container.

</details>

Then skim `course_lookup/tui/README.md`, Part 2. You do not need to memorize it; it is the reference you come back to when a line confuses you.

{:.info}
> **A screen is just a big widget.** The app shows one screen at a time. A `ModalScreen` is a screen that floats on top of the current one (a pop-up) and blocks the keyboard until it closes.

## 3. Read the Ticket Like a Spec
Read issue #30 slowly. Answer these as a class before writing any code:

1. What file do we edit? (`course_lookup/tui/screens/export_dialog.py`)
2. What is the class called, and what does its constructor take?
3. What four buttons are there, and what is each one's **id**? Why do the ids matter? (Look at the tests section.)
4. What does the screen *return* for each action? What is different about Cancel and Escape?
5. What does the dialog **not** do? (It does no exporting. Who does?)

{:.info}
> A good habit: the "returns" table in a ticket is your list of tests. Every row becomes one assertion.

## 4. Warm-Up: A Screen "Hello World"
The ticket's **Helpful reading** links to the Textual guide on [Screens](https://textual.textualize.io/guide/screens/). Before we build the dialog, do that guide's first example on your own (5 to 10 minutes). It is a tiny app where pressing `b` opens a blue "Blue Screen of Death" screen on top of the main one.

### Start from a clean branch
```bash
git checkout main
git pull
poetry run pytest
```
The tests should still pass. Then create a branch for the warm-up:

```bash
# replace <yourname> with your name, no angle brackets
git checkout -b screen-hello-world-<yourname>
```

### Do the exercise
1. Open the [Screens guide](https://textual.textualize.io/guide/screens/) and find the first full example (the one with a `BSOD` class).
2. Copy it into a scratch file in the project root, such as `screen_hello.py`. If the example uses a separate `.tcss` file, copy that too and save it next to your script. Do not commit these files.
3. Run it: `poetry run python screen_hello.py`
4. Press `b`, then press `Escape` (or whichever key the guide's example uses to go back).

### Answer these before moving on
Two sentences each is plenty.
* Which line makes the second screen appear? Which line (or key) makes it go away?
* Where is the second screen's content listed? (Hint: look for `compose` and `yield`.)
* What will be different about our `ExportDialog`? It is a `ModalScreen`, and it has to hand back an answer. Search the guide page for `ModalScreen` and `dismiss`.

{:.info}
> This is the same pattern we are about to use: **one screen on top of another, opened with a key, closed with another key**. Our dialog adds buttons and an answer.

When you are done, go back to your practice branch for the rest of the activity:

```bash
git checkout export-dialog-practice-<yourname>
```

## 5. Build It, One Small Step at a Time
Create `course_lookup/tui/screens/export_dialog.py`. After **each** step we run it and look at the result, so you never write more than ten lines blind.

### Step 0: a way to see it
A screen cannot run on its own, so we use a tiny throw-away app. Create `demo_export.py` in the **project root** (do not commit it):

```python
from textual.app import App
from textual.widgets import Footer, Header, Static

from course_lookup.tui.screens.export_dialog import ExportDialog


class Demo(App):
    BINDINGS = [("e", "export", "Export")]

    def compose(self):
        yield Header()
        yield Static("Press e to open the dialog.")
        yield Footer()

    def action_export(self):
        # push_screen shows the dialog; when it closes, show_answer
        # is called with whatever the dialog returned.
        self.push_screen(ExportDialog("your schedule"), self.show_answer)

    def show_answer(self, answer):
        self.notify(f"You chose: {answer}")


Demo().run()
```

Run it with `poetry run python demo_export.py` (quit with `ctrl+q`). It will crash because `ExportDialog` does not exist yet. That is fine.

### Step 1: an empty pop-up
```python
from textual.app import ComposeResult
from textual.screen import ModalScreen
from textual.widgets import Static


class ExportDialog(ModalScreen[str | None]):
    def compose(self) -> ComposeResult:
        yield Static("Export the current results as:")
```

* `ModalScreen[str | None]` says "this screen answers with a string or `None`." It is a hint for readers; it changes nothing at runtime.
* Run the demo, press `e`. You see the text but cannot close it. We will fix that.

**Try it:** change the text, run again. What happens if you put `[bold]` in the text? (The ticket says to show text as plain text. Pass `markup=False` to `Static`.)

### Step 2: make it a box in the middle
Add a `DEFAULT_CSS` string to the class and wrap the widget in a container:

```python
from textual.containers import Vertical

class ExportDialog(ModalScreen[str | None]):
    DEFAULT_CSS = """
    ExportDialog { align: center middle; }
    #dialog {
        width: 60;
        height: auto;
        padding: 1 2;
        border: thick $accent;
        background: $surface;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="dialog"):
            yield Static("Export the current results as:", markup=False)
```

CSS in Textual looks like web CSS: `#dialog` styles the widget with `id="dialog"`. `$accent` and `$surface` are theme colors.

**Try it:** change `width: 60;` to `40`, then change `border: thick` to `border: double`.

### Step 3: the buttons
Put the four buttons side by side in a `Horizontal` container. **Use exactly the ids from the ticket.**

```python
from textual.containers import Horizontal, Vertical
from textual.widgets import Button, Static

    def compose(self) -> ComposeResult:
        with Vertical(id="dialog"):
            yield Static("Export the current results as:", markup=False)
            with Horizontal(id="buttons"):
                yield Button("CSV", id="csv")
                yield Button("JSON", id="json")
                yield Button("Markdown", id="markdown")
                yield Button("Cancel", id="cancel")
```

Add to `DEFAULT_CSS`:

```
#buttons { height: auto; margin-top: 1; }
#buttons Button { margin-right: 1; }
```

Run it. Click a button. Nothing happens yet: a button click is a **message** that nobody is handling.

### Step 4: handle the click and return an answer
Textual calls `on_<widget>_<message>` automatically. A `Button` posts `Button.Pressed`, so the handler is called `on_button_pressed`:

```python
    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "cancel":
            self.dismiss(None)
        else:
            self.dismiss(event.button.id)
```

* `event.button.id` is the id string we gave the button, which is why the ticket cares about ids.
* `self.dismiss(value)` closes the screen **and** hands `value` to the callback we gave `push_screen` (`show_answer` in the demo).

Run the demo, press `e`, click **JSON**. You should see a notice: `You chose: json`.

**Discuss (2 min):** we wrote only *one* handler for four buttons. What would it look like with four separate handlers using `@on(Button.Pressed, "#csv")`? When is each approach better?

### Step 5: Escape
Cancel works, but the ticket also says Escape returns `None`. Use a key binding:

```python
    BINDINGS = [("escape", "cancel", "Cancel")]

    def action_cancel(self) -> None:
        self.dismiss(None)
```

This is the same `BINDINGS` / `action_<name>` pattern from `app.py`. Run it and press Escape.

### Step 6: the `what` argument
The ticket says the title is `Export {what} as:`, and `what` defaults to `"the current results"`. Add an `__init__`:

```python
    def __init__(self, what: str = "the current results") -> None:
        super().__init__()          # let Textual set the screen up first
        self.what = what
```

Then use `f"Export {self.what} as:"` in the `Static`. The demo already passes `"your schedule"`. Run it to check.

{:.info}
> `super().__init__()` runs the parent class's setup. Leave it out and Textual breaks in confusing ways. If you want a refresher on this and `**kwargs`, see Part 2 of `course_lookup/tui/README.md`.

## 6. Test It
We cannot click through the app every time. Instead we write a test with a **pilot**, a robot user that can press keys and click.

Create `tests/test_screen_export_dialog.py`:

```python
import asyncio

from textual.app import App
from textual.widgets import Static

from course_lookup.tui.screens.export_dialog import ExportDialog


def open_dialog(scenario, what=None):
    """Open the dialog in a tiny app, run the scenario, return the answers."""
    answers = []

    class Harness(App):
        def on_mount(self):
            dialog = ExportDialog() if what is None else ExportDialog(what)
            # answers.append is the callback: it receives the dialog's answer
            self.push_screen(dialog, answers.append)

    async def main():
        async with Harness().run_test(size=(80, 24)) as pilot:
            await pilot.pause()      # wait for the dialog to appear
            await scenario(pilot)    # the robot user does its thing
            await pilot.pause()      # wait for the dialog to close

    asyncio.run(main())
    return answers


def test_csv_button_returns_csv():
    async def scenario(pilot):
        await pilot.click("#csv")

    assert open_dialog(scenario) == ["csv"]
```

Run `poetry run pytest tests/test_screen_export_dialog.py`.

* `async def` / `await` are needed because the screen runs while the test waits. `open_dialog` hides the `asyncio` part so your tests stay short.
* `pilot.click("#csv")` clicks the widget with that id. `pilot.press("escape")` presses a key.

### Your turn at your table: feel free to work with one another (10 minutes)
Add the remaining tests from the ticket. Use the first test as your template:

- [ ] JSON returns `"json"`; Markdown returns `"markdown"`
- [ ] Cancel returns `None`
- [ ] Escape returns `None`
- [ ] The title mentions what is being exported (`ExportDialog("your schedule")`).
  Hint: inside your scenario, `pilot.app.screen.query_one(Static).content` is the title text.

**Stretch:** Break the code on purpose (change `"cancel"` to `"cancle"` in the handler). Which test fails, and does the failure message tell you why?

## 7. Check and Wrap Up
Delete `demo_export.py`, then run the checks every ticket requires:

```
poetry run pytest
poetry run black --check course_lookup tests
poetry run flake8 course_lookup tests
```

If Black complains, run it again without `--check` and it will fix your files.

### Reflection (write your answers in your notes)
1. The dialog never exports anything. Why is it better for it to only *return an answer*?
2. Where in this activity did a **message** get sent? Where did a **method name** (`on_...`, `action_...`) matter?
3. Which step would you expect to be hardest in a ticket like #28 (Help screen) or #64 (File name dialog)? Which parts of today's code would you reuse?

## What to Remember
| Task | The move |
| --- | --- |
| Put widgets on a screen | `compose()` and `yield` (`with` for containers) |
| Style it | `DEFAULT_CSS`, starting each rule with your class or `#id` |
| React to a button | `on_button_pressed(self, event)` and `event.button.id` |
| Return an answer | `self.dismiss(value)` |
| Respond to a key | `BINDINGS` plus `action_<name>` |
| Test it | a tiny `App`, `push_screen(screen, callback)`, and `pilot` |

---

## Instructor Notes (remove before publishing)
* **Timing (about 50 min):** tour 5, spec reading 5, build 20, tests 15, wrap 5. If short on time, skip Step 6 and the stretch test.
* **TODO (fixture):** the tests in section 6 build their own tiny `App` (`open_dialog`) on purpose, so students see every moving part. The project's `tests/conftest.py` on GitHub main already has a `run_app` fixture (not yet in older local clones) that does this without a custom `App`: `run_app([], scenario)` then `app.push_screen(ExportDialog(), answers.append)` inside the scenario. Once the class is comfortable with the from-scratch version, replace `open_dialog` with `run_app`, or add a shared screen fixture to `conftest.py`. Also update the "tiny `App` subclass" wording in issues #28, #30, #53, #62 and #64.
* **Likely snags:** forgetting `super().__init__()`; a mistyped button id (the test fails with "no matches"); students running `demo_export.py` from the wrong directory, so the `course_lookup` import fails.
* **Reference solution:**

```python
"""A pop-up that asks which export format to use."""

from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical
from textual.screen import ModalScreen
from textual.widgets import Button, Static


class ExportDialog(ModalScreen[str | None]):
    """Returns "csv", "json", "markdown", or None (Cancel / Escape)."""

    BINDINGS = [("escape", "cancel", "Cancel")]

    DEFAULT_CSS = """
    ExportDialog { align: center middle; }
    #dialog {
        width: 60;
        height: auto;
        padding: 1 2;
        border: thick $accent;
        background: $surface;
    }
    #buttons { height: auto; margin-top: 1; }
    #buttons Button { margin-right: 1; }
    """

    def __init__(self, what: str = "the current results") -> None:
        super().__init__()
        self.what = what

    def compose(self) -> ComposeResult:
        with Vertical(id="dialog"):
            yield Static(f"Export {self.what} as:", markup=False)
            with Horizontal(id="buttons"):
                yield Button("CSV", id="csv")
                yield Button("JSON", id="json")
                yield Button("Markdown", id="markdown")
                yield Button("Cancel", id="cancel")

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "cancel":
            self.dismiss(None)
        else:
            self.dismiss(event.button.id)

    def action_cancel(self) -> None:
        self.dismiss(None)
```
