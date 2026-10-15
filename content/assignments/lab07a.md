---
title: AsyncIO + MVC Warm-Up
type: lab
num: 7a
draft: 0
assigned_date: 2026-10-20
due_date: 2026-10-27
points: 6
---

{:.info}
> This lab is a shorter, more guided version of [Lab 7](/assignments/lab07). You will **feel** why asyncio matters with a café, see what MVC is for, and then make one small change in each of the Model, View, and Controller.

## 1. Discuss (5 minutes, with a partner)
1. Think of a time you waited on something slow (a web page, a download, a coffee). While you waited, what was the person or computer *doing*? Could it have been doing something else?
2. A barista takes Alice's order and then stands still for two minutes while the latte brews. What would you tell them to do differently?
3. Imagine one file that fetches data, decides what to do with a request, **and** prints the page. You want to change how the page looks. What else might break?

## 2. Practice Statements
Decide your answer for each one **before** you run any code. Answers are at the bottom of the page.

1. Three drinks each take 2 seconds. A barista makes them one after another. About how long is the total?
2. Same three drinks, but the barista starts all three and waits for them together. About how long is the total?
3. One of the three drinks takes 4 seconds, and the other two take 2 seconds each. Started together, how long is the total?
4. True or false: putting `async` in front of `def` automatically makes a function run at the same time as other code.
5. If you call `prepare_drink("Alice", "Latte")` where `prepare_drink` is an `async def` and you do **not** use `await`, what do you get back?
6. In the MVC pattern, which part decides how the data **looks**: the Model, the View, or the Controller?

## 3. Get Situated
**On GitHub:** sync your fork of the **class-exercises-fall2026** repo.

**On your local machine:** make sure all previous work is committed, then:

```bash
git checkout main
git pull
git checkout -b lab07a-b
```

You should see a new `lab07` folder (the app) and an `asyncio-activity` folder (the café scripts).

## 4. Part 1: The Café (asyncio)
In `asyncio-activity`, put the following in `cafe_sync.py` and run it:

```py
import time

def prepare_drink(customer, drink):
    print(f"{customer} ordered a {drink}.")
    time.sleep(2)  # simulates the time to make the drink
    print(f"{customer}'s {drink} is ready!")

def main():
    customers = [("Alice", "Latte"), ("Bob", "Espresso"), ("Charlie", "Cappuccino")]
    print("Starting orders...\n")
    for customer, drink in customers:
        prepare_drink(customer, drink)
    print("\nAll orders completed!")

if __name__ == "__main__":
    main()
```

Now put this in `cafe_async.py` and run it:

```py
import asyncio

async def prepare_drink(customer, drink):
    print(f"{customer} ordered a {drink}.")
    await asyncio.sleep(2)  # simulates the time to make the drink
    print(f"{customer}'s {drink} is ready!")

async def main():
    customers = [("Alice", "Latte"), ("Bob", "Espresso"), ("Charlie", "Cappuccino")]
    print("Starting orders...\n")

    # Calling an async function does not run it yet. It gives back a
    # coroutine object, which is "a drink waiting to be made".
    tasks = []
    for customer, drink in customers:
        tasks.append(prepare_drink(customer, drink))

    # Start all of them, then wait until every one is done.
    await asyncio.gather(*tasks)
    print("\nAll orders completed!")

if __name__ == "__main__":
    asyncio.run(main())
```

**Check your thinking:**
* Which version took longer, and by how much? Does it match your answers to practice statements 1 and 2?
* Make Bob's espresso take longer. Give `prepare_drink` a third parameter, `seconds`, use it in `await asyncio.sleep(seconds)`, and give each customer in the list their own number (Bob gets `4`). **Predict the total time first**, then run it. Does it match practice statement 3?
* Run `print(prepare_drink("Test", "Mocha"))` at the top of `main()`. What does it print? Why is that different from calling a normal function? (Practice statement 5.)

## 5. Part 2: MVC in Plain Words
The café again, this time with roles:

| MVC part | In the café | In the lab app |
| --- | --- | --- |
| **Model**: gets and holds the data | The menu and the orders | `app/models.py` fetches data from web APIs (asynchronously) |
| **View**: shows the data | The order board on the wall | `app/templates/index.html` turns the data into a web page |
| **Controller**: connects the two | The person taking orders and calling out drinks | `app/server.py` receives the request, asks the model for data, hands it to the view |

{:.info}
> **Why bother?** Each part has one job, so you can change the view (make the page prettier) without touching how the data is fetched, and you can add a new data source without touching the page.

### Run the app
```bash
cd lab07
poetry install
cd app
poetry run uvicorn server:app --reload
```

Visit [http://127.0.0.1:8000?place_name=Asheville](http://127.0.0.1:8000?place_name=Asheville).

### See asyncio in the real app
Open `server.py` and find the three endpoints, then visit each (change the place name if you like):

* [http://127.0.0.1:8000/api?place_name=Asheville](http://127.0.0.1:8000/api?place_name=Asheville): uses `asyncio.gather` to fetch everything at once
* [http://127.0.0.1:8000/api-sync?place_name=Asheville](http://127.0.0.1:8000/api-sync?place_name=Asheville): awaits one call after another

Compare the `time_taken` of the two. Which is faster, and which café version does each one look like?

## 6. Part 3: Make a Change in Each Part
Make a dog picture appear on the page. It takes one small change in each MVC part.

### 1. Model: `app/models.py`
Add a `get_dog_image()` function that fetches from `https://dog.ceo/api/breeds/image/random`. There is already an `ENDPOINT_DOG_PIC` constant, and `get_cat_fact()` is a good function to copy.

### 2. Controller: `app/server.py`
In **both** `/` and `/api`, add `models.get_dog_image()` to the `asyncio.gather(...)` call and pass the result along to the view as `dog_data`.

{:.info}
> Why add it to `gather` instead of a separate `await` line? Look back at your café timings.

### 3. View: `app/templates/index.html`
Add an `<img>` element that shows the dog image. Use double curly braces (`{{ ... }}`) to output the value from the data. Look at the response from the API to find out which key holds the image URL.

Reload the page and check that you see a dog.

## 7. Reflect
Answer these in an `answers.md` file in your `lab07` folder (a few sentences each):

1. For each of the three changes in Part 3, which file did you edit, and why that one?
2. Why does the Model fetch the data but never decide how it looks?
3. If you wanted to add a joke of the day from another API, which files would change?
4. In your own words, what does `await asyncio.gather(*tasks)` do?

## Extra Tasks
* Format the Wikipedia and Yelp data more nicely in the HTML template.
* Add images from the APIs to make the display more engaging.

## Submission
1. Commit and push your `lab07a-b` branch.
2. Create a pull request to `main`.
3. Submit the PR link in Canvas.

**Resources:**
* [Python asyncio](https://docs.python.org/3/library/asyncio.html)
* [FastAPI](https://fastapi.tiangolo.com/)
* [Jinja Templates](https://jinja.palletsprojects.com/en/stable/templates/)

---

## Practice Statement Answers
1. About **6 seconds** (2 + 2 + 2).
2. About **2 seconds**, because the waits overlap.
3. About **4 seconds**. The total is as long as the slowest drink.
4. **False.** `async def` only makes the function *able* to be paused. You still need `await` and something like `asyncio.gather` to get things running together.
5. A **coroutine object**. The function has not run yet.
6. The **View**.
