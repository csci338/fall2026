---
title: Sample Final Exam
type: activity
draft: 0
featured_quicklink: 1
featured_quicklink_order: 2
start_date: 2026-11-23
date: 2026-11-23
---

> Allow about two hours. The exam is closed book, and you may use one page of notes, front and back.
>
> Explain your reasoning and show how you would apply it. Try the questions before opening the answer key.

<!-- .extra-list-spacing -->

1. **A teammate needs to find every reference to the term "TODO" in the project and share a way for others to repeat the search.**

   <!-- .list-spaced -->

   - What makes a shell command useful for a task several teammates need to repeat?
   - Starting at the project root, write a command that searches for `TODO` in files under the current directory. Explain what the command searches and how a teammate could reuse it.

   Review these concepts in [Command line and editor, Lab 1](/assignments/lab01).

2. **In Project 1, you’re assigned an issue to add an optional `room_number` property to the `Course` model. Courses with a room number should show it in the search results, and courses without one should show “Room TBD.” Explain how you’d take the issue from assignment to review.**

   <!-- .list-spaced -->

   - How would you start work on this issue in Git? Explain why you’d use a branch dedicated to it.
   - Where in the app would you store the room number, and where would you decide to display “Room TBD”? Explain why those responsibilities belong there.
   - What two examples would you put in your pull request description to help a reviewer verify the change? Give the expected display for each. If known room numbers always show “Room TBD,” where would you look first and why?
   - Another pull request merges into `main` before yours is approved. How would you bring that change into your branch, and what would you verify before merging?

   Review these concepts in [Git and GitHub, Lab 2](/assignments/lab02), [Lab 3](/assignments/lab03), and [Project 1](/assignments/project01).

3. **In Project 2, Docker Compose starts three containers on your laptop: a React development server, a FastAPI back end, and a PostgreSQL database. Explain how these pieces work together when a user runs a search.**

   <!-- .list-spaced -->

   - Sketch the browser and the three containers. Draw arrows showing who talks to whom when the page first loads and when the user searches.
   - Once the page loads, where does the React code run? Which part of the app talks to PostgreSQL?
   - How does Compose let the back end reach the database in a separate container? Explain what the shared network provides in your own words.

   Review these concepts in [Docker and Compose, Lab 4](/assignments/lab04).

4. **A fresh checkout works on your machine but fails on a teammate’s machine after they install dependencies. The project committed its package manifest but omitted its lock file.**

   In npm, these files are `package.json` and `package-lock.json`. In Poetry, they’re `pyproject.toml` and `poetry.lock`.

   <!-- .list-spaced -->

   - What information does a lock file provide that a manifest with version ranges leaves open?
   - Explain what you would commit and how teammates or CI should install dependencies from a fresh checkout. Use either npm or Poetry.

   Review these concepts in [Package Managers, Lab 5](/assignments/lab05).

5. **A change to a shared Project 2 function breaks an important behavior. The team discovers the problem after merging the pull request.**

   <!-- .list-spaced -->

   - Why run tests and linters on pull requests? Give an example of a problem each check can catch.
   - Describe a regression test for a behavior the function should preserve. Explain when the CI workflow should run and what the team should do if that check fails.

   Review these concepts in [Testing, static analysis, and CI, Lab 6](/assignments/lab06).

6. **Your boss asks you to create a GET route at `/courses` that lets users search by course title, instructor, or both. The course records are stored in your system’s PostgreSQL database. Explain how the route would work.**

   <!-- .list-spaced -->

   - Write an example request URL for a user searching for “Programming” taught by "Walter.” Identify the route path and the two query parameters.
   - Explain how the route reads the query parameters and uses them to query PostgreSQL. What happens if the user provides only one filter? What happens if both filters are present?
   - Why is GET a good choice for this search?

   Review these concepts in [Course search and routing, Lab 7](/assignments/lab07) and [Working with APIs, Lab 10](/assignments/lab10).

7. **Your app needs to load films rated PG. The examples below get the same films. Explain what the ORM does for the developer.**

   Hand-written SQL

   ```sql
   SELECT *
   FROM film
   WHERE rating = 'PG';
   ```

   SQLAlchemy ORM, using the `Film` model mapped to the `film` table and an async session

   ```python
   stmt = select(Film).where(Film.rating == "PG")
   films = (await session.scalars(stmt)).all()
   ```

   <!-- .list-spaced -->

   - In your own words, what are both examples asking the database to find?
   - With the ORM, Python gets `Film` objects. How might it use one of those objects to display a film’s title?
   - Why might a Python developer use an ORM? Give one reason they might still want to read or write SQL directly.

   Review these concepts in [SQL and ORMs, Lab 8](/assignments/lab08).

8. **A route needs two API results. One usually takes two seconds and the other takes one second.**

   <!-- .list-spaced -->

   - When is it useful to run these requests concurrently? What dependency between the requests would require sequential execution?
   - Compare the expected total time and completion order when the route awaits each request before starting the next versus when it starts both concurrently and waits for both results. You can describe the scheduling in words.

   Review these concepts in [Concurrency, AsyncIO activity](/activities/asyncio) and [Lab 8](/assignments/lab08).

9. **A React component displays “Likes: 0” and has a Like button. Each click should increase the displayed count by one. To do this, the programmer needs to create a state variable.**

   <!-- .list-spaced -->

   - What should the state variable’s initial value be?
   - Describe what should happen from the moment the user clicks Like to the moment the new count appears. You can answer in words.

   Review these concepts in [React components and state, Lab 9](/assignments/lab09).

10. **Your Project 2 page displays items from an API. The Add item form saves a new item successfully, but it does not appear in the list until the user reloads the page.**

    <!-- .list-spaced -->

    - Why can the database contain the new item while React still displays the old list?
    - Trace the flow from form submission to an updated list. Choose either to fetch the list again after a successful save or to update state from the API response. Explain when the state update should occur and what the user should see if the save fails.

    Review these concepts in [Design systems and external data, Lab 10](/assignments/lab10) and [Project 2](/assignments/project02).

11. **Explain in your own words how a merge, a fast-forward, and a rebase change Git history.**

    <!-- .list-spaced -->

    - If `main` is an ancestor of your branch, what happens when Git fast-forwards `main`?
    - If the branches have diverged, how would a merge and a rebase each combine the work? Why does it matter whether your branch is shared?

    Review these concepts in [Git, Lab 3](/assignments/lab03).

12. **What is a database join, and how would you use one to show the name and location of each class?**

    ```text
    +------------------+       +------------------+
    | classes          |       | locations        |
    +------------------+       +------------------+
    | class_id (PK)    |       | name             |
    | name             |       |                  |
    | location_id (FK) |------>| location_id (PK) |
    +------------------+       +------------------+
    ```

    <!-- .list-spaced -->

    - Explain how the two tables are related and which columns your query would match.
    - Write a query that returns the class name and location name for each class with a matching location.

    Review these concepts in [SQL, Lab 8](/assignments/lab08).

13. **A single server runs a web API and a PostgreSQL database. Explain how both services can stay available to clients on the same machine.**

    <!-- .list-spaced -->

    - What does it mean for a process to listen for requests? Who is the client when the browser calls the API? Who is the client when the API queries PostgreSQL?
    - Suppose the API listens on port 8000 and PostgreSQL listens on port 5432. How does each client reach the service it needs, even though both services are on the same machine?

    Review these concepts in [Docker and Compose, Lab 4](/assignments/lab04).

14. **Choose HTTP methods for reading and creating resources.**

    <!-- .list-spaced -->

    - Which method would you use to list all classes at `/classes`? Why?
    - Which method would you use to create a new class at the same URL? Where would you send its name?

    Review these concepts in [REST and HTTP, Lab 10](/assignments/lab10).

15. **Explain how PUT and PATCH differ when editing a class.**

    <!-- .list-spaced -->

    - Which method would you use to change only the class’s location? What would you put in the request body?
    - Which method would you use to replace the class’s full representation? What would the request body contain in that case?

    Review these concepts in [REST and HTTP, Lab 10](/assignments/lab10).

16. **Explain how a client would remove a class through a REST API.**

    <!-- .list-spaced -->

    - Which method and URL would you use to remove class 42?
    - The server responds with `204 No Content`. What does that tell the client about the deletion? Should it try to read a JSON response body?

    Review these concepts in [REST and HTTP, Lab 10](/assignments/lab10).

17. **Use HTTP status codes to interpret what happened to a request.**

    <!-- .list-spaced -->

    - After submitting a new class, the browser receives either `201 Created` or `500 Internal Server Error`. What should the app show the user in each case? In which case should it add the class to the displayed list?
    - A student opens a saved link to a class and gets `404 Not Found`. What does that response tell the app, and what could the app show the student?

    Review these concepts in [REST and HTTP, Lab 10](/assignments/lab10).

18. **Explain why a browser’s `fetch()` operation is asynchronous.**

    <!-- .list-spaced -->

    - What can the browser do while it waits for the server to respond?
    - Sketch how you would fetch JSON and update React state after the response arrives. When would you show an error?

    Review these concepts in [External data, Lab 10](/assignments/lab10).

19. **This React component uses `map` to display a list of names. Explain what happens when the component renders.**

    ```jsx
    function PeopleList() {
      const people = [
        { id: 1, name: "Maya" },
        { id: 2, name: "Luis" },
      ];

      function renderPerson(person) {
        return <li key={person.id}>{person.name}</li>;
      }

      return (
        <ul>
          {people.map(renderPerson)}
        </ul>
      );
    }
    ```

    <!-- .list-spaced -->

    - What type of argument is passed to `map` in this example?
    - How does `map` use this argument?
    - What does `map` return in this example?
    - When updating a list in React state, why do developers usually create a new array instead of modifying the existing one?

    Review these concepts in [React and JavaScript, Lab 9](/assignments/lab09).

20. **What is a side effect in functional programming?**

    <!-- .list-spaced -->

    - Which of these operations have side effects, and why? Returning `price * 1.1`, logging the price, or sending the price to an API.
    - Why is it useful to keep a calculation separate from logging or sending its result?

    Review these concepts in [React and JavaScript, Lab 9](/assignments/lab09) and [Lab 10](/assignments/lab10).

21. **Project 2 uses a React development server locally. In production, `Dockerfile.prod` builds the React app and copies its output into the image that runs FastAPI. Explain how the deployed app serves the page.**

    <!-- .list-spaced -->

    - What is a bundler? Use Vite as an example to explain what happens to your JavaScript files and imports when you build the app.
    - What does the React build produce? Which server sends those files to the browser in production?
    - Where does the React code run after the page loads? Which service handles API requests? Where does PostgreSQL run?

    Review these concepts in [Project 2 Cloud Deployment](/assignments/project02-11-railway).

22. **Your app works locally. On Railway, the page loads, but its browser code still tries to fetch `http://localhost:8000/api/todos`. In the production build, Project 2 uses `/api/todos` instead. Explain why that works.**

    <!-- .list-spaced -->

    - When someone visits your deployed app, what machine does `localhost` refer to from their browser?
    - Where does the browser send a request to `/api/todos`? Why can the same server handle that request and serve the app’s page?

    Review these concepts in [Project 2 Cloud Deployment](/assignments/project02-11-railway).

23. **Your deployed Project 2 page loads, but loading and saving todos fails. The web service reads `DATABASE_URL` from its environment. Explain how you would check the deployment.**

    <!-- .list-spaced -->

    - Why can the page load even when the app cannot reach PostgreSQL?
    - What should `DATABASE_URL` point to in production? Why put it in the service’s environment instead of committing it to GitHub?
    - After making a fix, what would you do in the deployed app to check that it can read and save data?

    Review these concepts in [Project 2 Cloud Deployment](/assignments/project02-11-railway).

24. **In Project 2, you used Docker to set up your local development environment and deploy your application to Railway. Reflect on how Docker and environment variables make it easier to build, run, and deploy software in different environments.**

    <!-- .list-spaced -->

    - If you were setting up your application on a new server without Docker, what software would you need to install and configure manually?
    - How does Docker allow you to automate and reproduce this setup? What information in your project makes this possible?
    - Although Docker helps you reproduce your software environment, some configuration needs to change when you deploy. Explain how `DATABASE_URL` allows your application to connect to different databases without changing your back-end code.

    Review these concepts in [Project 2 Cloud Deployment](/assignments/project02-11-railway).

## Answer key

<details>
<summary>Show sample answers</summary>

Use these points to check your reasoning. A different approach can earn full credit if it addresses the scenario and explains why it works.

1. **Command line.** **Why:** An exact command is easy to share, repeat, or put in a script. **How:** `grep -r 'TODO' .` searches files recursively from the current directory. A teammate can run the same command from their checkout’s root.
2. **Git and GitHub.** Start an issue branch from the latest `main` so the pull request stays focused on the room change. Store an optional room number in `Course`, with a default that lets existing courses omit it, and put the “Room TBD” fallback where the app formats the search results. Show that a course with room `204` displays `204` and a course without a room displays “Room TBD.” If both show the fallback, inspect the `Course` object for the known-room case. If the value is missing there, check where the model is populated. If it is present, check how the results read or format it. Pull the latest `main`, rebase the issue branch onto it, and resolve any conflicts. Update the remote branch with `git push --force-with-lease` if rebasing rewrote commits already pushed. Rerun the room checks and confirm the pull request checks and review requirements are satisfied before merging.
3. **Docker and Compose.** The browser loads the React code from the front-end dev server. React runs in the browser and sends an HTTP request to FastAPI when the user searches. FastAPI queries PostgreSQL and sends the results back to the browser. Compose puts the services on a shared network so the back end can reach the database by its service name. The browser reaches the front end and API through ports published on the laptop.
4. **Package managers.** **Why:** The lock file records exact resolved versions, including transitive dependencies. **How:** For npm, commit `package.json` and `package-lock.json` and install with `npm ci`. For Poetry, commit `pyproject.toml` and `poetry.lock` and install with `poetry install`.
5. **Quality and CI.** **Why:** A test can catch a changed return value for a known input, and a linter can catch something like an undefined name. Pull-request checks surface both before merge. **How:** Write a test that supplies a representative input and asserts the behavior that should stay the same. Run the workflow on pull requests. Investigate the failure and get the check passing before merging.
6. **GET routes and query parameters.** One request is `GET /courses?title=programming&instructor=Walter`. The path is `/courses`. The query parameters are `title` and `instructor`. FastAPI reads the values into optional route parameters. Query PostgreSQL using only the supplied filters. When both are present, keep courses that match both. Return the matching courses. GET fits because the search retrieves information without changing course records.
7. **SQL and ORMs.** Both examples find films rated PG. The ORM turns the Python query into SQL and turns the results into `Film` objects. Python can then read a title with `film.title`. Developers use an ORM so they can work with familiar Python objects and let the ORM handle routine database operations. Reading the SQL can help them see what the database is being asked to do when a query is slow or gives unexpected results.

8. **Concurrency.** **Why:** Independent I/O waits can overlap. If the second request needs a value returned by the first, it must wait for that value. **How:** Sequentially, the two-second request finishes first and both results take about three seconds. If both start together, the one-second request likely finishes first and both results are ready after about two seconds.
9. **React.** Store the like count in state, starting at zero, so React can update what appears on screen when it changes. When the user clicks Like, the click handler uses the state setter to increase the count by one. React renders the component again with the new count.
10. **External data.** **Why:** The rendered list comes from React state. Saving to PostgreSQL changes the database, while the browser still holds its previous list. **How:** Submit the form to the API and check that the request succeeds. Then fetch and store the latest list, or add the returned saved item to state. If saving fails, keep the existing list and show an error so the user can retry.
11. **Git history.** A fast-forward moves the branch pointer to an existing descendant commit. After divergence, a merge can create a commit linking both histories. A rebase replays commits onto a new base, giving the replayed commits new IDs. Rebasing a shared branch can disrupt teammates who already pulled it.
12. **Database joins.** A join combines rows according to a matching condition. Here `classes.location_id` references `locations.location_id`.

    ```sql
    SELECT c.name AS class_name, l.name AS location_name
    FROM classes AS c
    JOIN locations AS l ON c.location_id = l.location_id;
    ```

13. **Ports, processes, and services.** A process is a running program. A service is a capability that one or more processes provide to clients. A listening process waits for requests at a network endpoint and responds as requests arrive. The browser is the API’s client, and the API is PostgreSQL’s client when it queries the database. The server address identifies the machine, and the port directs the connection to the process listening there. In this example, the browser connects to the API on port 8000, and the API connects to PostgreSQL on port 5432.
14. **GET and POST.** Use `GET /classes` to read the collection. Use `POST /classes` with a JSON body containing the name to create a class.
15. **PATCH and PUT.** Use `PATCH /classes/42` with the location field to change only that field. Use `PUT /classes/42` with the complete class representation to replace it.
16. **DELETE.** Use `DELETE /classes/42`. `204 No Content` tells the client the deletion succeeded and there is no response body to parse.
17. **Status codes.** For `201 Created`, confirm the save and update the list. For `500 Internal Server Error`, explain that the app could not confirm the save, keep the entered values, and avoid showing the class as saved. For `404 Not Found`, explain that the requested class could not be found and offer a link back to the class list.
18. **Asynchronous fetch.** Waiting for the network can overlap with rendering and handling input. In an async handler, await `fetch(url)`, check `response.ok`, then await `response.json()` and pass the data to the state setter. Show an error if the request fails, the response status indicates failure, or the body cannot be parsed.
19. **Functional transformation and immutability.** The argument is a function called `renderPerson`. `map` calls it once for each person, passing that person to the function. It returns a new array containing the list items for Maya and Luis in order. When updating React state, creating a new array preserves the previous state and gives React a new value to detect and render. Changing the existing array and passing it back can leave the display unchanged because React sees the same array reference.
20. **Side effects.** Logging and sending data to an API both affect something outside the function’s return value. Returning `price * 1.1` only calculates a result. Separating the calculation makes it easy to test and reuse without repeating the logging or network request.
21. **Production image.** A bundler follows imports and packages the app’s code and dependencies into files the browser can load. Vite handles this during the production build, which produces static HTML, CSS, and JavaScript. FastAPI serves those files from the production app container and handles API requests. The React code runs in the browser after the files load. PostgreSQL runs as a separate Railway service.
22. **Production API requests.** In a visitor’s browser, `localhost` means the visitor’s own machine. A request to `/api/todos` goes to the same origin as the page, using its scheme, host, and port. FastAPI serves the page and handles API requests on that origin.
23. **Database configuration.** FastAPI can serve the built page without querying PostgreSQL. Check the failing API request and the server logs. Verify that the web service’s `DATABASE_URL` points to the Railway PostgreSQL service and is set as an environment variable. The URL includes credentials, so keep it out of GitHub. After the fix, create a todo on the public site and reload the page to see that the saved todo can be read back.
24. **Docker and environment variables.** A manual setup would require Python and the back-end dependencies, Node.js and the front-end dependencies where the React app is built, and access to a configured PostgreSQL database. You would also need to build the front end and configure the server to start FastAPI. The Dockerfiles record the base images, dependency installation, build steps, and startup command. Dependency manifests and lock files describe what to install, and Compose describes how the local services run together. The back end reads `DATABASE_URL` from its environment, so you can supply a connection string for the local PostgreSQL service in development and for the Railway database in production without editing the back-end code.

</details>
