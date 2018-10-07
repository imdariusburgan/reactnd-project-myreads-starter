import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./SearchPage";
import BookList from "./BookList";

export default class BooksApp extends React.Component {
  state = {
    Books: []
  };

  // This function will run the getAllBooks function after the DOM renders
  componentDidMount() {
    this.getAllBooks();
  }

  // This function gets all of the books from the API and stores them in the state
  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
    });
  };

  // This function will update the book's shelf
  updateBookInfo = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // On previous versions, I updated the books by re-calling the API after updating it.
      // While it looks instantaneous, it can be slow depending on internet speed.
      // Now, instead of re-calling the server, I'm updating the state manually.
      this.setState(prevState => {
        // This variable will let me know if the book we're updating is currently shown on our shelves. We set this to false as a starting point.
        let bookAlreadyExist = false;

        // This function will map through each book in our state and
        // compare that books's ID with the ID of the book we're updating.
        // If both book ID's match, that means the book is already on one of our shelves.
        // So, we update the shelf of that book and turn our BookAlreadyExist variable to true.
        // We return each book at the end in order to build an array.
        let stateUpdate = prevState.Books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
            bookAlreadyExist = true;
          }
          return b;
        });

        // This function will check if our BookAlreadyExist variable is false.
        // If so, the book we're updating will be updated and pushed to the stateUpdate variable
        // If the variable is set to true, this conditional statement will not run.
        if (!bookAlreadyExist) {
          book.shelf = shelf;
          stateUpdate.push(book);
        }
        // Now, we update the 'Books' state with the array we were buildng via the 'stateUpdate' variable
        return { Books: stateUpdate };
      });
      // this.getAllBooks();
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
