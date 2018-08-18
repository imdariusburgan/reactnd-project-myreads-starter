import React, { Component } from "react";
import Book from "./Book";

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
