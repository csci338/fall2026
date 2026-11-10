---
title: Linters and Formatters
type: partial
num: 2
draft: 0
assigned_date: 2026-11-14
due_date: 2026-12-04
heading_max_level: 3
hide_from_list: 1
---

Linters and formatters help maintain code quality and consistency. Now that your containers are up and running, let's configure them for the backend and the frontend, and verify they work by running them **inside your containers** (see [how to work with your containers](project02-07-working-with-your-containers)).

Make sure your containers are running first:

```bash
docker compose up -d
```

## 1. Backend

The backend uses three tools:
- **Black** - Code formatter
- **isort** - Import sorter
- **flake8** - Linter

### 1.1. Configure Black and isort in pyproject.toml

Add these sections to your `backend/pyproject.toml` file (add them after the `[build-system]` section):

```toml
[tool.black]
line-length = 88
target-version = ['py311']

[tool.isort]
profile = "black"
line_length = 88
multi_line_output = 3
include_trailing_comma = true
force_grid_wrap = 0
use_parentheses = true
ensure_newline_before_comments = true
```

**What this does:**
- `[tool.black]` - Configures Black formatter (88 char line length, Python 3.11)
- `[tool.isort]` - Configures isort to work with Black's style

### 1.2. Configure flake8

Create `backend/.flake8` with the following content:

```ini
[flake8]
# Black allows for 88 chars per line. Let's make flake8 do that too!
max-line-length = 88

# some flake8 errors to ignore (b/c Black says they're OK):
ignore = W291, W293, W503 

exclude =
    .venv
```

**What this does:**
- Sets line length to 88 (matches Black)
- Ignores whitespace errors that Black handles
- Excludes virtual environment from linting

### 1.3. Create Helper Scripts
To make running linters easier, create a new directory within `backend` called `scripts`. Within `scripts`:


**Create `backend/scripts/check.sh`:**
```bash
#!/bin/bash

echo 'Running flake8...'
poetry run flake8

echo 'Running isort...'
poetry run isort . --check-only   # run the Python import sorter

echo 'Running black...'
poetry run black . --check        # runs the Python formatter

echo '✨✨✨✨✨ Completed checks ✨✨✨✨✨'
```

**Create `backend/scripts/fix.sh`:**
```bash
#!/bin/bash
# Running this file will modify all unformatted python files in this project.
# Run from project root directory: $ bash backend/scripts/fix.sh

poetry run isort .      # run the Python import sorter
poetry run black .      # runs the Python formatter
```

**Using the scripts:**

Your containers are already running, so you can run the linter inside the backend container as follows:

```bash
# Check code quality (doesn't modify files)
docker exec -it todo_backend bash scripts/check.sh

# Fix formatting issues (modifies files)
docker exec -it todo_backend bash scripts/fix.sh
```

**What each script does:**
- `check.sh` - Runs all checks (flake8, isort, black) without modifying files
- `fix.sh` - Automatically fixes formatting issues (isort and black)

### 1.4. Verify the Backend Checks

Because the backend folder is mounted into the container, the new files are visible right away. Run:

```bash
docker exec -it todo_backend bash scripts/check.sh
```

**What you should see:** `Running flake8...`, `Running isort...`, `Running black...`, and finally `✨✨✨✨✨ Completed checks ✨✨✨✨✨` with no errors.

**Prove it works:** add a few extra spaces somewhere in `server.py` (for example `x    =   1` on a new line), run `check.sh` again and confirm it complains. Then run `bash scripts/fix.sh` (via `docker exec`, as above), re-run `check.sh`, and confirm it passes. Remove your test line if `fix.sh` left it behind.

## 2. Frontend

The frontend uses two tools:

{:.compact}
- **ESLint** - JavaScript/React linter (finds code quality issues)
- **Prettier** - Code formatter (ensures consistent code style)

The frontend uses two linting and formatting tools:

{:.compact}
- **ESLint** - JavaScript/React linter (finds code quality issues)
- **Prettier** - Code formatter (ensures consistent code style)

### 2.1. Configure ESLint

Create `ui/.eslintrc.cjs`:

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Disable prop-types as we're not using TypeScript
  },
};
```

**What this does:**

{:.compact}
- Enables ESLint for browser and ES2020 environment
- Extends recommended React rules
- Configures React hooks linting
- Disables prop-types (since we're not using TypeScript)
- Warns about React Refresh best practices

### 2.2. Configure Prettier

Create `ui/.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 4,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**What this does:**

{:.compact}
- Uses semicolons
- Single quotes for strings
- 80 character line width
- 4 spaces for indentation
- Consistent line endings (LF)

### 2.3. Create Prettier Ignore File

Create `ui/.prettierignore`:

```
node_modules
dist
build
coverage
*.lock
package-lock.json
```

**What this does:**

{:.compact}
- Tells Prettier to skip formatting these files/directories

### 2.4. Verify the Frontend Checks

```bash
docker exec -it todo_frontend npm run check
```

**What you should see:** Prettier reports `All matched files use Prettier code style!` and ESLint finishes without errors or warnings.

**Prove it works:** add a stray unused variable (e.g. `const x = 1;`) to `ui/src/App.jsx` and run the check again; ESLint should complain. Run `docker exec -it todo_frontend npm run fix`, and remove your test line.

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify `docker exec -it todo_backend bash scripts/check.sh` passes.
> - [ ] Verify `docker exec -it todo_frontend npm run check` passes.
> - [ ] Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2026
> ├── .env
> ├── .git/
> ├── backend/
> │   ├── scripts/
> │   │   ├── check.sh      # new
> │   │   └── fix.sh        # new
> │   ├── .flake8           # new
> │   ├── pyproject.toml    # updated with linter config
> │   └── ...
> ├── database/
> │   └── ...
> └── ui/
>     ├── .eslintrc.cjs     # new
>     ├── .prettierignore   # new
>     ├── .prettierrc       # new
>     └── ...
> ```

## 3. Commit and Push
Go ahead and commit / push your changes to git / GitHub.

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
>
> {:.checkbox-list}
> - [ ] Verify that all your new code is on GitHub.

---

[← Back to Project 2 Instructions](project02)
