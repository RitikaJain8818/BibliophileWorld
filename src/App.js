import React, { Component, Fragment } from "react";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import Search from "./components/books/Search";
import Books from "./components/books/Books";
import Alert from "./components/layout/Alert";
import Dropdown from "./components/layout/Dropdown";
import axios from "axios";
import './App.scss';

export class App extends Component {
  state = {
    books: [],
    loading: false,
    alert: null,
    filter: 'partial',
    text:'',
    sort:'newest',
    lang:'en'
  };
  items = [
    {
      id: 1,
      value: 'Results With Full Name',
      filVal: 'full'
    },
    {
      id: 2,
      value: 'Free eBooks',
      filVal: 'free-ebooks'
    },
    {
      id: 3,
      value: 'Paid eBooks',
      filVal: 'paid-ebooks'
    },
    {
      id: 4,
      value: 'eBooks',
      filVal: 'ebooks'
    },
  ];
  searchBooks = async text => {
    this.setState({ loading: true });
     const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}&filter=${this.state.filter}&orderBy=${this.state.sort}&langRestrict=${this.state.lang}&startIndex=0&maxResults=40`      
        );
      this.setState({ books: res.data.items, loading: false });
    
  };
  setAlert = (msg, type)=> {
    this.setState({ alert: {msg, type} });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3600);
  };

  clearBooks = () => {
    this.setState({books: [], loading: false})
  }
  setFilter = (filter) => {
    this.setState({filter: filter})
    if(this.state.text!=='')
      this.searchBooks(this.state.text);
  }
  setText = value => {
    this.setState({ text: value });
    console.log(this.state.text);
  };
  setSort = (e) => {
    this.setState({ sort: e.target.value});
    if(this.state.text!=='')
      this.searchBooks(this.state.text);
};
setLang = (e) => {
  this.setState({ lang: e.target.value});
  if(this.state.text!=='')
    this.searchBooks(this.state.text);
}

  render() {
    const { books, loading, alert, filter, sort, lang } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchBooks={this.searchBooks}
                      books={books}
                      setText={this.setText}
                      setAlert={this.setAlert}
                      clearBooks = {this.clearBooks}
                      setSort={this.setSort}
                      sort={sort}
                      lang={lang}
                      setLang={this.setLang}
                    />
                    <Dropdown className="p-4" title="Select Type" items={this.items} multiSelect filter books setFilter={this.setFilter}/>

                    <Books books={books} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              {/* Route to NotFound here */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;