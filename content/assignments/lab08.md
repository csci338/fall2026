---
title: Database + ORM Lab
type: lab
num: 8
draft: 0
assigned_date: 2026-10-29
due_date: 2026-11-09
points: 6
---

## 1. Introduction

The goals of this lab are as follows:

1. Set up a docker container with a postgres tutorial
1. Get some basic experience with SQL
1. Get experience interacting with a Postgres database from Python
1. Get experience querying the database via an ORM

### How this lab is organized
Some sections are **practice**, which you can work through on your own or together in class. They help you get oriented, and you don't submit anything for them. The sections marked **Submit** are the ones that make up your lab grade. Look for the cues: the headings of the sections you submit have a blue <span class="badge submit">Required for submission</span> badge, and the practice sections have **yellow boxes**.

| Section | Type | What you do |
|--|--|--|
| 3. SQL Practice | Practice | Explore the database in `psql` |
| 4. SQL Tasks for the Lab | **Submit** | Write 9 SQL queries in `answers_sql.md` |
| 5. SQLAlchemy Practice | Practice | Run and read `orm_samples.py` |
| 6. SQLAlchemy Tasks for the Lab | **Submit** | Implement 7 functions in `answers_orm.py` |

## 2. Setup

### Version Control Stuff
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2026" target="_blank">class-exercises-fall2026</a>. 

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2026` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab08` folder has been created.
* Create a new branch called **lab08-b**: `git checkout -b lab08-b`
* Verify that you're on your new branch: `git branch`


### Build and run your Docker file
Navigate to your `lab08` directory and type:

```bash
docker compose up -d
```

As you may recall, this command builds your Docker container *and* runs it. Keep your terminal running and do the remaining tasks on anther terminal.


## 3. SQL Practice (Not Submitted)
{:.practice}
> **Practice:** work through this section on your own or together in class. You don't submit anything from it. It gets you ready for the SQL tasks in section 4.

{% collapsible closed %}
### 3.1. The DVD Rental Schema
Here is a map of the tables in the `dvdrental` database and how they connect. Each arrow goes from a foreign key (FK) to the primary key (PK) it refers to. Keep it handy while you write your queries, especially for the JOIN questions. (Click the image to open it full size.)

<a href="/images/labs/lab08/dvdrental-schema.svg" target="_blank"><img class="frame" style="width:100%" src="/images/labs/lab08/dvdrental-schema.svg" alt="Schema diagram of the dvdrental database showing the tables country, city, address, store, staff, customer, inventory, rental, payment, film, film_actor, film_category, actor, language, and category, and the foreign keys between them" /></a>


{% collapsible closed %}
### 3.2. Run the Postgres SQL Client

In the new terminal window we'll run `psql` (the postgres SQL
client) on the your running container.

```bash
# get container id:
docker ps -la

# connect to the docker container
docker exec -it <pid> psql -U postgres
```

If you did this correctly, you should see a PostgreSQL shell that looks like this:

```bash
postgres=#
```

Now let's confirm things are working. Try typing in the `\list`
command and confirm you see the `dvdrental` database.

```bash
postgres=# \list
```

If that works, let's change to the `dvdrental` database and run a
simple sql query to list all customer's first names.

```bash
postgres=# \c dvdrental
dvdrental=# select first_name from customer;
```

{% collapsible closed %}
### 3.3. Optional: DBeaver Configuration
For those of you who would like to look at the data in a visual way, feel free to use DBeaver (which you can <a href="https://dbeaver.io/download/" target="_blank">download here</a>). Once downloaded and installed, you can preview the DVD Rental database by using the following connection information for a PostgreSQL connection:

* host: **localhost**
* database: *(leave blank)*
* username: **postgres**
* password: **postgres**
* port: **5434**

Also, make sure that the "Show all databases" option is checked (as pictured in the screenshot below):

<a href="/images/labs/lab08/dbeaver-ss.png" target="_blank"><img class="w-full frame" src="/images/labs/lab08/dbeaver-ss.png" /></a>


{% collapsible closed %}
### 3.4. Get Oriented: Explore the Database
Before writing your own queries, spend a few minutes looking around. For each exercise below, try to write the command yourself in `psql` (while connected to `dvdrental`). Then expand the answer to check your command and compare your output. You don't need to submit anything for this section.

{:.info}
> **Tip:** Commands that start with a backslash (like `\dt`) are `psql` shortcuts. Everything else is SQL and must end with a semicolon (`;`). If the output is long, press the space bar to page through it and `q` to get back to the prompt.

#### Exercise 1. What tables are in this database?

* Hint: `psql` has a backslash shortcut for listing tables. See the <a href="/resources/databases">psql commands</a> if you're not sure.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
\dt
```

{% no-copy %}
```text
             List of relations
 Schema |     Name      | Type  |  Owner
--------+---------------+-------+----------
 public | actor         | table | postgres
 public | address       | table | postgres
 public | category      | table | postgres
 public | city          | table | postgres
 public | country       | table | postgres
 public | customer      | table | postgres
 public | film          | table | postgres
 public | film_actor    | table | postgres
 public | film_category | table | postgres
 public | inventory     | table | postgres
 public | language      | table | postgres
 public | payment       | table | postgres
 public | rental        | table | postgres
 public | staff         | table | postgres
 public | store         | table | postgres
(15 rows)
```

</details>

#### Exercise 2. What columns does the `film` table have, and which one is its primary key?

* Hint: another backslash command describes a table. Press `q` if the output pages.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
\d film
```

{% no-copy %}
```text
      Column      |            Type             | Nullable |                Default
------------------+-----------------------------+----------+---------------------------------------
 film_id          | integer                     | not null | nextval('film_film_id_seq'::regclass)
 title            | character varying(255)      | not null |
 description      | text                        |          |
 release_year     | year                        |          |
 language_id      | smallint                    | not null |
 rental_duration  | smallint                    | not null | 3
 rental_rate      | numeric(4,2)                | not null | 4.99
 length           | smallint                    |          |
 replacement_cost | numeric(5,2)                | not null | 19.99
 rating           | mpaa_rating                 |          | 'G'::mpaa_rating
 last_update      | timestamp without time zone | not null | now()
 ...
```

The real output has a few more columns plus indexes and foreign keys; this is the part you'll use most. Notice that `film_id` is the primary key, and `language_id` is a *foreign key* pointing to the `language` table.

</details>

#### Exercise 3. How many films are there?

* Hint: use the `count(*)` function on the `film` table.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select count(*) from film;
```

{% no-copy %}
```text
 count
-------
  1000
(1 row)
```

</details>

#### Exercise 4. What does the data look like? 

* Select the `film_id`, `title`, `release_year`, `rating`, and `rental_duration` of the first 5 films (by `film_id`).
* Hint: list the column names after `select`, then use `order by` and `limit`.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select film_id, title, release_year, rating, rental_duration from film order by film_id limit 5;
```

{% no-copy %}
```text
 film_id |      title       | release_year | rating | rental_duration
---------+------------------+--------------+--------+-----------------
       1 | Academy Dinosaur |         2006 | PG     |               6
       2 | Ace Goldfinger   |         2006 | G      |               3
       3 | Adaptation Holes |         2006 | NC-17  |               7
       4 | Affair Prejudice |         2006 | G      |               5
       5 | African Egg      |         2006 | G      |               6
(5 rows)
```

</details>

#### Exercise 5. What are the movie categories? You'll need these names later.

* Hint: `select *` returns every column of a table.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select * from category;
```

{% no-copy %}
```text
 category_id |    name     |     last_update
-------------+-------------+---------------------
           1 | Action      | 2006-02-15 09:46:27
           2 | Animation   | 2006-02-15 09:46:27
           3 | Children    | 2006-02-15 09:46:27
           4 | Classics    | 2006-02-15 09:46:27
           5 | Comedy      | 2006-02-15 09:46:27
           6 | Documentary | 2006-02-15 09:46:27
           7 | Drama       | 2006-02-15 09:46:27
           8 | Family      | 2006-02-15 09:46:27
           9 | Foreign     | 2006-02-15 09:46:27
          10 | Games       | 2006-02-15 09:46:27
          11 | Horror      | 2006-02-15 09:46:27
          12 | Music       | 2006-02-15 09:46:27
          13 | New         | 2006-02-15 09:46:27
          14 | Sci-Fi      | 2006-02-15 09:46:27
          15 | Sports      | 2006-02-15 09:46:27
          16 | Travel      | 2006-02-15 09:46:27
(16 rows)
```

</details>

#### Exercise 6.  How are films connected to categories? 

* The `film` and `category` tables don't reference each other directly. Instead, a third "linking" table, `film_category`, pairs a `film_id` with a `category_id`. 
* Look at the first 5 rows of that table.
    * Hint: `limit 5` restricts the output to 5 rows.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select * from film_category limit 5;
```

{% no-copy %}
```text
 film_id | category_id |     last_update
---------+-------------+---------------------
       1 |           6 | 2006-02-15 10:07:09
       2 |          11 | 2006-02-15 10:07:09
       3 |           6 | 2006-02-15 10:07:09
       4 |          11 | 2006-02-15 10:07:09
       5 |           8 | 2006-02-15 10:07:09
(5 rows)
```

Film 1 (*Academy Dinosaur*) is in category 6 (*Documentary*), film 2 (*Ace Goldfinger*) is in category 11 (*Horror*), and so on. You'll use this pattern when you write your first JOIN.

</details>

#### Exercise 7.  What are the possible film ratings? List each rating once.

* Hint: the `distinct` keyword removes duplicate values.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select distinct rating from film;
```

{% no-copy %}
```text
 rating
--------
 G
 PG
 PG-13
 R
 NC-17
(5 rows)
```

Your rows may appear in a different order. Without an `order by`, SQL doesn't guarantee one.

</details>

#### Exercise 8. Which stores exist? You'll need a valid `store_id` when you create a new customer.

* Hint: the `store` table is small, so `select *` works fine.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
select * from store;
```

{% no-copy %}
```text
 store_id | manager_staff_id | address_id |     last_update
----------+------------------+------------+---------------------
        1 |                1 |          1 | 2006-02-15 09:57:12
        2 |                2 |          2 | 2006-02-15 09:57:12
(2 rows)
```

</details>

#### Exercise 9.  What does a `customer` need? 

* Find out which columns are required for a customer record (`not null`) and which tables refer to a customer.
    * Hint: use the same kind of backslash command as in Exercise 2, but for the `customer` table.

<details class="mb-4 expected-output">
<summary>Show the answer</summary>

```sql
\d customer
```

{% no-copy %}
```text
   Column    |            Type             | Nullable |                    Default
-------------+-----------------------------+----------+-----------------------------------------------
 customer_id | integer                     | not null | nextval('customer_customer_id_seq'::regclass)
 store_id    | smallint                    | not null |
 first_name  | character varying(45)       | not null |
 last_name   | character varying(45)       | not null |
 email       | character varying(50)       |          |
 address_id  | smallint                    | not null |
 activebool  | boolean                     | not null | true
 create_date | date                        | not null | 'now'::text::date
 last_update | timestamp without time zone |          | now()
 active      | integer                     |          |
...
Referenced by:
    TABLE "payment" CONSTRAINT "payment_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ...
    TABLE "rental" CONSTRAINT "rental_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ...
```

Two things to notice for later: (1) `address_id` is `not null` with no default, so you'll have to supply a valid one when you insert a customer; and (2) other tables (`rental`, `payment`) refer to existing customers, which is why you can't simply delete most of them.

</details>

<div class="practice">

**Before moving on**

[ ] I can list the tables in the database and describe one of them
[ ] I can write a `select` with `order by` and `limit`
[ ] I know the names of the film categories and which `store_id` values exist

</div>

{:#sql-tasks}
## 4. SQL Tasks for the Lab <span class="badge submit">Required for submission</span>
**Submit:** the answers to this section go in `lab08/answers_sql.md`.

Now that you're all set up, answer the 9 SQL questions below in the "SQL" section of your `lab08/answers_sql.md` file. Each question links to the one technique you need. If you want more examples, see the <a href="/resources/databases" target="_blank">Database cheatsheet</a>.

{:.list-spaced}
1. **SELECT - Retrieving Data.** Write a query to list the titles and release years of all movies in the film table.<br>
   *Learn:* [Select](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-select/)
2. **WHERE - Filtering Data.** Write a query to find all customers whose last name starts with a capital 'S'.<br>
   *Learn:* [Where](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/), [Like](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-like/)
3. **ORDER BY - Sorting Results.** List all film titles and their rental durations, sorted by rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.<br>
   *Tip:* the film table has 1,000 rows, so add `limit 20` while you're testing.<br>
   *Learn:* [Order By](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-order-by/)
4. **JOIN - Combining Tables.** Write a query to list all films along with their categories. Show the film title and category name.<br>
   *Learn:* [Inner Join](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/), [Table Aliases](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alias/)
5. **AGGREGATE FUNCTIONS - Counting and Grouping Rows.** Write a query to count how many films there are for each rating (G, PG, PG-13, R, NC-17). Show the count and the rating.<br>
   *Learn:* [Group By](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-group-by/), [Count](https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/)
6. **JOIN + AGGREGATE FUNCTIONS - Counting Rows.** Write a query to count how many films are in the Action category.<br>
   *Hint:* `film` and `category` are connected through `film_category`, so you'll join all three tables (see the schema above) and filter on the category name.<br>
   *Learn:* [Count](https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/), [Inner Join](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/)
7. **INSERT - Adding Data.** Insert a new customer into the customer table with a `first_name`, `last_name`, `email`, `store_id` (1 or 2), and `address_id` (use 1). Both IDs are required.<br>
   *Learn:* [Insert](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert/)
8. **UPDATE - Modifying Data.** Update the rental rate of *Academy Dinosaur* (`film_id` 1), increasing it by 10%.<br>
   *Hint:* you can compute the new value from the old one, e.g., `set rental_rate = rental_rate * 1.10`. Run a `select` before and after to check your work, and only run the update once.<br>
   *Learn:* [Update](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-update/)
9. **DELETE - Removing Data.** Write a query to delete the rental with `rental_id` 1 from the `rental` table.<br>
   *Note:* any payment for that rental is kept, but its `rental_id` is set to null.<br>
   *Learn:* [Delete](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-delete/)

<div class="info">

**Before moving on**

[ ] `answers_sql.md` has a query for each of the 9 SQL questions
[ ] I ran each query in `psql` and it worked
[ ] For the `update` and `delete` questions, I checked the result with a `select`

</div>

## 5. SQLAlchemy Practice (Not Submitted)
{:.practice}
> **Practice:** work through this section on your own or together in class. You don't submit anything from it. It gets you ready for the SQLAlchemy tasks in section 6.

So far you've typed SQL directly into `psql`. Real applications usually talk to the database from code instead. In this section you'll connect to the same `dvdrental` database from Python using **SQLAlchemy**, an *object-relational mapper* (ORM). An ORM lets you work with rows as Python objects (a row in `film` becomes a `Film` object) and builds the SQL for you.

{% collapsible closed %}
### 5.1. Install and Run the Samples
Open a terminal window (leave your Docker container running), navigate to your `lab08` directory, and install the dependencies listed in `pyproject.toml`:

```bash 
poetry install
```

Then run the samples file from your local terminal:

```bash 
poetry run python orm_samples.py
```

You should see output for ten numbered examples (film titles, a new actor being added and removed, and so on). If you get a connection error, make sure `docker compose up -d` is still running and that you're in the `lab08` directory.

<div class="practice">

**Before moving on**

[ ] `poetry install` finished without errors
[ ] `poetry run python orm_samples.py` ran and printed the ten numbered examples

</div>

{% collapsible closed %}
### 5.2. How `orm_samples.py` Works
Before writing your own code, read through `orm_samples.py` alongside the notes below. Every task in section 6 is a small variation on one of these examples. The `models/` folder defines one Python class per table (`Film`, `Customer`, `Category`, ...) and each class attribute is a column (`Film.title`, `Customer.email`, ...).

#### The basic pattern: build a query, then execute it

```python
result = await session.execute(
    select(Film.title, Film.rental_rate)
    .limit(5)
)
for title, rate in result:
    print(f"  {title}: ${rate}")
```

* `select(...)` *describes* the query. It doesn't touch the database yet. The chained methods (`.where()`, `.order_by()`, `.join()`, `.limit()`) correspond to the SQL clauses of the same name.
* `session.execute(...)` sends the query to Postgres and gives you back a `result`.
* Looping over `result` gives you one row at a time. Each row unpacks into the columns you selected, in order.

The SQL that SQLAlchemy sends for this is `select title, rental_rate from film limit 5;`.

#### Why everything is `await`ed
This lab uses SQLAlchemy's *asynchronous* mode: instead of freezing while it waits for the database, your program is allowed to do other work. Python requires two things from you in exchange:

* Functions that talk to the database are declared `async def`.
* Every call that actually reaches the database has to be `await`ed (`session.execute`, `session.commit`, `session.get`, `session.delete`, `session.refresh`).

Calls that only *build* a query, like `select(...)` and `.where(...)`, are **not** awaited. If you forget an `await`, you'll usually see a warning like `coroutine ... was never awaited`.

#### Getting results in different shapes
How you read the result depends on what you selected:

| You selected... | Example | Read it with... |
|--|--|--|
| Several columns | `select(Film.title, Film.rental_rate)` | `for title, rate in result:` |
| One aggregate value | `select(func.count(Film.film_id))` | `result.scalar()` |
| A whole table object | `select(Customer)` | `result.scalars()` (or `.scalars().all()` for a list), which gives you `Customer` objects with attributes like `c.first_name` |

#### Ordering and counting
`order_by(desc(Film.replacement_cost))` sorts descending (leave off `desc` for ascending, and pass several columns to break ties). `func.count(...)` is how you call SQL's `count()` and other aggregate functions.

#### Joins
```python
select(Film.title, Language.name).join(Language)
```
When two tables are connected by a direct foreign key, as `film.language_id` is to `language`, SQLAlchemy can figure out the `ON` condition for you. When it can't (for example, `film` and `category` are only connected *through* the `film_category` table), you spell out the condition yourself: `.join(FilmCategory, Film.film_id == FilmCategory.film_id)`.

#### Creating, reading, updating, and deleting objects
Changing data works differently from querying it: you work with Python objects, and the *session* keeps track of what you changed.

```python
new_actor = Actor(first_name="Chris", last_name="Pine")
session.add(new_actor)               # stage the new row
await session.commit()               # actually INSERT it
await session.refresh(new_actor)     # re-read it so database-generated values (like actor_id) are filled in

actor = await session.get(Actor, new_actor.actor_id)   # SELECT by primary key (None if it doesn't exist)

actor.first_name = "Christopher"     # just change the attribute...
await session.commit()               # ...and commit to UPDATE

await session.delete(actor)          # stage the delete
await session.commit()               # actually DELETE it
```

Nothing is saved to the database until you `commit()`.

#### Peeking at the generated SQL
`show_sql_for_query(query)` at the bottom of `orm_samples.py` prints the SQL for a query. This is the best way to check that your Python is asking for what you think it is. You can compare it to the SQL you wrote earlier in the lab.

<div class="practice">

**Before moving on**

[ ] I can explain why every database call is `await`ed
[ ] I know when to read results with a `for` loop, `scalar()`, or `scalars()`
[ ] I can describe what `add`, `commit`, and `refresh` each do

</div>

{:#sqlalchemy-tasks}
## 6. SQLAlchemy Tasks for the Lab <span class="badge submit">Required for submission</span>
**Submit:** your code for this section goes in `lab08/answers_orm.py`.

Open `answers_orm.py`. It contains eight `async` functions: the first is finished for you, and you will implement the other seven (they print `TODO` until you fill them in). Each exercise below tells you what to implement and how it relates to the SQL you already wrote. Run the file after each exercise to check your work:

```bash
poetry run python answers_orm.py
```

**Tip:** `main()` at the bottom of the file calls all eight functions in order, so you'll see `TODO` for the ones you haven't done yet. You don't need to change `main()`. If you need more examples, see the <a href="/resources/databases" target="_blank">SQLAlchemy cheatsheet</a>.

### Exercise 1. `print_titles_and_release_years` (done for you)
This function prints the titles and release years of the first 20 films, ordered by title. Read it and compare it to the first example in `orm_samples.py`; it's the pattern you'll reuse in exercises 2 through 4. The SQL equivalent is:

```sql
select title, release_year from film order by title, release_year limit 20;
```

* *Learn:* <a href="https://docs.sqlalchemy.org/en/20/orm/quickstart.html#simple-select" target="_blank">Simple select</a>

<details class="mb-4 expected-output">
<summary>Show the expected output</summary>

{% no-copy %}
```text
=== 1. Titles and Release Years ===
(Already done for you)
Academy Dinosaur (2006)
Ace Goldfinger (2006)
Adaptation Holes (2006)
Affair Prejudice (2006)
African Egg (2006)
...
```

</details>

### Exercise 2. `print_customers_with_last_names_starting_with`
Print the customers whose last name starts with the character passed in as `start_char`, ordered by last name. This is the same idea as your `where ... like 'S%'` query, except you'll select whole `Customer` objects and print their `first_name` and `last_name`.

* Hint: `Customer.last_name.istartswith(start_char)` builds the condition for you, and you pass it to `.where(...)`.
* Hint: since you selected a whole table object, read the rows with `result.scalars()`.
* Note: `istartswith` is case-insensitive, so unlike the SQL version, `'p'` and `'P'` both match last names starting with P.
* *Learn:* <a href="https://docs.sqlalchemy.org/en/20/core/sqlelement.html#sqlalchemy.sql.expression.ColumnElement.istartswith" target="_blank">istartswith</a>

<details class="mb-4 expected-output">
<summary>Show a starting skeleton</summary>

```python
result = await session.execute(
    select(Customer)
    .where(Customer.last_name.istartswith(start_char))
    .order_by(Customer.last_name)
)
for customer in result.scalars():
    print(...)   # e.g., first name and last name
```

</details>

<details class="mb-4 expected-output">
<summary>Show the expected output</summary>

The `'p'` call should list 28 customers; the first few are:

{% no-copy %}
```text
Dan Paine
Megan Palmer
Frances Parker
Wanda Patterson
...
```

</details>

<div class="info">

**Before moving on**

[ ] `print_customers_with_last_names_starting_with` prints customers for both `'A'` and `'p'`
[ ] The customers are ordered by last name

</div>

### Exercise 3. `print_film_titles_and_durations`
Print every film's title and rental duration, sorted by rental duration from longest to shortest. Films with the same duration should be sorted alphabetically by title.

* Hint: `order_by` accepts more than one column. Wrap a column in `desc(...)` to sort it in descending order; `desc` is already imported for you.
* Tip: the film table has 1,000 rows, so add `.limit(20)` while you're testing, then remove it when you're done.
* *Learn:* <a href="https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#order-by" target="_blank">Order by</a>

<details class="mb-4 expected-output">
<summary>Show the expected output</summary>

{% no-copy %}
```text
Adaptation Holes 7
Anonymous Human 7
Argonauts Town 7
Bikini Borrowers 7
Blackout Private 7
...
```

</details>

<div class="info">

**Before moving on**

[ ] The films with the longest rental duration print first, with ties in alphabetical order
[ ] I removed any `.limit(20)` I added for testing

</div>

### Exercise 4. `print_film_titles_and_categories`
Print each film's title along with its category name, ordered by title. In SQL you joined `film`, `film_category`, and `category`. Do the same thing here.

* Hint: `film` and `category` aren't connected directly, so SQLAlchemy can't guess the join for you. Use `select(Film.title, Category.name)` and join `FilmCategory` first, then `Category`, spelling out each condition: `.join(FilmCategory, Film.film_id == FilmCategory.film_id)`. The schema diagram in section 3.1 shows which columns line up.
* Tip: add `.limit(20)` while testing.
* *Learn:* <a href="https://docs.sqlalchemy.org/en/20/orm/quickstart.html#select-with-join" target="_blank">Select with join</a>

<details class="mb-4 expected-output">
<summary>Show the expected output</summary>

{% no-copy %}
```text
Academy Dinosaur Documentary
Ace Goldfinger Horror
Adaptation Holes Documentary
Affair Prejudice Horror
African Egg Family
...
```

</details>

<div class="info">

**Before moving on**

[ ] Each film prints with its category name, ordered by title
[ ] I joined through `FilmCategory`, spelling out each join condition

</div>

### Exercise 5. `print_num_films_in_action_category`
Print how many films are in the Action category. This combines the `count` from the samples with the three-table join from exercise 4, plus a filter.

* Hint: select `func.count(Film.film_id)`, join `FilmCategory` and `Category` as in exercise 4, then `.where(Category.name == "Action")`.
* Hint: a single count comes back as a single value, so read it with `result.scalar()`.
* *Learn:* <a href="https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#aggregate-functions-with-group-by-having" target="_blank">Aggregate functions</a>. Also see "COUNT aggregation" and "JOIN" in `orm_samples.py`.

<details class="mb-4 expected-output">
<summary>Show the expected output</summary>

The count should match what you get from the equivalent SQL query in `psql`.

{% no-copy %}
```text
64
```

</details>

<div class="info">

**Before moving on**

[ ] The function prints the same count I got from my SQL query in section 4
[ ] I read the single count value with `result.scalar()`

</div>

### Exercise 6. `create_new_customer`
Create a new customer from the arguments passed in and **return the new `customer_id`**. This is the ORM version of your `insert` statement.

* Hint: build a `Customer(...)` object with `first_name`, `last_name`, `email`, and `store_id` from the arguments. The function doesn't take an address, so use `address_id=1`, as you did in SQL (the column is `not null`).
* Hint: follow the "CREATE" example in `orm_samples.py`: `session.add(...)`, then `await session.commit()`, then `await session.refresh(...)`. The `customer_id` is generated by the database, so you can only read it from the object *after* the commit and refresh.
* `main()` calls this with "John Doe" and prints the id it returns. Check that it's a number, not `None`.

<details class="mb-4 expected-output">
<summary>Show a starting skeleton</summary>

```python
customer = Customer(first_name=first_name, ..., address_id=1)
session.add(customer)
await session.commit()
await session.refresh(customer)
return customer.customer_id
```

</details>

<div class="info">

**Before moving on**

[ ] `create_new_customer` returns a number (not `None`)
[ ] `main()` prints `Created customer with ID: ...`

</div>

### Exercise 7. `delete_customer_by_id`
Delete the customer whose id is passed in. `main()` passes the id of the customer you just created in exercise 6.

* Hint: follow the "DELETE" example in `orm_samples.py`: fetch the object with `await session.get(Customer, customer_id)`, then `await session.delete(...)` and `await session.commit()`.
* Hint: `session.get` returns `None` if there's no such customer, so check for that before deleting.
* Note: most customers in the database are referenced by other tables (`rental`, `payment`), and Postgres will refuse to delete them. That's why we only delete the customer we created, which nothing refers to yet.

<div class="info">

**Before moving on**

[ ] `delete_customer_by_id` handles a customer that doesn't exist (`session.get` returns `None`)
[ ] In `psql`, a `select` for the deleted id returns 0 rows

</div>

### Exercise 8. `update_customer_email`
Change the email address of the customer with the given id. `main()` updates customer 55 (Doris Reed).

* Hint: follow the "UPDATE" example in `orm_samples.py`: get the customer with `session.get`, assign the new value to `customer.email`, and `await session.commit()`. You never write `update` yourself; the session notices what changed.
* Check your work in `psql`: run `select email from customer where customer_id = 55;` before and after running `answers_orm.py`.
* Note: this changes the data in your local database. That's fine, but if you run `main()` again it will just set the same email again.

<details class="mb-4 expected-output">
<summary>Show the expected result in psql</summary>

{% no-copy %}
```text
 email
--------------------
 walter@example.com
(1 row)
```

Before the update, the email was `doris.reed@sakilacustomer.org`.

</details>

<div class="info">

**Before moving on**

[ ] `select email from customer where customer_id = 55;` shows the new email in `psql`
[ ] `poetry run python answers_orm.py` runs from start to finish with no `TODO` output or errors

</div>

## What to Submit
Only the sections marked <span class="badge submit">Required for submission</span> ([section 4](#sql-tasks) and [section 6](#sqlalchemy-tasks)) are graded. You don't need to submit anything from the practice sections. Before you submit, make sure that:

[ ] `answers_sql.md` has the SQL for all 9 SQL tasks ([section 4](#sql-tasks))
[ ] `answers_orm.py` has the 7 remaining SQLAlchemy functions implemented, with every database call `await`ed ([section 6](#sqlalchemy-tasks))
[ ] `poetry run python answers_orm.py` runs from start to finish with no `TODO` output or errors
[ ] I committed both files and pushed my `lab08-b` branch to GitHub
[ ] I made a pull request from `lab08-b` to `main` in **my repo**: the destination (left-hand side) is the `main` branch of my repo and the source (right-hand side) is my `lab08-b` branch
[ ] I pasted a link to my pull request in Canvas
