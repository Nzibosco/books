import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, SaveBtn } from "../components/Form";

class Books extends Component {
  state = {
    btnText: "",
    search: "",
    books: []
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };
  searchBook = query => {
    API.search(query)
      .then(res => this.setState({ books: res.data.map(data => ({...data, saved: false})) }))
      .catch(err => console.log(err));
  };
  saveBook = (bookData) =>{
    API.saveBook(bookData)
    .then(res => 
      //console.log(res);
      // find book in state and change saved to !saved
      {
        console.log(res);
      }

    )
    .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBook(this.state.search);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form >
              <Input name="title" placeholder="Title (required)" value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit} />
              
              {/* <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" /> */}
              {/* <a type = "button" href= {"/search/" + this.state.search }><FormBtn handleFormSubmit = {this.handleFormSubmit}>Search</FormBtn></a> */}
              <FormBtn handleFormSubmit = {this.handleFormSubmit}>Search</FormBtn>
              {/* <a type = "button" href= {"/api/book/" + this.state.search } onClick= {this.handleFormSubmit}>Search</a> */}
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-12">
            {
              this.state.books.map((book, index) => (
                  <ListItem key={book.title}>
                    <a href="nolink">
                      <strong>
                        {book.title}
                      </strong>
                    </a>
                    <p><strong>Authors: </strong>{book.authors.map(author =>(<p><small>{author}</small></p>))}</p>
                    <p><strong>Publisher: </strong>{book.publisher}</p>
                    <p><strong>Description: </strong>{book.description}</p>
                    <button type = "button" name = "saveBtn" value = {index} key = {index} id = {index} onClick = {() => { this.saveBook(this.state.books[index]);}}>{book.saved ? "Saved" : "Save this book"}</button>
                  </ListItem>
                ))
              
                }
          </Col>
          {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Books;
