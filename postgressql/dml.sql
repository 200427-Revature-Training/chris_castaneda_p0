/*DML FILE*/

--Author Table	
INSERT INTO authors (first_name, last_name, email) VALUES 
	('Peter', 'Parker', 'mjlover69@sonypictures.com'),
	('Batman', 'Beyond', 'im-the-batman@detectivecomicscomics.com'), 
	('Wade', 'Wilson', 'xforce_alumni@deadpool.edu'),
	('Billy', 'Batson', 'dope.superhero@theshazamster.com'),
	('Pepper', 'Potts', 'iloveyou3000@avengers.co'),
	('Abby', 'Adams', 'abby.adams@gmail.com');
--DROP TABLE authors;


--Post Table
INSERT INTO posts (title, body, publish_date, authors_id) VALUES 
	('Peters Article', 'Body Here', '2020-01-01'::DATE, 1),
	('Batmans Article', 'Body Here', '2020-02-01'::DATE, 2), 
	('Wades Article', 'Body Here', '2020-03-01'::DATE, 3),
	('Billys Article', 'Body Here', '2020-04-01'::DATE, 4),
	('Peppers Article', 'Body Here', '2020-05-01'::DATE, 5),
	('Abbys Article', 'Body Here', '2020-06-01'::DATE, 6);
	
INSERT INTO posts (title, body, publish_date, authors_id) VALUES 
	('Peters Second Article', 'Body Here', '2020-01-02'::DATE, 1);
	

--Comments Table
INSERT INTO commenting (comment_body, publish_date, authors_id, post_id) VALUES 
	('Peters Comments Here', '2020-01-01'::DATE, 1, 1),
	('Batmans Comments Here', '2020-02-01'::DATE, 2, 2), 
	('Wades Comments Here', '2020-03-01'::DATE, 3, 3),
	('Billys Comments Here', '2020-04-01'::DATE, 4, 4),
	('Peppers Comments Here', '2020-05-01'::DATE, 5, 5),
	('Abbys Comments Here', '2020-06-01'::DATE, 6, 6);



