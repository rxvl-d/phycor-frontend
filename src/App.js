import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import PageBrowser from './PageBrowser'
import ElementBrowser from './ElementBrowser'

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      current_book: null,
      current_book_page_count: null,
      current_page_element_count: null,
      current_page: null,
      current_element: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/fast_parse/books.json', {mode: 'cors'})
      .then(res => res.json())
      .then(
        (result) => this.setState({books: result.books}),
        (error) => console.log(error));

  }

  createSelectModels() {
    if (this.state.books) {
      return [
        <option key={"fast"}>detectron2/PubLayNet/faster_rcnn_R_50_FPN_3x</option>,
        <option key={"efficient"}>efficientdet/PubLayNet/tf_efficientdet_d1</option>
      ]
    } else {
      return <option>loading books</option>
    }
  }

  createSelectBooks() {
    if (this.state.books) {
      const startOption = <option key={null}>Select book</option>;
      return [startOption].concat(
        this.state.books.map((b) => <option key={b.name} value={b.name}> {b.name} </option>)
      )
    } else {
      return <option>loading books</option>
    }
  }

 onDropdownSelected(e) {
   this.setState({
     current_book: e.target.value,
     current_book_page_count: this.state.books.filter((b) => b.name == e.target.value)[0].page_count,
     current_page: 0,
     current_element: 0})
 }

  render() {
    console.log('rendering browser with ' + this.state.current_book)
    return (
      <div className="OCR Browser">
      <Container>
        <Row>
          <Col>
            <Form.Select label="Select Model">
                 {this.createSelectModels()}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select onChange={(e) => this.onDropdownSelected(e)} label="Select Book">
                 {this.createSelectBooks()}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <PageBrowser
            book={this.state.current_book}
            page_count={this.state.current_book_page_count}
            page={this.state.current_page}
            onNext={() => this.handleNextPage()}
            onPrev={() => this.handlePrevPage()}
            onNum={(i) => this.handleGoToPage(i)}/>
          </Col>

          <Col>
              <ElementBrowser
              book={this.state.current_book}
              element_count={this.state.current_page_element_count}
              page={this.state.current_page}
              element={this.state.current_element}
              onNext={() => this.handleNextElement()}
              onPrev={() => this.handlePrevElement()}
              onNum={(i) => this.handleGoToElement(i)}/>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }


  handlePrevPage() {
    this.handleGoToPage(this.state.current_page - 1)
  }

  handleNextPage() {
    this.handleGoToPage(this.state.current_page + 1)
  }

  handleGoToPage(page_num) {
    this.setState({
      current_page: page_num,
      current_element: 0});
    fetch('http://localhost:5000/fast_parse/book/' +
                encodeURIComponent(this.state.current_book) +
                '/page/' + page_num + '.json',
                {mode: 'cors'}
          ).then(res => res.json())
          .then(
            (result) => {
              console.log('handling async')
              console.log(result)
              this.setState({
              current_page_element_count: result.element_count
            })},
            (error) => console.log(error));
  }

  handlePrevElement() {
    this.handleGoToElement(this.state.current_element - 1)
  }

  handleNextElement() {
    this.handleGoToElement(this.state.current_element + 1)
  }

  handleGoToElement(element_num) {
    this.setState({current_element: element_num})
  }
};

function App() {
  return <Browser/>
};

export default App;
