import React, { useState } from 'react'
import { ListGroupItem, Row, Col, CardImg, Button, FormGroup, FormControl, FormSelect } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Trash3, CheckLg, XLg, PencilSquare, StarFill } from 'react-bootstrap-icons'
import { updateLecture, deleteLecture } from './bookitem.services.js'
import { useTranslate } from '../hooks/translation/UseTranslate'

const BookItem = ({ lecture, onUpdate, onDelete }) => {
  
  const navigate = useNavigate();
  const translate = useTranslate();
  const token = localStorage.getItem("book-tracker-token");
  
  const { id, rating, status, pageCount, bookId, book } = lecture;
  const { title, pages, summary, imageUrl, author } = book;
  const authorName = author?.authorName;
  const authorId = book.authorId

  const [editStatus, setStatus] = useState(status);
  const [editRating, setRating] = useState(rating);
  const [editPageCount, setPageCount] = useState(pageCount);

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCloseEdit = () => {
    setIsEditing(false)
  }

  const handleEditStatus = (event) => {
    setStatus(event.target.value);
  }

  const handleEditRating = (event) => {
    setRating(event.target.value);
  }

  const handleEditPageCount = (event) => {
    setPageCount(event.target.value);
  }

  const handleSaveEdit = async () => {
    try {
      const updated = await updateLecture (token, id, {
        status: editStatus,
        rating: editRating,
        pageCount: editPageCount
      });
      console.log(updated);
      // onUpdate es para actualizar el .map
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteLecture(token, id);
      onDelete(id);
    } catch (error) {
      console.error("Error al eliminar", error);      
    }
  }

  const handleAuthorClick = () => {
    navigate(`/authors/${authorId}`);
  };

  const handleClick = () => {
    navigate(`/books/${bookId}`, {
      state: {
        book: { title, author: authorName, rating, summary, pages, imageUrl }
      }
    });
  };

  return (
    <>
        <ListGroupItem  >
            <Row>
                <Col xs={1} className='list-item-body' >
                <CardImg src={imageUrl}>
                </CardImg>
                </Col>
                <Col xs={3} className='list-item-body' >
                  <span className='clickable' onClick={handleClick}>{title}</span>
                </Col>
                <Col xs={2} className='list-item-author' onClick={handleAuthorClick} >
                  <span className='clickable' onClick={handleClick}>{authorName}</span>
                </Col>
                <Col xs={2} className='list-item-body' >
                {isEditing ? 
                  <>
                    <FormSelect className="d-flex align-items-center"
                      value={editStatus}
                      onChange={handleEditStatus} 
                    >
                    <option value=""></option>
                    <option value="Para leer">{translate("status_planned")}</option>
                    <option value="Leyendo">{translate("status_reading")}</option>
                    <option value="Leído">{translate("status_read")}</option>
                    </FormSelect>
                  </>
                    :
                    <>
                    {status}
                    </>
                }
                </Col>
                <Col xs={1} className='list-item-rating'>
                  {isEditing ? 
                  <>
                    <FormSelect className="d-flex align-items-center" 
                      value={editRating}
                      onChange={handleEditRating}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </FormSelect>
                  </>
                    :
                    <>
                    {rating}
                    </>
                }
                </Col>
                <Col xs={2} className='list-item-body' >
                  <FormGroup className="d-flex align-items-center">
                    {
                      isEditing ?
                      <>
                        <FormControl
                          type="number"
                          size="sm"
                          min="0"
                          max={pages}
                          className="me-1"
                          style={{ width: '50px' }}
                          step="1"
                          value={editPageCount}
                          onChange={handleEditPageCount}
                        />
                        <span> / {pages}</span>
                      </>
                      :
                      <>
                        {pageCount} / {pages}
                      </>
                    }
                  </FormGroup>
                </Col>
                <Col xs={1} className='list-item-edit'>
                    {isEditing ?
                      <>
                        <Button variant='secondary' className='edit-boton' onClick={handleCloseEdit} >
                          <XLg size={20} />
                        </Button>
                        <Button variant='success' className='edit-boton' onClick={handleSaveEdit} >
                          < CheckLg size={20} />
                        </Button>
                        <Button variant='danger' className='edit-boton' onClick={handleDelete} >
                          <Trash3 size={20} />
                        </Button>
                      </>
                    :
                      <Button variant='secondary' className='edit-boton' onClick={handleEdit} >
                        <PencilSquare size={20} />
                      </Button>
                        

                    }
                </Col>
              </Row>
              
        </ListGroupItem>
    </>
  )
}

export default BookItem