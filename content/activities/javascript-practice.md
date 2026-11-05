---
title: JavaScript Essentials for React
type: activity
draft: 0
quicklink: 1
start_date: 2026-11-05
date: 2026-11-05
---

React and Lab 10 lean on a handful of JavaScript features. This in-class activity assumes you've read the [JavaScript vs Java: Quick Reference](/resources/javascript-java-comparison). We'll start with a quick warm-up on the basics and spend most of our time on the features React uses most. Consult with the folks at your table.

## Setup

For this activity, there is **no starter code**. You will create a new folder in your `class-exercises-fall2026` repo and put your work there.

**On your local computer**, in your terminal (WSL terminal if you're on Windows):

1. Navigate to your `class-exercises-fall2026` directory.
1. Stage and commit any old work (`git status` should show a clean working tree).
1. Check out your `main` branch: `git checkout main`
1. Create a new branch from `main`: `git checkout -b js-exercises-b`
1. Verify that you're on your new branch: `git branch`
1. Create a new folder called `js-exercises` and navigate into it:

    ```bash
    mkdir js-exercises
    cd js-exercises
    ```

1. Create one file for each part of the activity. For example, create `part1.js` and open it in VS Code:

    ```bash
    touch part1.js
    code part1.js
    ```

1. Verify that Node is installed by running `node --version`. If you get an error, ask for help.


## Part 1: Warm-up (about 10 minutes)

Without running the code, predict what each snippet prints, then check with the folks at your table and run it.

```javascript
// a
console.log(5 === "5");
console.log(0 == false);

// b
console.log(greet("Ada"));
function greet(name) {
    return `Hello, ${name}!`;
}

// c
console.log(shout("hi"));
const shout = (s) => s.toUpperCase();
```

Then write these using **regular function syntax**, a **loop**, and an **if / else**. Don't use `map`, `filter`, or other array methods yet.

<details class="mb-4">
<summary>Part 1 cheatsheet (open if you get stuck on syntax)</summary>

| Need | Syntax |
|------|--------|
| Remainder (is it divisible?) | `n % 3 === 0` is true when `n` divides evenly by 3 |
| And / or / not | `&&`, `\|\|`, `!` |
| Strict equality | `a === b` (see the [cheatsheet](/resources/javascript-java-comparison#3-equality-operators)) |
| Template literal | `` `${title} by ${artist}` `` (backticks, not quotes) |
| Round down | `Math.floor(431 / 60)` gives `7` |
| Pad a string | `"5".padStart(2, "0")` gives `"05"` |
| Loop over an array | `for (const x of arr) { ... }` or `for (let i = 0; i < arr.length; i++) { ... }` |
| Array length | `arr.length` |

**Watch out:**

* `padStart` is a *string* method. `(5).padStart(2, "0")` throws an error. Convert first: `String(5).padStart(2, "0")`.
* In `fizzbuzz`, the order of your `if` checks matters. A number divisible by both 3 and 5 is also divisible by 3.

**More:** [loops](/resources/javascript-java-comparison#4-loops) and [template literals](/resources/javascript-java-comparison#6-string-formatting) in the cheatsheet. MDN: [remainder (`%`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder), [`padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart), [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

</details>

```javascript
// Returns "FizzBuzz" if n is divisible by 3 and 5, "Fizz" if by 3 only,
// "Buzz" if by 5 only, otherwise n itself.
function fizzbuzz(n) {
    // your code here
}

// Adds up all the numbers in the array using a loop.
function sum(nums) {
    // your code here
}

// Returns how many numbers in the array are even.
function countEvens(nums) {
    // your code here
}

// Returns a string like "Hey Jude by The Beatles" using a template literal.
function describeSong(title, artist) {
    // your code here
}

// Returns a string like "7:11" for 431 seconds. 125 seconds gives "2:05".
// Hint: Math.floor(seconds / 60), seconds % 60, and .padStart(2, "0").
function formatDuration(seconds) {
    // your code here
}

console.assert(fizzbuzz(15) === "FizzBuzz");
console.assert(fizzbuzz(9) === "Fizz");
console.assert(fizzbuzz(10) === "Buzz");
console.assert(fizzbuzz(7) === 7);
console.assert(sum([1, 2, 3, 4]) === 10);
console.assert(countEvens([1, 2, 3, 4, 6]) === 3);
console.assert(describeSong("Hey Jude", "The Beatles") === "Hey Jude by The Beatles");
console.assert(formatDuration(431) === "7:11");
console.assert(formatDuration(125) === "2:05");
```

## Part 2: Arrow functions

Arrow functions are a shorter way to write functions. You'll see them everywhere in React code. Here are the same function written three ways:

```javascript
// 1. regular function
function square(n) {
    return n * n;
}

// 2. arrow function with a body
const square2 = (n) => {
    return n * n;
};

// 3. arrow function with an implicit return (no braces, no `return`)
const square3 = (n) => n * n;
```

<details class="mb-4">
<summary>Part 2 cheatsheet (open if you get stuck on syntax)</summary>

| Need | Syntax |
|------|--------|
| Arrow function with a body | `const add = (a, b) => { return a + b; };` |
| Implicit return (one expression) | `const add = (a, b) => a + b;` (no braces, no `return`) |
| One parameter | `const double = n => n * 2;` or `(n) => n * 2` (both work) |
| No parameters | `const hello = () => "hi";` |
| Returning an object literal | `const makeSong = (t) => ({ title: t });` (wrap it in parentheses) |
| Template literal in an arrow function | ``const greet = (name) => `Hello, ${name}!`;`` |
| Boolean from a comparison | `const isEven = (n) => n % 2 === 0;` |

**Watch out:**

* If you use braces `{ }`, you must write `return`. If you forget it, the function returns `undefined`.
* Arrow functions are assigned to a variable, so use `const` and define them *before* you call them. Unlike function declarations, they are not hoisted (see warm-up part c).
* The `=>` goes after the parameters, not before them.

**More:** [function syntax in the cheatsheet](/resources/javascript-java-comparison#2-function-syntax). MDN: [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

</details>

**Your turn:** rewrite `describeSong` and `formatDuration` from Part 1 as arrow functions (call them `describeSong2` and `formatDuration2`). Then write an arrow function `isEven(n)` with an implicit return.

```javascript
const describeSong2 = null; // your code here
const formatDuration2 = null; // your code here
const isEven = null; // your code here

console.assert(describeSong2("Respect", "Aretha Franklin") === "Respect by Aretha Franklin");
console.assert(formatDuration2(125) === "2:05");
console.assert(isEven(4) === true && isEven(3) === false);
```

## Part 3: Objects and destructuring

React components receive their inputs (props) as an object, and you'll constantly pull values out of objects.

```javascript
const song = { title: "Hey Jude", artist: "The Beatles", year: 1968 };

console.log(song.title); // dot notation
const { title, artist } = song; // destructuring
const older = { ...song, year: 1969 }; // spread: copy, then override
```

**Your turn:** write `formatSong({ title, artist })` that destructures its argument *in the parameter list* and returns `"title - artist"`. Then create a copy of `song` with a new `title` **without modifying the original**.

```javascript
const formatSong = ({ title, artist }) => {
    // your code here
};

console.assert(formatSong(song) === "Hey Jude - The Beatles");

const renamed = null; // your code here (use spread)
console.assert(renamed.title === "Let It Be" && song.title === "Hey Jude");
```

## Part 4: Arrays: `map`, `filter`, and `find`

You already looped over arrays in Part 1. These methods do the same kind of work more concisely, and they don't modify the original array. They return a new one. This is how React turns data into UI.

```javascript
const nums = [1, 2, 3, 4];
nums.map((n) => n * 2); // [2, 4, 6, 8]
nums.filter((n) => n % 2 === 0); // [2, 4]
nums.find((n) => n > 2); // 3
```

<details class="mb-4">
<summary>Part 4 cheatsheet (open if you get stuck on syntax)</summary>

| Need | Syntax |
|------|--------|
| Transform every item (same length out) | `prices.map((p) => p * 2)` |
| Pull one field out of every object | `users.map((u) => u.age)` |
| Build a string for every item | ``users.map((u) => `${u.name} is ${u.age}`)`` |
| Keep only items that pass a test | `users.filter((u) => u.age >= 18)` |
| First item that passes a test | `users.find((u) => u.name === "Ada")` |
| What if nothing matches? | `filter` returns `[]`. `find` returns `undefined`. |
| Use your own function as the callback | `nums.map(double)` (no parentheses after `double`) |

**Watch out:**

* The callback gets *one item at a time*. The name you pick (`u`, `song`, `s`) is up to you.
* `map` and `filter` return a **new array**. They don't change the original, so save the result in a variable.
* `filter` returns an array, even when only one item matches. `find` returns the item itself.
* An arrow function with braces needs `return`. Without braces, the expression is returned for you.

**More:** MDN: [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). The [csci344 JavaScript resources](https://csci344.github.io/spring2026/resources) have a page on higher-order array functions with more practice.

</details>

**Your turn:** use this data.

```javascript
const songs = [
    { id: 1, title: "Hey Jude", artist: "The Beatles", seconds: 431 },
    { id: 2, title: "Yesterday", artist: "The Beatles", seconds: 125 },
    { id: 3, title: "Respect", artist: "Aretha Franklin", seconds: 147 },
];
```

1. Get an array of just the titles.
1. Get only the songs by The Beatles.
1. Find the song with `id` 3.
1. Get an array of strings like `"Hey Jude (7:11)"`. *(Reuse your `formatDuration` function.)*

```javascript
const titles = []; // your code here
const beatles = []; // your code here
const respect = null; // your code here
const labels = []; // your code here

console.assert(titles.length === 3 && titles[0] === "Hey Jude");
console.assert(beatles.length === 2);
console.assert(respect.title === "Respect");
console.assert(labels[0] === "Hey Jude (7:11)" && labels[1] === "Yesterday (2:05)");
```

{:.info}
> In Lab 9 and Lab 10, you'll use `map` to turn an array of data into an array of components. Then you'll use `filter` to remove items from state. Notice that you never change the original array.

## Part 5: Modules

Real projects split code across files. Anything you want to use elsewhere has to be exported.

```javascript
// utils.js
export const formatDuration = (seconds) => { /* ... */ };
export default function Playlist() { /* ... */ }

// App.jsx
import Playlist, { formatDuration } from "./utils.js";
```

<details class="mb-4">
<summary>Part 5 cheatsheet (open if you get stuck on syntax)</summary>

| Need | Syntax |
|------|--------|
| Named export | `export const add = (a, b) => a + b;` or `export function add() { ... }` |
| Default export | `export default function App() { ... }` or `export default App;` |
| Import a named export | `import { add } from "./math.js";` (curly braces, exact name) |
| Import a default export | `import App from "./App.jsx";` (no braces, any name you like) |
| Import both | `import App, { add } from "./App.jsx";` |
| Import from an installed package | `import { useState } from "react";` (no `./`) |

**Watch out:**

* A file can have many named exports but only **one** default export.
* Local files start with `./` (or `../`). Packages don't.
* If an import comes back `undefined`, check whether you used braces when you shouldn't have (or the other way around).

**More:** MDN: [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) and [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

</details>

**Discuss with your partner:** What's the difference between a *default* export and a *named* export? Look at `main.jsx` and `App.jsx` in your Lab 9 code. Which kind does each file use?

## Part 6: Asynchronous code: `fetch`, promises, and `async`/`await`

Network requests take time, so JavaScript doesn't wait. It hands you a *promise*, which is a placeholder for a value that will arrive later.

```javascript
const getUser = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json(); // parse the JSON body
    return data;
};

getUser().then((user) => console.log(user.name));
```

<details class="mb-4">
<summary>Part 6 cheatsheet (open if you get stuck on syntax)</summary>

| Need | Syntax |
|------|--------|
| Declare an async function | `const load = async () => { ... };` or `async function load() { ... }` |
| Wait for a promise | `const response = await fetch(url);` (only inside an `async` function) |
| Parse a JSON response | `const data = await response.json();` |
| Build a URL with a variable | `` `https://example.com/users/${id}` `` |
| Add a query string | `` `https://example.com/todos?userId=${id}` `` |
| Use the result of an async function | `load().then((result) => console.log(result));` |
| Return a value | `return value;` inside an `async` function gives the caller a promise of that value |
| Handle errors | `try { ... } catch (error) { console.error(error); }` |

**Watch out:**

* `await` only works inside a function marked `async`.
* `response.json()` is *also* async. Without `await`, you get a promise instead of your data.
* An `async` function always returns a promise, so the caller needs `await` or `.then(...)`.
* Once you have the parsed data, it's a normal JavaScript array or object. Everything from Parts 3 and 4 works on it.
* Check your network if nothing prints. `fetch` needs the internet, and Node 18 or newer.

**More:** the fetch / async / await page in the [csci344 JavaScript resources](https://csci344.github.io/spring2026/resources). MDN: [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch), [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

</details>

**Your turn:** write `getTodoTitles(userId)`. It should fetch `https://jsonplaceholder.typicode.com/todos?userId=<userId>`, parse the JSON, and return an array of just the `title` strings. Use `async`/`await`.

```javascript
const getTodoTitles = async (userId) => {
    // your code here
};

getTodoTitles(1).then((titles) => {
    console.assert(Array.isArray(titles) && titles.length > 0);
    console.assert(typeof titles[0] === "string");
    console.log(titles);
});
```

**Discuss:** What happens if you forget the `await` before `response.json()`? Try it and see what you get back.

## Wrap up (discuss as a class)

1. Which of the warm-up predictions surprised you? Why do function declarations and arrow functions behave differently?
1. Why does `map` return a new array instead of changing the old one? Why might that matter for a UI library?
1. What's the advantage of `async`/`await` over chaining `.then()` calls?
1. Which of these features did you find least familiar? Where do you expect to see it in Lab 9?

## Want more?

The [csci344 JavaScript resources](https://csci344.github.io/spring2026/resources) cover higher-order array functions, spread and destructuring, and `fetch`/`async`/`await` in more depth.
