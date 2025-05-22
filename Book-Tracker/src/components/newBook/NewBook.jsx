import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap'
import { fetchGenres, fetchAuthors } from './newbook.services.js'
import './newBook.css'

const NewBook = () => {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState(null);
    const [summary, setSummary] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);


// METODO POST

    useEffect(() => {
        const token = localStorage.getItem("book-tracker-token");
        fetchGenres(token).then(data => setAllGenres(data));
        fetchAuthors(token).then(data => setAuthors(data));
    }, []);


    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeSelectAuthor = (event) => {
        setSelectedAuthor(event.target.value);
    }

    const handleChangePages = (event) => {
        setPages(event.target.value);
    }

    const handleChangeGenres = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedGenres(selected);
    }

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    }


    const handleAddBook = (event) => {
        event.preventDefault();

        const bookData = {
            title,
            selectedAuthor: parseInt(selectedAuthor),
            pages: parseInt(pages, 10),
            genres: selectedGenres,
            summary,
            imageUrl
        };

        console.log(bookData);

        // Reset form
        setTitle("");
        setSelectedAuthor(null);
        setPages(null);
        setSummary("");
        setImageUrl("");
        setSelectedGenres([]);
    };

    return (
        <div className='new-book-page'>
            <Form className='new-book-form' onSubmit={handleAddBook}>
                <h4>Añadir Nuevo Libro</h4>

                <Row>
                    <FormGroup>
                        <FormLabel>Título</FormLabel>
                        <FormControl
                            type='text'
                            onChange={handleChangeTitle}
                            value={title}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Autor</FormLabel>
                            <FormSelect
                                onChange={handleChangeSelectAuthor}
                                value={selectedAuthor}
                            >
                                <option></option>
                                {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.authorName}
                                </option>
                            ))}
                            </FormSelect>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <FormLabel>Páginas</FormLabel>
                            <FormControl
                                type='number'
                                onChange={handleChangePages}
                                value={pages}
                                min="1"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <FormGroup>
                        <FormLabel>Géneros</FormLabel>
                        <FormSelect
                            value={selectedGenres}
                            multiple
                            onChange={handleChangeGenres}
                        >
                            {allGenres.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </FormSelect>
                        <p>
                            Seleccionados: {
                                allGenres
                                    .filter(genre => selectedGenres.includes(String(genre.id)))
                                    .map(genre => genre.name)
                                    .join(', ')
                            }
                        </p>
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <FormLabel>Resumen</FormLabel>
                        <FormControl
                            type='text'
                            onChange={handleChangeSummary}
                            value={summary}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <FormLabel>Portada</FormLabel>
                        <FormControl
                            type='text'
                            onChange={handleChangeImageUrl}
                            placeholder='Enlace URL...'
                            value={imageUrl}
                        />
                    </FormGroup>
                </Row>

                <br />
                <Row>
                    <Button type='submit'>Añadir</Button>
                </Row>
            </Form>
        </div>
    );
};

export default NewBook;
