CREATE TABLE books(
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author_id INT,
    genre VARCHAR(50),
    publication_year INT
);

CREATE TABLE authors(
    author_id INT PRIMARY KEY,
    author_name VARCHAR(100),
    nationality VARCHAR(70)
);

INSERT INTO authors (author_id, author_name, nationality)
VALUES
(3, "NanoTubular", "Alaska"),
(4, "MaihunGian", "Indian"),
(5, "Evoskull", "India"),
(6, "Xxspicy_tacoxx", "Mexican"),
(7, "Rajdeeptechky", "India")

INSERT INTO books(book_id,title,author_id,genre,publication_year)
VALUES
(1, "Introduction to Sql", 1, "programming", 2023),
(2, "Introduction to Java", 3, "Drama", 2005),
(3, "Machine learning principals", 4, "data", 2020),
(4, "Github", 7, "software", 2012),
(5, "Where to find the best TACOS in Tijuana", 6,"Food", 2012),
(6, "How to die from spicy food? I have the answer", 5,"Food", 2022)

SELECT * FROM authors;
select * FROM books;



