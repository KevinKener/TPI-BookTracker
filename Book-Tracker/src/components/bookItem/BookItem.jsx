import React, { useState } from 'react'
import { Card, ListGroupItem, Row, Col, CardImg, Button, FormGroup, FormControl, FormSelect } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash3, CheckLg, XLg, PencilSquare, StarFill } from 'react-bootstrap-icons';

const BookItem = ({ id, cover, title, author, authorId, rating, summary, pages }) => {

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

  const handleAuthorClick = () => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <>
        <ListGroupItem  >
            <Row>
                <Col xs={1} className='list-item-body' >
                <CardImg src={cover}>
                </CardImg>
                </Col>
                <Col xs={3} className='list-item-body' >
                  <span className='clickable' onClick={handleClick}>{title}</span>
                </Col>
                <Col xs={3} className='list-item-author' >
                {author} 
                <Button onClick={handleAuthorClick} > Ver autor</Button>
                </Col>
                <Col xs={2} className='list-item-body' >
                {isEditing ? 
                  <>
                    <FormSelect className="d-flex align-items-center" >
                    <option value=""></option>
                    <option value="">Leyendo</option>
                    <option value="">Para leer</option>
                    <option value="">Leido</option>
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
                    <FormSelect className="d-flex align-items-center" >
                    <option value=""></option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
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
                          className="me-1"
                          style={{ width: '50px' }}
                          step="1"
                        />
                        <span>/ {pages}</span>
                      </>
                      :
                      <>
                        {pages}
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
                        <Button variant='success' className='edit-boton' onClick={handleCloseEdit} >
                          < CheckLg size={20} />
                        </Button>
                        <Button variant='danger' className='edit-boton' onClick={handleCloseEdit} >
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