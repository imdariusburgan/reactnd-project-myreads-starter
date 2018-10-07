import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

export default class SearchPage extends Component {
  state = {
    Books: [],
    SearchQuery: ""
  };

  // This function stores the search input data on every change and updates the state with the current query
  handleInputChange = e => {
    let query = e.target.value;

    // Stores the current search query
    this.setState(() => {
      return { SearchQuery: query };
    });

    // Takes the current search query and searches for books based on that query
    this.searchBooks(query);
  };

  // This function sets the shelf of all of the books searched to match the shelves on the first page
  changeBookshelf = books => {
    // Loop through searched books with thumbnails and authors and mark their shelves as none
    // for (let searchedBook of books) {
    //   searchedBook.shelf = "none";
    // }

    let returnBooks = [];

    books.forEach(searchBook => {
      searchBook.shelf = "none";
      this.props.books.forEach(originalBook => {
        if (searchBook.id === originalBook.id) {
          searchBook.shelf = originalBook.shelf;
        }
      });
      returnBooks.push(searchBook);
    });

    return returnBooks;
  };

  // This function shows books based on a search query ('query' parameter)
  searchBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.length > 0) {
          // Store all books that have thumbnails
          let booksWithThumbnails = books.filter(book => book.imageLinks);

          // Store all books that have thumbnails and authors
          let booksWithAuthorsAndThumbnails = booksWithThumbnails.filter(
            book => book.authors
          );

          // Store all books that have thumbnails, authors, and have the correct shelf that matches the front page
          let booksWithCorrectShelves = this.changeBookshelf(
            booksWithAuthorsAndThumbnails
          );
          this.setState({ Books: booksWithCorrectShelves });
        } else {
          this.setState({ Books: [] });
        }
      });
    }
  };

  // This function takes a book and the desired shelf
  // When used, it will change the shelf of the book
  addBookToShelf = (book, shelf) => {
    this.state.Books.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return null;
    });
    this.props.onChange(book, shelf);
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
              value={this.state.SearchQuery}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.SearchQuery.length > 0 &&
              this.state.Books.map(book => {
                return (
                  <Book
                    book={book}
                    key={book.id}
                    onShelfUpdate={shelf => {
                      this.addBookToShelf(book, shelf);
                    }}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
