import React from 'react'
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookItem from '../bookItem/BookItem'
import { StarFill } from 'react-bootstrap-icons'

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
                  {/* espacio del cover */}
                </Col>
                <Col xs={3} className='list-item-header' >
                  Titulo
                </Col>
                <Col xs={2} className='list-item-header' >
                  Autor
                </Col>
                <Col xs={2} className='list-item-header' >
                  Estado
                </Col>
                <Col xs={1} className='list-item-header' >
                  <StarFill size={20} color='gold'/>
                </Col>
                <Col xs={2} className='list-item-header' >
                  Págs
                </Col>
                <Col xs={1} className='list-item-header' >
                  
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