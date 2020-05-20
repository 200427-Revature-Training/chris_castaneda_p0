/*Views File*/
SELECT * FROM authors;

SELECT title FROM posts;

SELECT publish_date FROM posts;

CREATE  VIEW author_name AS SELECT authors.id, authors.first_name, authors.last_name FROM authors WHERE  authors.id = 1;

DROP VIEW author_name;