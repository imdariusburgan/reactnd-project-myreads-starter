import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

export default class BookShelf extends Component {
  updateShelf = (book, shelf) => {
    this.props.changeShelf(book, shelf);
  };

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(book => {
                return (
                  <Book
                    book={book}
                    key={book.id}
                    onShelfUpdate={shelf => {
                      this.updateShelf(book, shelf);
                    }}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};
