---
title: Databases
group: Databases
group_order: 5
order: 1
---

 
## Database Readings & References

### PostgreSQL Reference
* <a href="https://www.postgresql.org/about/" target="_blank">About PostgreSQL</a>
* <a href="https://www.postgresqltutorial.com/psql-commands/" target="_blank">psql commands</a> (command line)
* <a href="https://www.postgresql.org/docs/current/tutorial-select.html" target="_blank">Querying a Table</a>
* <a href="https://www.postgresql.org/docs/current/tutorial-join.html" target="_blank">Joins Between Tables</a>
* <a href="https://www.postgresql.org/docs/current/tutorial-agg.html" target="_blank">Aggregate Functions</a>
* <a href="https://www.postgresql.org/docs/current/tutorial-populate.html" target="_blank">Inserts</a>
* <a href="https://www.postgresql.org/docs/current/tutorial-update.html" target="_blank">Updates</a>
* <a href="https://www.postgresql.org/docs/current/tutorial-delete.html" target="_blank">Deletions</a>
{:.compact}

### SQLAlchemy Reference

* [Documentation](https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html)

## SQL Cheatsheet
Examples use the `dvdrental` database from Lab 8.

| Task | Example | Learn more |
|--|--|--|
| Select columns | `SELECT title, release_year FROM film;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-select/" target="_blank">Select</a> |
| Filter rows | `SELECT * FROM customer WHERE last_name LIKE 'S%';` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/" target="_blank">Where</a>, <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-like/" target="_blank">Like</a> |
| Sort rows | `SELECT title FROM film ORDER BY rental_duration DESC, title;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-order-by/" target="_blank">Order By</a> |
| Limit rows | `SELECT title FROM film LIMIT 5;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-limit/" target="_blank">Limit</a> |
| Join tables | `SELECT f.title, c.name FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/" target="_blank">Inner Join</a>, <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alias/" target="_blank">Aliases</a> |
| Count / group | `SELECT rating, COUNT(*) FROM film GROUP BY rating;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-group-by/" target="_blank">Group By</a>, <a href="https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/" target="_blank">Count</a> |
| Insert a row | `INSERT INTO category (name) VALUES ('Mystery');` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert/" target="_blank">Insert</a> |
| Update rows | `UPDATE film SET rental_rate = rental_rate * 1.1 WHERE film_id = 1;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-update/" target="_blank">Update</a> |
| Delete rows | `DELETE FROM rental WHERE rental_id = 1;` | <a href="https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-delete/" target="_blank">Delete</a> |

## SQLAlchemy (Async) Cheatsheet
Every call that talks to the database needs `await`. See `orm_samples.py` in Lab 8 for working examples.

| SQL idea | SQLAlchemy | Learn more |
|--|--|--|
| Select columns | `result = await session.execute(select(Film.title, Film.release_year))` then `for title, year in result:` | <a href="https://docs.sqlalchemy.org/en/20/orm/quickstart.html#simple-select" target="_blank">Simple select</a> |
| Filter rows | `select(Customer).where(Customer.last_name.istartswith("s"))` | <a href="https://docs.sqlalchemy.org/en/20/core/sqlelement.html#sqlalchemy.sql.expression.ColumnElement.istartswith" target="_blank">istartswith</a> |
| Sort rows | `.order_by(desc(Film.rental_duration), Film.title)` | <a href="https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#order-by" target="_blank">Order by</a> |
| Join tables | `select(Film.title, Category.name).join(FilmCategory, ...).join(Category, ...)` | <a href="https://docs.sqlalchemy.org/en/20/orm/quickstart.html#select-with-join" target="_blank">Select with join</a> |
| Count rows | `result = await session.execute(select(func.count(Film.film_id)))` then `result.scalar()` | <a href="https://docs.sqlalchemy.org/en/20/tutorial/data_select.html#aggregate-functions-with-group-by-having" target="_blank">Aggregate functions</a> |
| Insert a row | `session.add(obj)`, then `await session.commit()`, then `await session.refresh(obj)` to read generated ids | <a href="https://docs.sqlalchemy.org/en/20/orm/session_basics.html#adding-new-or-existing-items" target="_blank">Adding items</a> |
| Get by primary key | `obj = await session.get(Customer, customer_id)` (returns `None` if not found) | <a href="https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session.get" target="_blank">Session.get</a> |
| Update a row | `obj.email = "new@example.com"`, then `await session.commit()` | <a href="https://docs.sqlalchemy.org/en/20/tutorial/orm_data_manipulation.html#updating-orm-objects-using-the-unit-of-work-pattern" target="_blank">Updating objects</a> |
| Delete a row | `await session.delete(obj)`, then `await session.commit()` | <a href="https://docs.sqlalchemy.org/en/20/tutorial/orm_data_manipulation.html#deleting-orm-objects-using-the-unit-of-work-pattern" target="_blank">Deleting objects</a> |
| See the SQL | `print(query.compile(compile_kwargs={"literal_binds": True}))` | |


### PostgreSQL Administrative Commands
To enter the postgreSQL shell, type: `psql -U postgres` (connecting as the postgres superuser). Once you're in the psql shell, try using the following commands:

{:.admin}
| Command | Explanation | Example |
|--|--|--|
| `\q` | Exits the psql shell | |
| `\l` | Lists all the available databases | |
| `\c <dbname> <username>` | Connect to specific database | `\c photo_app_tutorial postgres` |
| `\dt` | Lists all of the tables in the database you're connected to |
| `\d <table_name>` | Describes the structure (i.e., "schema") of a table | `\d posts` |
| `\du` | List all users and their roles | |
| space bar | If you query data in a table that has multiple pages, the space bar will show you the next set of records.  | |
| q | If you query data in a table that has multiple pages, and you want to go back to the psql prompt. | |
