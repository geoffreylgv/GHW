package main

// Data extraction code

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Book struct {
	Title     string `json:"title"`
	Author    string `json:"author"`
	Country   string `json:"country"`
	Language  string `json:"language"`
	Pages     int    `json:"pages"`
	Year      int    `json:"year"`
	ImageLink string `json:"imageLink"`
	Link      string `json:"link"`
}

type Author struct {
	AuthorName  string `json:"author"`
	Nationality string `json:"country"`
}

func main() {
	// Replace the connection parameters with your database credentials
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/Bookstore")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Read JSON data from the URL
	url := "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json"
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Parse JSON data into a slice of Book structs
	var books []Book
	err = json.Unmarshal(data, &books)
	if err != nil {
		log.Fatal(err)
	}

	// Insert data into the authors table and retrieve the generated author IDs
	authorIDs := make(map[string]int)
	for _, book := range books {
		author := Author{AuthorName: book.Author, Nationality: book.Country}
		insertAuthorID, err := insertAuthor(db, author)
		if err != nil {
			log.Fatal(err)
		}
		authorIDs[book.Author] = insertAuthorID
	}

	// Insert data into the books table using the author IDs
	for _, book := range books {
		insertBook(db, book, authorIDs[book.Author])
	}

	fmt.Println("Data insertion completed successfully!")
}

func insertAuthor(db *sql.DB, author Author) (int, error) {
	// Perform the INSERT operation into the authors table
	result, err := db.Exec("INSERT INTO authors (author_name, nationality) VALUES (?, ?)", author.AuthorName, author.Nationality)
	if err != nil {
		return 0, err
	}

	// Get the generated author ID
	insertID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(insertID), nil
}

func insertBook(db *sql.DB, book Book, authorID int) {
	// Perform the INSERT operation into the books table
	_, err := db.Exec("INSERT INTO books (title, author_id, publication_year) VALUES (?, ?, ?)",
		book.Title, authorID, book.Year)
	if err != nil {
		log.Fatal(err)
	}
}
