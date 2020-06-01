import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearBooks: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
    sort:PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    setLang: PropTypes.func.isRequired
  };
  onChange=e=>{
    this.setState({text:e.target.value});
    this.props.setText(this.state.text);
  }
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
      <p className="lead text-center text-white bg-dark">Get the details for any book</p>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="William Shakespeare Invisible Man Harry Potter"
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>
        <select value={this.props.sort} onChange={this.props.setSort}>
                <option value="" disabled selected>Sort</option>
                <option value="Newest">Newest</option>
                <option value="Relevance">Relevance</option>
        </select>
        <select value={this.props.lang} onChange={this.props.setLang}>
                <option value="" disabled selected>Select Language</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
                <option value="ja">Japanese</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
        </select>
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Get Book Details
        </button>
      </form>
    </div>

        <div className="card card-body mb-4 p-4 bg-dark">
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
