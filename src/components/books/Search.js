import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    clearBooks: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!/\S/.test(this.state.text)) {
      this.props.setAlert("Please enter something", "danger");
    } else {
      this.props.searchBooks(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { clearBooks, books } = this.props;
    return (
      <>
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-book" /> Search For A Book
      </h1>
      <p className="lead text-center">Get the details for any book</p>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Book title..."
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Get Book Details
        </button>
      </form>
    </div>

        <div className="form-text">
          You can search using anything related to the book like name, author or
          content
        </div>
        {books && books.length > 0 && (
          <button
            onClick={clearBooks}
            className="btn btn-block btn-dark"
            style={{ marginTop: "2rem" }}
          >
            Clear search results
          </button>
        )}
      </>
    );
  }
}

export default Search;
