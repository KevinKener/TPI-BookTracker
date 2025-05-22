import React, { useState, useEffect } from 'react'
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookItem from '../bookItem/BookItem'
import { StarFill } from 'react-bootstrap-icons'
import fetchLectures from './booklist.services.js'
import { useTranslate } from '../hooks/translation/UseTranslate'

const BookList = () => {
  
  // ACA DEBERIA LLAMAR LOS METODOS PUT, DELETE PARA EDITAR Y BORRAR LIBROS DE LISTAS
  const [lectures, setLectures] = useState([]);
  const translate = useTranslate();
  
  const handleUpdateLecture = (updatedLecture) => {
    setLectures((prevLectures) => 
      prevLectures.map((lecture) => 
        lecture.id === updatedLecture.id ? updatedLecture : lecture
      )
    );
  };

  const handleDeleteLecture = (deletedId) => {
    setLectures((prevLectures) => 
      prevLectures.filter((lecture) => lecture.id !== deletedId)
    )
  }
  
  useEffect(() => {
    const token = localStorage.getItem('book-tracker-token')
    fetchLectures(token)
      .then(data => setLectures([...data]))      
  }, [])

  return (
    <div className="list-page">
      <Card className='my-list'>
        <CardHeader className='list-title'>
          {translate("my_books")}
        </CardHeader>

        <div className="list-body">
          <Card className='list-sidebar'>
            <ListGroup variant='flush' >
              <ListGroupItem>
                All
              </ListGroupItem>
              <ListGroupItem>
                {translate("status_read")}
              </ListGroupItem>
              <ListGroupItem>
                {translate("status_reading")}
              </ListGroupItem>
              <ListGroupItem>
                {translate("status_planned")}
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
                  lectures.map(lecture => (
                    <BookItem 
                      key={lecture.id} 
                      lecture={lecture} 
                      onUpdate={handleUpdateLecture}
                      onDelete={handleDeleteLecture}
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