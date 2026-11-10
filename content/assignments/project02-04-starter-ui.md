---
title: "'Starter' Frontend"
type: partial
num: 2
draft: 0
assigned_date: 2026-11-14
due_date: 2026-12-04
hide_from_list: 1
---

We will build the frontend user interface (UI) in two parts. First (this page), we'll build the most minimal working react app possible. Then, in section 6, we'll enhance our UI so that it interacts with our FastAPI Backend.


## 1. Create package.json

Create `ui/package.json` - This file defines your project dependencies and scripts:

```json
{
  "name": "ui",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint:check": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format:check": "prettier --check \"src/**/*.{js,jsx,json,css}\"",
    "format:fix": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "check": "npm run format:check && npm run lint:check",
    "fix": "npm run format:fix && npm run lint:fix"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "vite": "^7.2.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.0.0",
    "eslint": "^8.57.1",
    "eslint-plugin-mocha": "^10.2.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "globals": "^15.0.0",
    "prettier": "^3.3.0"
  }
}
```

**What this does:**

{:.compact}
- **dependencies** - Packages needed to run your app (React, Vite)
- **devDependencies** - Tools for development (ESLint, Prettier)
- **scripts** - Commands you can run with `npm run`
  - `dev` - Start development server
  - `build` - Build for production
  - `lint:check` / `lint:fix` - Check/fix code quality
  - `format:check` / `format:fix` - Check/fix code formatting

**Important:** 
* Copy these versions exactly. Different versions may cause compatibility issues.
* You don't need to install dependencies locally! The Docker container will install them automatically when you build it.

Dependencies will be installed automatically when you build your containers (`npm install` will run during the build process).

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `package.json` file exists and contains all the required dependencies listed above.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── package.json      # new
>     └── src/
> ```

## 2. Create Vite Configuration

**What is Vite?**
Vite (pronounced "veet", French for "fast") is a build tool and development server for modern web applications. It's what will:

{:.compact}
- Start your development server (so you can see your app in the browser)
- Handle hot module replacement (HMR) - automatically refresh your browser when you change code
- Bundle your code for production
- Transform your JSX into regular JavaScript that browsers can understand

**What is the config file?**
The `vite.config.js` file tells Vite how to behave. It's like a settings file that configures:

{:.compact}
- Which port to run the development server on
- How to watch for file changes (important for Docker)
- Where to output production builds
- How to handle environment variables

Create `ui/vite.config.js`:

```javascript
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0", // Allow external connections
        port: 5173,
        strictPort: true, // Fail if port is already in use
        watch: {
            usePolling: true, // Required for Docker file watching
            interval: 1000, // Poll every second
        },
        hmr: {
            clientPort: 5173, // Port the browser connects to (mapped port from docker-compose)
        },
    },
    // Production build settings
    build: {
        outDir: "dist",
        sourcemap: false,
        minify: "esbuild",
    },
    // Environment variables - Vite requires VITE_ prefix
    envPrefix: "VITE_",
});
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `vite.config.js` file exists in the `ui/` directory.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── package.json
>     ├── src/
>     └── vite.config.js    # new
> ```

## 3. Create HTML Entry Point

Create `ui/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TODO App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>
```

**What this does:**

{:.compact}
- Creates the `<div id="app">` where React will render
- Loads `main.jsx` as a module (Vite handles the rest)

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `index.html` file exists in the `ui/` directory.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── index.html 
>     ├── package.json 
>     ├── src/
>     └── vite.config.js    # new
> ```

## 4. Create JavaScript Entry Point (main.jsx)

Create `ui/src/main.jsx` - This is where React starts rendering your app:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function main() {
    const rootEl = document.getElementById('app');
    const root = createRoot(rootEl);
    root.render(<App />);
}

main();
```

**What this does:**

{:.compact}
- Finds the `<div id="app">` element in `index.html`
- Creates a React root (React 18+ way to render)
- Renders the `App` component into that div
- This is the entry point - React starts here

**Why this structure:**

{:.compact}
- Separates rendering logic into a function
- Makes it clear where the app starts
- Works with Vite's module system

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `main.jsx` file exists in the `ui/src/` directory.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── index.html 
>     ├── package.json
>     ├── src/
>     │   └── main.jsx      # new
>     └── vite.config.js
> ```

## 5. Create a Minimal App Component

Create `ui/src/App.jsx` - Start with the simplest possible component:

```jsx
import React from 'react';

export default function App() {
    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <main>
                <p>Your app will go here!</p>
            </main>
        </>
    );
}
```

**What this does:**

{:.compact}
- Creates a simple React component
- Returns JSX (HTML-like syntax)
- `<>...</>` is a React Fragment (groups elements without adding extra HTML)

**Key concepts:**

{:.compact}
- **Component** - A function that returns JSX
- **JSX** - JavaScript syntax that looks like HTML
- **Export default** - Makes this component available to import

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `App.jsx` file exists in the `ui/src/` directory.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── index.html
>     ├── package.json
>     ├── src/
>     │   ├── App.jsx       # new
>     │   └── main.jsx
>     └── vite.config.js
> ```

## 6. Add Basic Styling

Create `ui/src/globals.css` - Add styles so you can see your app taking shape:

```css
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

header {
    background-color: hotpink;
    color: black;
    padding: 10px;
    text-align: center;
}

main {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
}
```

**Update App.jsx** to import the CSS:

```jsx
import React from 'react';
import './globals.css';  // <-- Add this line

export default function App() {
    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <main>
                <p>Your app will go here!</p>
            </main>
        </>
    );
}
```

**What this does:**

{:.compact}
- Adds global styles to your app
- Makes the header pink so you can see it
- Centers content with max-width

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `globals.css` file exists and is imported in `App.jsx`.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── index.html
>     ├── package.json
>     ├── src/
>     │   ├── App.jsx
>     │   ├── globals.css   # new
>     │   └── main.jsx
>     └── vite.config.js
> ```

## 7. Create A Dockerfile to Build the Frontend Server

Create `ui/Dockerfile`:

```dockerfile
# Use Node.js 20 as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Default command (can be overridden in docker-compose.yaml)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### 7.1. Test Your Frontend Image

This is the best check of everything in this step. Make sure Docker Desktop is running, then from the project root:

```bash
# Build the image. This runs `npm install`, so it validates package.json
docker build -t todo-ui ./ui

# Run it (Ctrl+C to stop)
docker run --rm -p 5173:5173 todo-ui
```

**What you should see:** the terminal shows Vite's `Local: http://localhost:5173/` message, and visiting <a href="http://localhost:5173" target="_blank">http://localhost:5173</a> in your browser shows the **TODO List** header and "Your app will go here!".

**If something fails:**
- Build fails at `npm install`: `package.json` probably has a typo or invalid JSON (check commas and quotes).
- A blank page or a Vite error overlay: read the message; it names the file (`main.jsx`, `App.jsx`, `index.html`, `vite.config.js`) and line.
- `port is already allocated`: stop whatever is using port 5173.

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify your `Dockerfile` exists in the `ui/` directory.
> - [ ] Verify the build and run test above succeeded.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── Dockerfile           # new
>     ├── index.html
>     ├── package.json
>     ├── src/
>     │   ├── App.jsx
>     │   ├── globals.css
>     │   └── main.jsx
>     └── vite.config.js
> ```

## 8. Summary

You now have a working React app with:

{:.compact}
- Project configuration (package.json)
- Vite bundler
- Entry point (main.jsx)
- Basic component (App.jsx)
- Styling (globals.css)
- HTML structure (index.html)
- A Dockerfile to build the UI container

**What you've learned:**

{:.compact}
- How to set up a React project with npm/package.json
- How React renders components
- Basic JSX syntax
- How to import and use CSS
- Component structure
- How to configure Vite as a build tool and development server
- How to create a Dockerfile to containerize your frontend application


**Next:** In Part 6 (coming in future steps), you'll add the Todos and CreateTodo components to make it functional.

## 9. Commit and Push
Go ahead and commit / push your changes to git / GitHub. 

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify that all your new code is on GitHub.

---

[← Back to Project 2 Instructions](project02)