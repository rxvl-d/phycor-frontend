import Pagination from 'react-bootstrap/Pagination'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PageBrowser extends React.Component {

  render() {
    console.log('rendering book at page ' + this.props.book + ' ' + this.props.page)
    if (this.props.book == null) {
      return 'Select a book first'
    }
    return (
      <div className="page-list">
      Pages of {this.props.book}
      <Container>
      <Row>
      <Pagination>
        <Pagination.First onClick={() => this.props.onNum(0)}  />
        <Pagination.Prev onClick={() => this.props.onPrev()} />
        <Pagination.Item active>{this.props.page}</Pagination.Item>
        <Pagination.Next onClick={() => this.props.onNext()}/>
        <Pagination.Last onClick={() => this.props.onNum(this.props.max_page_num)}/>
      </Pagination>
      </Row>
      <Row>
      <img src={'http://localhost:5000/' + this.props.model + '/book/' +
                  encodeURIComponent(this.props.book) +
                  '/page/' + this.props.page + '.jpg'}/>
      </Row>
      </Container>
      </div>
    );
  }

}

export default PageBrowser;
