import React, { useState, useEffect, useContext } from 'react'
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookItem from '../bookItem/BookItem'
import { StarFill } from 'react-bootstrap-icons'
import fetchLectures from './booklist.services.js'
import { useTranslate } from '../hooks/translation/UseTranslate'
import { AuthenticationContext } from '../services/auth.context.jsx'
import './bookList.css'

const BookList = () => {
  
  const translate = useTranslate();
  
  // TOKEN CONTEXT
  const { token } = useContext(AuthenticationContext);
  
  // ACA DEBERIA LLAMAR LOS METODOS PUT, DELETE PARA EDITAR Y BORRAR LIBROS DE LISTAS
  const [lectures, setLectures] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

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

  const filteredLectures = statusFilter
    ? lectures.filter(lecture => lecture.status === statusFilter)
    : lectures;

  const handleFilter = (status) => () => setStatusFilter(status);

  useEffect(() => {
    fetchLectures(token)
      .then(data => setLectures([...data]))      
  }, [])

  return (
    <div className="list-page">
      <Card className='my-list'>
        <CardHeader className='list-header'>
          {translate("my_books")}
        </CardHeader>

        <div className="list-body">
          <Card className='list-sidebar'>
            <ListGroup variant='flush' >
              <CardHeader>
                {translate("filter")}:
              </CardHeader>
              <ListGroupItem className={`clickable ${statusFilter === "Para leer" ? "filtered" : ""}`} onClick={handleFilter("Para leer")} >
                {translate("status_planned")}
              </ListGroupItem>
              <ListGroupItem className='clickable' onClick={handleFilter("Leyendo")} >
                {translate("status_reading")}
              </ListGroupItem>
              <ListGroupItem className='clickable' onClick={handleFilter("Leído")} >
                {translate("status_read")}
              </ListGroupItem>
              { statusFilter !== null &&
              <>
                <ListGroupItem className='clear-filter clickable' onClick={handleFilter(null)} >
                  {translate("clear_filter")}
                </ListGroupItem>
              </>

              }
            </ListGroup>
          </Card>

          <Card className='list-items'>
            <CardHeader>
              <Row>
                <Col xs={1} className='list-item-header' >
                  {/* espacio del cover */}
                </Col>
                <Col xs={3} className='list-item-header' >
                  {translate("title")}
                </Col>
                <Col xs={2} className='list-item-header' >
                  {translate("status")}
                </Col>
                <Col xs={1} className='list-item-header' >
                  <StarFill size={20} color='gold'/>
                </Col>
                <Col xs={2} className='list-item-header' >
                  {translate("pages")}
                </Col>
                <Col xs={2} className='list-item-header' >
                  {translate("start")} / {translate("end")}
                </Col>
                <Col xs={1} className='list-item-header' >
                  
                </Col>
              </Row>
              </CardHeader>


              <ListGroup>
                {
                  filteredLectures.map(lecture => (
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