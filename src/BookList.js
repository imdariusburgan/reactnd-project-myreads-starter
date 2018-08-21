import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

export default class BookList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={this.props.books.filter(
                book => book.shelf === "currentlyReading"
              )}
              changeShelf={this.props.onChange}
            />
            <BookShelf
              title="Want to Read"
              books={this.props.books.filter(
                book => book.shelf === "wantToRead"
              )}
              changeShelf={this.props.onChange}
            />
            <BookShelf
              title="Read"
              books={this.props.books.filter(book => book.shelf === "read")}
              changeShelf={this.props.onChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
