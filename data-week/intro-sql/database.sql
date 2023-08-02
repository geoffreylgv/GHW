DROP DATABASE IF EXISTS Bookstore;
CREATE DATABASE Bookstore;

USE Bookstore;
CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100),
    nationality VARCHAR(70)
);

CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author_id INT,
    publication_year INT DEFAULT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);


SELECT * FROM books
WHERE publication_year > 1900
AND title LIKE '%so%'
AND author_id=32

Select books.title, authors.author_name, authors.nationality
FROM books
JOIN authors ON books.author_id = authors.author_id
