import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class BookList extends Component {
  render() {
    const bookshelf = [
      { name: "Currently Reading", key: "currentlyReading" },
      { name: "Want to Read", key: "wantToRead" },
      { name: "Read", key: "read" }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <h2>Bookshelves go here!</h2>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
