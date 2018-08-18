import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./SearchPage";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    Books: []
  };

  // This function will get all the books from the API after the DOM renders
  componentDidMount() {
    this.getAllBooks();
  }

  // This function gets all of the books from the API
  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
      console.log(this.state.Books);
    });
  };

  // This function will update the book's shelf
  updateBookInfo = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => {
            return (
              <BookList
                books={this.state.Books}
                onChange={this.updateBookInfo}
              />
            );
          }}
        />
        <Route
          path="/search"
          exact
          render={() => {
            return (
              <SearchPage
                books={this.state.Books}
                onChange={this.updateBookInfo}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default BooksApp;
