import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

export default class SearchPage extends Component {
  state = {
    Books: [],
    SearchQuery: ""
  };

  // This function stores the search input data on every change and updates the state with the current query
  handleInputChange = e => {
    let query = e.target.value;
    this.setState(() => {
      return { SearchQuery: query };
    });
    console.log(`${this.state.SearchQuery}`);
    // Update books based on new input text
  };

  // This function sets the shelf of all of the books searched to match the shelves on the first page
  changeBookshelf = books => {
    let allBooks = this.props.books;

    // Loop through searched books with thumbnails and authors and mark their shelves as none
    for (let searchedBook of books) {
      searchedBook.shelf = "none";
    }

    // Loop through searched books and original books.
    // Compare the ID of the searched book and original book.
    // If the IDs match, set the searched book's shelf to match the original shelf.
    for (let searchedBook of books) {
      for (let originalBook of allBooks) {
        if (originalBook.id === searchedBook) {
          searchedBook.shelf = originalBook.shelf;
        }
      }
    }

    return books;
  };

  searchBooks = query => {
    if (query.length !== 0) {
      BooksAPI.search(query).then(books => {
        if (books.length !== 0) {
          // Still figuring out what to do here

          // Store all books that have thumbnails
          let booksWithThumbnails = books.filter(book => book.imageLinks);

          // Store all books that have thumbnails and authors
          let booksWithAuthorsAndThumbnails = booksWithThumbnails.filter(
            book => book.authors
          );
        }
      });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}
