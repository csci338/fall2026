---
title: React 101
group: Programming
group_order: 2
order: 3
featured_quicklink: 1
featured_quicklink_order: 3
---

Practice the React basics from [Lab 9](/assignments/lab09) and [Lab 10](/assignments/lab10). Try each exercise on its own in `App.jsx`, then open the solution to check your work.

## 1. Display a value

Inside `App`, create a variable named `name` with the value `"Maya"`. Use it in JSX to display **Hello, Maya!**

<details>
<summary>Show solution</summary>

```jsx
import React from "react";

export default function App() {
  const name = "Maya";
  return <p>Hello, {name}!</p>;
}
```

Curly braces let JSX use the value of `name`.

</details>

## 2. Make a Like button

Display **Likes: 0** and a **Like** button. Create a state variable for the count. Each click should increase the displayed count by one.

<details>
<summary>Show solution</summary>

```jsx
import React, { useState } from "react";

export default function App() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
```

React calls `handleLike` when the button is clicked. Calling `setLikes` updates the count React displays.

</details>

## 3. Display a list

Start with the list `["Maya", "Luis", "Ari"]`. Use `map` and a named function to display each name in its own list item. The names are unique in this example, so you can use each name as its key.

<details>
<summary>Show solution</summary>

```jsx
import React from "react";

export default function App() {
  const names = ["Maya", "Luis", "Ari"];

  function renderName(name) {
    return <li key={name}>{name}</li>;
  }

  return <ul>{names.map(renderName)}</ul>;
}
```

`map` calls `renderName` for each name and collects the resulting list items in a new array.

</details>

## 4. Write a tiny component

Write an `App` component that displays the word **Hello!** It only needs to return one paragraph.

<details>
<summary>Show solution</summary>

```jsx
import React from "react";

export default function App() {
  return <p>Hello!</p>;
}
```

</details>

## 5. Name a component

You want to show a custom greeting component in JSX. Which name should you use, `greeting` or `Greeting`? How would you write its tag?

<details>
<summary>Show solution</summary>

Use `Greeting` and render it with `<Greeting />`. Component names start with a capital letter. Lowercase tags such as `<p>` refer to HTML elements.

</details>

## 6. Pass a prop

A component named `Greeting` reads `props.name`. Write the JSX to pass it the name **Maya**.

<details>
<summary>Show solution</summary>

```jsx
<Greeting name="Maya" />
```

The `name` attribute passes a prop. Inside `Greeting`, `props.name` is `"Maya"`.

</details>

## 7. Use a component library

Your Lab 10 project already has Ant Design installed. Import its `Button` component and use it to display a button labeled **Search**.

<details>
<summary>Show solution</summary>

```jsx
import React from "react";
import { Button } from "antd";

export default function App() {
  return <Button>Search</Button>;
}
```

Ant Design provides the button’s appearance and basic behavior. The app decides what happens when the user clicks it.

</details>

## 8. Explain what a bundler does

Your app has several JavaScript files and imports packages like React. What does a bundler do with those files and imports when you build the app?

<details>
<summary>Show solution</summary>

A bundler follows the imports and packages the code into files the browser can load. In the labs, Vite runs the development server and handles the build when you run `npm run build`.

</details>
