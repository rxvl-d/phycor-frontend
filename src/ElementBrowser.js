import Pagination from 'react-bootstrap/Pagination'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

class ElementBrowser extends React.Component {

  render() {
    console.log('rendering element at page ' + this.props.book + ' ' + this.props.page + ' ' + this.props.element)
    if (this.props.book == null) {
      return 'select a page'
    }
    return (
      <div className="element-list">
      Elements of {this.props.book}, page {this.props.page}
      <Container>
      <Row>
      <Pagination>
        <Pagination.First onClick={() => this.props.onNum(0)}  />
        <Pagination.Prev onClick={() => this.props.onPrev()} />
        <Pagination.Item active>{this.props.element}</Pagination.Item>
        <Pagination.Next onClick={() => this.props.onNext()}/>
        <Pagination.Last onClick={() => this.props.onNum(this.props.element_count-1)}/>
      </Pagination>
      </Row>
      <Row>
        <img src={'http://localhost:5000/' + this.props.model + '/book/' +
                  encodeURIComponent(this.props.book) +
                  '/page/' + this.props.page + '/element/' + this.props.element + '.jpg'}/>
      </Row>
      <Row>
      <p>{this.props.text}</p>
      </Row>
      </Container>
      </div>
    );
  }
}

export default ElementBrowser;
