---
title: Design Systems & External Data
type: lab
num: 10
draft: 0
assigned_date: 2026-11-19
due_date: 2026-11-23
points: 6
collapsible_headings:
  level: 3
  closed: true
---

## Overview
In this lab, you will be using the Ant Design System / Component library and the Spotify API to create way to search and listen to songs on Spotify. When you're done with your lab, it should look something like this:
* <a href="https://svanwart.github.io/spotify-project/" target="_blank">https://svanwart.github.io/spotify-project/</a>

Try it out to get a feel of how it should work. The goals with this lab are as follows:

1. Continue practicing your React skills
1. Work with a design system / component library -- we will be using Ant Design (`antd` node module) by Alibaba

## 1. Warmup

In this part, you will set up your project and practice with the `antd` component library using hardcoded data.

### 1.1. Getting Started

For this lab, there is **no starter code**. You will create everything yourself. Begin by navigating to your `class-exercises-fall2026` directory on your local machine: 
* Stage and commit any old work 
* Checkout your `main` branch
* Create a new branch from `main`: `git checkout -b lab10-b`
* Verify that you're on your new branch: `git branch`

Now, create a brand new folder called `lab10`. 

Like before, you will build your React app from scratch, which will involve:
1. Creating a `package.json` at the root of your `lab10` directory.
    * Hint: `npm init`
2. Installing the following 4 packages: `react`, `react-dom`, `vite`, and `antd`.
    * Hint: `npm install`
3. Creating the following 5 base files: `index.html`, `styles.css`,  `main.jsx`, `App.jsx`, and `.gitignore`
4. Adding the vite `dev` and `build` scripts to your `package.json` (see the `package.json` section below).

### 1.2. Setting up your files
Please add the following starter code to your files:

#### index.html
Paste the following code in `index.html`:
```html
<!doctype html>
<html>
  <head>
    <title>Spotify Practice</title>
    <link rel="stylesheet" href="styles.css" />
    <!-- link to React module -->
    <script type="module" src="./main.jsx"></script>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

#### styles.css
Paste the following code in `styles.css` (simple formatting to start you off):

```css
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
}

header {
    border-bottom: solid 2px;
    height: 100px;
    display: flex;
    justify-content: center;
}

main {
    max-width: 1100px;
    margin: auto;
    padding: 30px;
}
```

#### App.jsx
Paste the following code in `App.jsx` (sets up an HTML skeleton that you will later be enhancing):

```jsx
import React from "react";

export default function App() {
            
    return (
        <>
            <header>
                <h1>Spotify Demo</h1>
            </header>
            <main>
                <p>Hello React!</p>
            </main>
        </>
    );
}
```

#### main.jsx
Paste the following code in `main.jsx` (imports your `App.jsx` component and renders it inside of `<div id="app" />`):

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

function main() {
    const rootEl = document.getElementById("app");
    const root = createRoot(rootEl);
    root.render(<App />);
}

main();
```

#### package.json
In the scripts section of your `package.json`, add the following two entries to configure the vite bundler (recall that you already installed vite via npm):

```json
  ...
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
  ...
```


#### .gitignore
Exclude `node_modules`, `.DS_Store`, and any other system files you don't want in your repo


### 1.3. Test your files
Run your react app by issuing the following command via the command line:

```
$ npm run dev
```

You should see the following output:

```bash

  VITE v5.2.7  ready in 84 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```

If you configured everything correctly, when you navigate to [http://localhost:5173/](http://localhost:5173/) in your web browser, your react app should appear with the message "Hello React!".

### 1.4. Using the antd component library
Recall from lecture that you can use Ant Design components by importing them from the `antd` component library. Let's practice doing this.

#### Make some antd images
In `App.jsx`, import the Image component from the `antd` library, and add some image tags inside of the `<main></main>` tag. Check out the documentation to figure out how to do this:

* [https://ant.design/components/image](https://ant.design/components/image)

If you want some dummy photos, you can use a random image generator like [https://picsum.photos](https://picsum.photos). In the samples below, the first number specifies the width of the photo you want and the second number specifies the height. To "trick" your browser to make more than one image request (versus caching the same image and using it over and over again), append a unique query parameter at the end of each url (could be anything).

* https://picsum.photos/400/400?id=1
* https://picsum.photos/300/300?foo=bar

#### Make a carousel
Using the antd `Carousel` component, see if you can make a carousel of Beyonce albums. Here is a list of JSON objects representing 5 of Beyonce's albums:

```json
[
   {
      "id": "6BzxX6zkDsYKFJ04ziU5xQ",
      "name": "COWBOY CARTER",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2731572698fff8a1db257a53599",
      "spotify_url": "https://open.spotify.com/album/6BzxX6zkDsYKFJ04ziU5xQ"
   },
   {
      "id": "2UJwKSBUz6rtW4QLK74kQu",
      "name": "BEYONCÉ [Platinum Edition]",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2730d1d6e9325275f104f8e33f3",
      "spotify_url": "https://open.spotify.com/album/2UJwKSBUz6rtW4QLK74kQu"
   },
   {
      "id": "6PeoltoiWQWCyWA0JBHVGN",
      "name": "16 CARRIAGES",
      "image_url": "https://i.scdn.co/image/ab67616d0000b273f5220893852002a2a3078bab",
      "spotify_url": "https://open.spotify.com/album/6PeoltoiWQWCyWA0JBHVGN"
   },
   {
      "id": "6oxVabMIqCMJRYN1GqR3Vf",
      "name": "Dangerously In Love",
      "image_url": "https://i.scdn.co/image/ab67616d0000b27345680a4a57c97894490a01c1",
      "spotify_url": "https://open.spotify.com/album/6oxVabMIqCMJRYN1GqR3Vf"
   },
   {
      "id": "2m1enA3YrMLVvR3q0MqLpL",
      "name": "COWBOY CARTER",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2734903a9678d5664b9cd9a3fd8",
      "spotify_url": "https://open.spotify.com/album/2m1enA3YrMLVvR3q0MqLpL"
   }
]
```

See if you can figure out how to use JavaScript's built-in `Array.map()` function to programmatically generate each slide of the carousel. Try asking ChatGPT something like 

> "How do I create JSX components from a list of objects in React?"


##### Solution
At the top of `App.jsx`, import what you need:

```javascript
import React from "react";
import { Carousel } from "antd";
```

Then, inside the App() function, try this (the `...` inside `albums` means "add the rest of the albums from the list above"):

```javascript

    ...
    const carouselStyles = {
        "width": "640px", 
        "border": "solid 1px #000", 
        "margin": "auto"
    };
    const albums = [
        {
           "id": "6BzxX6zkDsYKFJ04ziU5xQ",
           "name": "COWBOY CARTER",
           "image_url": "https://i.scdn.co/image/ab67616d0000b2731572698fff8a1db257a53599",
           "spotify_url": "https://open.spotify.com/album/6BzxX6zkDsYKFJ04ziU5xQ"
        },
        {
           "id": "2UJwKSBUz6rtW4QLK74kQu",
           "name": "BEYONCÉ [Platinum Edition]",
           "image_url": "https://i.scdn.co/image/ab67616d0000b2730d1d6e9325275f104f8e33f3",
           "spotify_url": "https://open.spotify.com/album/2UJwKSBUz6rtW4QLK74kQu"
        }
        ...
     ];

    function albumToJSX(albumJSON) {
        return (
            <div key={albumJSON.id}>
                <img src={albumJSON.image_url} />
                <h3>{albumJSON.name}</h3>
            </div>
        )
    }

    return (
        <div style={carouselStyles}>
            <Carousel dotPosition="top">
                { 
                    albums.map(albumToJSX)
                }
            </Carousel>
        </div>
    );
```

Note that the argument within `albums.map()` is a function definition that is invoked for each JSON object in the list. The job of "map()" is to return a new array with a data transformation applied to each element. In this case, map returns a list of JSX objects, where each JSX object is a visual representation of the album.

##### Looking ahead: from a hardcoded list to state
Notice that the `albums` list above is hardcoded. In Part 2 (Your Task), the list of items will come from the Spotify server instead, and it will change every time the user searches. To make React redraw when the list changes, the list needs to live in a **state variable** rather than a regular `const`:

```javascript
// Warmup (static data):
const albums = [ ... ];

// Part 2 (data that changes over time):
const [tracks, setTracks] = useState([]);   // starts empty
// later, after fetch() returns:  setTracks(data);  --> React redraws
```

Everything else stays the same: you still call `.map()` on the list to generate one slide per item. The only difference is that calling `setTracks(...)` tells React to re-run your component with the new list.


## 2. Your Task: Query, Display, and Listen to Songs

> **What you will build:** a single-page React app where a user can search Spotify for songs and play them.
>
> 1. **A search form** (built with `antd` components) with two inputs: a search term (e.g., "Beyonce") and the number of songs to return (1-20), plus a Search button.
> 2. **A query to Spotify.** When the user clicks Search, your app uses `fetch` to request that many `track` results for that search term from the API Tutor endpoint.
> 3. **A carousel of players.** When the results come back, the app displays them in an `antd` Carousel: one slide per song, each containing an embedded Spotify player (iframe) so the user can listen. Searching again replaces the old slides with the new results.
>
> Try the <a href="https://svanwart.github.io/spotify-project/" target="_blank">demo</a> to see exactly how it should behave. The sections below give you the background and a step-by-step path (with checkpoints) to get there.

### 2.1. Querying Spotify
For this React project, we will be working with Spotify's REST API. Ordinarily, to use their API, you would register for an API key with Spotify. However, to save time, Sarah has created a proxy server called <a href="https://apitutor.org" target="_blank">API Tutor</a> that simplifies the API requests to Spotify (and a few other providers). The proxy server does two things:

1. Simplifies the data structure that is returned from Spotify 
2. Appends Sarah's Spotify API key in the header so that you don't have to register for an account.
    * Footnote: this isn't technically kosher, but it's only for educational purposes and I would never do this for a "real world" app.

The API endpoint that you will all be using is this one:

<a href="https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=album&limit=2" target="_blank">https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=album&limit=2</a>

There are three query parameters that you can adjust:
* `q`: the search term
* `type`: the resource type. Valid options are `album`, `track`, or `artist`
* `limit`: how many results to return

Try playing around with these three parameters to see what happens.

### 2.2. Requirements checklist
To complete this lab, your app must do the following:

1. Create a form -- using the `antd` form components (that we reviewed during lecture) -- that allows a user to input:
    * A search term (e.g., "Beyonce") -- required
    * The number of songs they want (min 1, max 20)
2. When the user clicks the search button, issue a query to Spotify (via the API Tutor endpoint, with `type=track`) using the user-specified `q` and `limit` arguments.
3. When the response comes back from the server, draw a carousel with an audio player (iframe) for each song -- one per slide.

### 2.3. How the pieces fit together
Before you write any code, it helps to see the whole flow:


1. User types a search term + clicks "Search"
1. `antd Form` calls your `onFinish(values)` function
1. your `onFinish` function calls `fetchData(q, limit)`
    - `fetch()` asks API Tutor for tracks (GET method)
    - When the response arrives, you call `setTracks(data)`
    - React sees that state changed and re-renders App
1. `tracks.map(...)` now produces new slides


#### Two big ideas:

* **Submitting the form is what triggers the new query.** The Form doesn't send anything on its own -- it just calls the function you give it (`onFinish`) with the values the user entered. *You* decide what that function does (in our case: call `fetch`).
* **You never "tell" the Carousel to redraw.** You update a state variable (`setTracks`), and React automatically re-runs your component and redraws everything that depends on that state. The Carousel is simply written as "one slide per item in `tracks`" -- so when `tracks` changes, the slides change. (This is the same `.map()` you used in the warmup, except the list comes from state instead of a hardcoded array.)

### 2.4. What the data looks like
With `type=track`, the API returns an **array** of track objects. For example, this query...

https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=track&limit=1 

...returns:

```json
[
  {
    "id": "6jG2YzhxptolDzLHTGLt7S",
    "name": "Drunk in Love (feat. JAY-Z)",
    "preview_url": null,
    "album": {
      "id": "2UJwKSBUz6rtW4QLK74kQu",
      "name": "BEYONCÉ [Platinum Edition]",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2730d1d6e9325275f104f8e33f3"
    },
    "artist": {
      "id": "6vWDO969PvNqNYHIOW5v0m",
      "name": "Beyoncé"
    }
  }
]
```

The `id` is what you need to build the embedded Spotify player URL.

### 2.5. Work in small steps
Don't try to do everything at once. Build in the following 4 checkpoints, and confirm each one works (in the browser and the DevTools console) before moving on. Try each one using the docs and what you learned in the warmup and in lecture first; the hints are there if you get stuck.

#### Checkpoint 1: Render the form (no behavior yet)
**Goal:** show a form with a text box for the search term, a number box for how many songs (1-20), and a Search button.

Docs: [Form](https://ant.design/components/form), [Input](https://ant.design/components/input), [InputNumber](https://ant.design/components/input-number), [Button](https://ant.design/components/button).

**Check:** the form appears, and the number box won't go below 1 or above 20.

<details class="mb-4">
<summary>Stuck? Show a hint</summary>

Look at the "Basic usage" examples in the Form docs. Pay attention to the `name` prop on `Form.Item`, the `onFinish` prop on `Form`, and the `htmlType` prop on `Button`.

</details>

#### Checkpoint 2: Receive the form values
**Goal:** when the user submits the form, your code receives what they typed.

**Check:** enter "Beyonce" and 3, click Search. The console should show something like `{q: "Beyonce", limit: 3}`.

<details class="mb-4">
<summary>Stuck? Show a hint</summary>

The `Form` calls the function you give it via `onFinish`, passing one argument: an object whose keys are the `name`s of your `Form.Item`s. Write that function and `console.log` its argument.

</details>

#### Checkpoint 3: Issue the query
**Goal:** when the user submits, send a request to API Tutor using *their* search term and limit (not hardcoded ones).

**Check:** each time you click Search, the console shows an array of tracks. Open the DevTools **Network** tab and verify that the request URL changes when you change the form values.

<details class="mb-4">
<summary>Stuck? Show a hint</summary>

Write a separate function (e.g., `fetchData`) that takes the search term and limit as parameters, builds the URL from Section 2.1, calls `fetch`, and waits for the JSON. Call it from your submit function. Remember `type=track`, and consider what happens to search terms with spaces or special characters in a URL (`encodeURIComponent`).

</details>

#### Checkpoint 4: Redraw the carousel
**Goal:** show the results as a carousel with one embedded Spotify player per song, and replace the slides on every new search.

Spotify's embedded player is an `<iframe>` whose `src` looks like `https://open.spotify.com/embed/track/<TRACK_ID>?utm_source=generator`.

**Check:** search for "Beyonce", then search for something else. The slides should be replaced each time, and you should be able to play a song.

<details class="mb-4">
<summary>Stuck? Show a hint</summary>

Revisit 2.3 and the "Looking ahead" note in the warmup. Your carousel should be built from a variable that React *knows about* (state), so that updating that variable redraws it. Where in your code will you update it? Then use `.map()` to turn each track object into one slide, just like you did with the albums.

</details>

<details class="mb-4">
<summary>Still stuck? Show the iframe markup</summary>

```jsx
<iframe
    src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"></iframe>
```

</details>

### 2.6. Troubleshooting
Common symptoms and where to look:
* **Nothing happens when I click Search:** is the button actually a *submit* button, and is your function connected to the form?
* **`undefined` where I expected the search term:** compare the `name` you gave the form item with the key you're reading.
* **The data arrives (console.log works) but the screen doesn't change:** how does React find out that your data changed?
* **Hundreds of requests / page freezes:** where in your component are you calling your fetch function? It should only run in response to a submit.
* **React warning about `key`:** items produced by `map()` need a unique `key`.
* **Carousel looks blank/odd before the first search:** what does your list contain before the user searches? Consider what you want to show in that case.

### 2.7. Extra Credit
1. See if you can deploy your React App on GitHub pages. One way of doing this is using the `gh-pages` module (which you can install via npm). Here's a <a href="https://blog.seancoughlin.me/deploying-to-github-pages-using-gh-pages" target="_blank">blog post about it</a>, but you can also use ChatGPT to get some insight.
2. Refactor `App.jsx` so that the **Form** functionality and the **Carousel** functionality are separated into two standalone components. Then, get them to talk to each other.
    * In other words, how does the Form component notify the Carousel to redraw after the user submits their search?
    * Hint: "lift state up." Keep `tracks` (and `fetchData`) in `App`, and pass them down as props -- e.g., give your form component an `onSearch` function prop, and give your carousel component a `tracks` prop.
    
## What to Submit
When you're done, push your `lab10-b` branch to GitHub and make a pull request. 

- Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab10-b` branch of **your repo**. 
- Then, please paste a link to your PR in the Canvas.
