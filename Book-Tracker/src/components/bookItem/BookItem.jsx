import React, { useState } from 'react'
import { Card, ListGroupItem, Row, Col, CardImg } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'

const BookItem = ({ id, cover, title, author, rating, summary, pages }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-books/${id}`, {
      state: {
        book: {
          title,
          author,
          rating,
          summary,
          pages,
          cover
        }
      }
    })
  }

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCloseEdit = () => {
    setIsEditing(false)
  }

  return (
    <>
        <ListGroupItem  >
            <Row>
                <Col xs={2} className='list-item-cover' >
                <CardImg src={cover}>
                </CardImg>
                </Col>
                <Col xs={3} className='list-item-title' >
                {title}
                </Col>
                <Col xs={3} className='list-item-author' >
                {author}
                </Col>
                <Col xs={1} className='list-item-rating' >
                status
                </Col>
                <Col xs={1} className='list-item-rating' >
                {rating}
                </Col>
                <Col xs={1} className='list-item-pages' >
                {pages}
                </Col>
                <Col xs={1} className='list-item-rating' onClick={handleEdit} >
                Edit
                </Col>
              </Row>
              {isEditing &&
                <Row>
                <Col xs={6} className='list-item-cover' >
                editar seguimiento del libro
                </Col>
                <Col xs={4} className='list-item-title' >

                {/* status == 'Leyendo' ? 
                  ___/pages :
                  pages
                  */}
                </Col>
                
                <Col xs={1} className='list-item-pages' >
                guardar
                </Col>
                <Col xs={1} className='list-item-rating' onClick={handleCloseEdit} >
                Cancelar
                </Col>
              </Row>
               } 
        </ListGroupItem>
    </>
  )
}

export default BookItem