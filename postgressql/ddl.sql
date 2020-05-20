/*DDL File*/
CREATE TABLE authors (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100)
);

CREATE TABLE posts (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(40),
	body VARCHAR(1000),
	publish_date DATE,
	authors_id INTEGER REFERENCES authors (id)
);

CREATE TABLE commenting (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	comment_body VARCHAR(1200),
	publish_date DATE,
	post_id INTEGER REFERENCES posts(id)
	authors_id INTEGER REFERENCES authors(id)
);


DROP TABLE authors;
DROP TABLE posts;
DROP TABLE commenting;
--DELETE FROM authors WHERE id = 6;