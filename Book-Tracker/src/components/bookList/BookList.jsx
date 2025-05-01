import React from 'react'
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookItem from '../bookItem/BookItem'

const BookList = ({books}) => {

  // ACA DEBERIA LLAMAR LOS METODOS PUT, DELETE PARA EDITAR Y BORRAR LIBROS DE LISTAS
  return (
    <div className="list-page">
      <Card className='my-list'>
        <CardHeader className='list-title'>
          My Books
        </CardHeader>

        <div className="list-body">
          <Card className='list-sidebar'>
            <ListGroup variant='flush' >
              <ListGroupItem>
                All
              </ListGroupItem>
              <ListGroupItem>
              Read
              </ListGroupItem>
              <ListGroupItem>
              Reading
              </ListGroupItem>
              <ListGroupItem>
              Want to Read
              </ListGroupItem>
            </ListGroup>
          </Card>

          <Card className='list-items'>
            <CardHeader>
              <Row>
                <Col xs={1} className='list-item-header' >
                  Cover
                </Col>
                <Col xs={4} className='list-item-header' >
                  Title
                </Col>
                <Col xs={3} className='list-item-header' >
                  Author
                </Col>
                <Col xs={1} className='list-item-header' >
                  Status
                </Col>
                <Col xs={1} className='list-item-header' >
                  Rating
                </Col>
                <Col xs={1} className='list-item-header' >
                  Páginas
                </Col>
                <Col xs={1} className='list-item-header' >
                  #
                </Col>
              </Row>
              </CardHeader>

              <ListGroup>
                {
                  books.map(book => (
                    <BookItem 
                      key={book.id}
                      id={book.id}
                      author={book.author}
                      title={book.title}
                      rating={book.rating}
                      summary={book.summary}
                      pages={book.pages}
                      cover={book.imageUrl}
                    />
                  ))
                }
              </ListGroup>
          </Card>
        </div>

      </Card>
    </div>
  )
}

export default BookList