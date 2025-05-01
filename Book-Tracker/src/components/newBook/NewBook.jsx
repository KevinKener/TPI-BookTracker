import React from 'react'
import { Form, Row, Col, Button, FormGroup, FormLabel, FormCheck, FormControl } from 'react-bootstrap'
import { useState } from 'react'

const NewBook = () => {

    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [pages, setPages] = useState("");
    const [genres, setGenres] = useState("");
    const [summary, setSummary] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeAuthorId = (event) => {
        setAuthorId(event.target.value);
    }

    const handleChangePages = (event) => {
        setPages(event.target.value);
    }

    const handleChangeGenres = (event) => {
        setGenres(event.target.value);
    }

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    }

    // FETFCH DENTRO DEL SUBMIT PARA LOS SERVICES
    handleAddBook = (event) => {
        event.preventDefault();

        const bookData = {
            title,
            authorId,
            pages: parseInt(10),
            genres,
            summary,
            imageUrl
        };

        console.log(bookData);

        setTitle("");
        setAuthorId("");
        setPages("");
        setGenres("");
        setSummary("");
        setImageUrl("");
    }

  return (
    <div className='new-book-page'>
        <Form className='new-book-form'
            onSubmit={handleAddBook}
        >
            <h4>Nuevo Libro</h4>
            <Row>
                <FormGroup>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl type='text' 
                    onChange={handleChangeTitle}
                    value={title}
                    ></FormControl>
                </FormGroup>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Autor</FormLabel>
                        <FormControl as="select" 
                        onChange={handleChangeAuthorId}
                        value={authorId}
                        >
                            <option value="">
                                Seleccione un autor
                            </option>

                            {/* {authors.map((author) => (
                                <option>
                                    {author.name}
                                </option>
                            ))} */}
                        </FormControl>
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <FormLabel>Páginas</FormLabel>
                        <FormControl type='number' 
                        onChange={handleChangePages}
                        value={pages}
                        ></FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <FormGroup>
                    <FormLabel>Géneros</FormLabel>
                    <FormControl
                    onChange={handleChangeGenres}
                    value={genres}
                    ></FormControl>
                </FormGroup>
            </Row>
            <Row>
                <FormGroup>
                    <FormLabel>Resumen</FormLabel>
                    <FormControl type='text' 
                    onChange={handleChangeSummary}
                    value={summary}
                    ></FormControl>
                </FormGroup>
            </Row>
            <Row>
                    <FormGroup>
                        <FormLabel>Portada</FormLabel>
                        <FormControl type='text' 
                        onChange={handleChangeImageUrl}
                        placeholder='Enlace URL...'
                        value={imageUrl}
                        ></FormControl>
                    </FormGroup>
            </Row>
            <br />
            <Row>
                <Button type='submit'>Añadir</Button>
            </Row>
        </Form>
    </div>
  )
}

export default NewBook