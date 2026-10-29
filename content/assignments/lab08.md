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


## 3. SQL Exercises

### Run the Postgres SQL Client

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
### Instructions for Using a GUI Client (e.g., DBeaver)
For those of you who would like to look at the data in a visual way, feel free to use DBeaver (which you can <a href="https://dbeaver.io/download/" target="_blank">download here</a>). Once downloaded and installed, you can preview the DVD Rental database by using the following connection information for a PostgreSQL connection:

* host: **localhost**
* database: **postgres**
* username: **postgres**
* password: **postgres**
* port: **5433**

Also, make sure that the "Show all databases" option is checked (as pictured in the screenshot below):

<img class="medium frame" src="/images/labs/lab08/dbeaver-ss.png" />


### Get Oriented: Explore the Database
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

### The DVD Rental Schema
Here is a map of the tables in the `dvdrental` database and how they connect. Each arrow goes from a foreign key (FK) to the primary key (PK) it refers to. Keep it handy while you write your queries, especially for the JOIN questions. (Click the image to open it full size.)

<a href="/images/labs/lab08/dvdrental-schema.svg" target="_blank"><img class="frame" style="width:100%" src="/images/labs/lab08/dvdrental-schema.svg" alt="Schema diagram of the dvdrental database showing the tables country, city, address, store, staff, customer, inventory, rental, payment, film, film_actor, film_category, actor, language, and category, and the foreign keys between them" /></a>

### Tutorial

Now that you're all set up, answer the 9 SQL questions below in the "SQL" section of your `lab08/answers_sql.md` file. Each question links to the one technique you need. If you want more examples, see the <a href="/resources/databases" target="_blank">Database cheatsheet</a>.

{:.info .list-spaced}
> ### SQL Questions
> 1. **SELECT - Retrieving Data.** Write a query to list the titles and release years of all movies in the film table.<br>
>    *Learn:* [Select](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-select/)
> 2. **WHERE - Filtering Data.** Write a query to find all customers whose last name starts with a capital 'S'.<br>
>    *Learn:* [Where](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/), [Like](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-like/)
> 3. **ORDER BY - Sorting Results.** List all film titles and their rental durations, sorted by rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.<br>
>    *Tip:* the film table has 1,000 rows, so add `limit 20` while you're testing.<br>
>    *Learn:* [Order By](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-order-by/)
> 4. **JOIN - Combining Tables.** Write a query to list all films along with their categories. Show the film title and category name.<br>
>    *Learn:* [Inner Join](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/), [Table Aliases](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alias/)
> 5. **AGGREGATE FUNCTIONS - Counting and Grouping Rows.** Write a query to count how many films there are for each rating (G, PG, PG-13, R, NC-17). Show the count and the rating.<br>
>    *Learn:* [Group By](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-group-by/), [Count](https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/)
> 6. **JOIN + AGGREGATE FUNCTIONS - Counting Rows.** Write a query to count how many films are in the Action category.<br>
>    *Hint:* `film` and `category` are connected through `film_category`, so you'll join all three tables (see the schema above) and filter on the category name.<br>
>    *Learn:* [Count](https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/), [Inner Join](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/)
> 7. **INSERT - Adding Data.** Insert a new customer into the customer table with a `first_name`, `last_name`, `email`, `store_id` (1 or 2), and `address_id` (use 1). Both IDs are required.<br>
>    *Learn:* [Insert](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert/)
> 8. **UPDATE - Modifying Data.** Update the rental rate of *Academy Dinosaur* (`film_id` 1), increasing it by 10%.<br>
>    *Hint:* you can compute the new value from the old one, e.g., `set rental_rate = rental_rate * 1.10`. Run a `select` before and after to check your work, and only run the update once.<br>
>    *Learn:* [Update](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-update/)
> 9. **DELETE - Removing Data.** Write a query to delete the rental with `rental_id` 1 from the `rental` table.<br>
>    *Note:* any payment for that rental is kept, but its `rental_id` is set to null.<br>
>    *Learn:* [Delete](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-delete/)

## 4. SQLAlchemy / Python Exercises
Now, you're going to try connecting to your postgres database using python on your local computer.

Open a terminal window, navigate to your `lab08` directory, and install the dependencies in the `pyproject.toml` file:

```bash 
poetry install
```

You should now be able to run the `orm_samples.py` file as usual from your local terminal:

```bash 
poetry run python orm_samples.py
```

Take a look at `orm_samples.py` and try to understand what it does. Its code samples are very similar to the tasks below. Note that every database call is `await`ed (the queries are *asynchronous*). If you get stuck, see the <a href="/resources/databases" target="_blank">SQLAlchemy cheatsheet</a>.

{:.info .list-spaced}
> ### SQLAlchemy Questions
> You will be implementing some python functions in `answers_orm.py`. Before you begin, run it to see what it does:<br><br>
> `poetry run python answers_orm.py`<br><br>
> Note that the first exercise has already been completed for you.
> 1. **`print_titles_and_release_years`** (done for you) Print the titles and release years of the films in the film table.<br>
>    *Learn:* [Simple select](https://docs.sqlalchemy.org/en/20/orm/quickstart.html#simple-select)
> 2. **`print_customers_with_last_names_starting_with`** Print all customers whose last name starts with the character passed into the function.<br>
>    *Note:* `istartswith` is case-insensitive, so unlike the SQL version, `"s"` and `"S"` both match last names starting with S.<br>
>    *Learn:* [istartswith](https://docs.sqlalchemy.org/en/20/core/sqlelement.html#sqlalchemy.sql.expression.ColumnElement.istartswith)
> 3. **`print_film_titles_and_durations`** Print all film titles and their rental durations, sorted by rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.<br>
>    *Tip:* the film table has 1,000 rows, so add `.limit(20)` while you're testing.<br>
>    *Learn:* [Order by](https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#order-by)
> 4. **`print_film_titles_and_categories`** Print all films along with their categories. Show the film title and category name.<br>
>    *Learn:* [Select with join](https://docs.sqlalchemy.org/en/20/orm/quickstart.html#select-with-join)
> 5. **`print_num_films_in_action_category`** Print the number of films in the Action category.<br>
>    *Hint:* `Film` and `Category` are connected through `FilmCategory`, so you'll join all three tables and filter on the category name.<br>
>    *Learn:* [Aggregate functions](https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#aggregate-functions-with-group-by-having). Also see "COUNT aggregation" and "JOIN" in `orm_samples.py`.
> 6. **`create_new_customer`** Create a new customer in the customer table (first name, last name, email, an existing store, and `address_id` 1) and return its `customer_id`.<br>
>    *Learn:* "CREATE" in `orm_samples.py` (`session.add`, `commit`, `refresh`)
> 7. **`delete_customer_by_id`** Delete the customer with the given `customer_id`.<br>
>    *Learn:* "DELETE" in `orm_samples.py` (`session.get`, `session.delete`, `commit`)<br>
>    *Note:* many customers are referenced by other tables (e.g., address, store), so test with the customer you created in the previous exercise, which has no dependencies yet.
> 8. **`update_customer_email`** Update a customer's email. Required arguments are the customer's id and the new email address.<br>
>    *Note:* the customer you created earlier was deleted in the previous exercise, so test with an existing customer (e.g., `customer_id` 1) or create a new one first.<br>
>    *Learn:* "UPDATE" in `orm_samples.py`

## What to Submit
Before you submit, make sure you've completed the two sets of tasks:

* SQL tasks: you have written the SQL for the 9 SQL tasks in `answers_sql.md`
* SQLAlchemy tasks: you have written and run the 8 SQLAlchemy-based functions (remember to `await` each database call) in `answers_orm.py`.
{:.checkbox-list}

When you're done, please push your `lab08-b` branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab08-b` branch of **your repo**. Then, please paste a link to your PR in the Canvas.
