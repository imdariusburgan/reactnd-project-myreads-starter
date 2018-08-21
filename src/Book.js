import React, { Component } from "react";

export default class Book extends Component {
  // This function passes a shelf to the onShelfUpdate props function
  switchShelf = e => {
    this.props.onShelfUpdate(e.target.value);
  };

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  this.props.book.imageLinks.thumbnail
                }")`
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={this.switchShelf} value={this.props.book.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    );
  }
}
