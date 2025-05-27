import React, { useEffect, useState, useContext } from 'react'
import { Form, Row, Col, Button, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap'
import { fetchGenres, fetchAuthors, newBook } from './newbook.services.js'
import { successToast, errorToast } from '../notifications/notifications.js'
import { useTranslate } from '../hooks/translation/UseTranslate.jsx'
import { useNavigate } from 'react-router'
import fetchUserLogged from '../profile/profile.services.js'
import { AuthenticationContext } from '../services/auth.context.jsx'
import './newBook.css'

const NewBook = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { id, token } = useContext(AuthenticationContext);

    // MAPEO
    const [authors, setAuthors] = useState([]);
    const [allGenres, setAllGenres] = useState([]);

    // FORMULARIO
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");
    const [summary, setSummary] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    // CARGA
    const [loading, setLoading] = useState(true);
    
    // PERMISO ROL DE USUARIO
    const [allowed, setAllowed] = useState(false);
    
    const resetForm = () => {
        setTitle("");
        setPages("");
        setSummary("");
        setImageUrl("");
        setSelectedAuthor("");
        setSelectedGenres([]);
    }

    useEffect(() => {
        fetchGenres(token).then(data => setAllGenres(data));
        fetchAuthors(token).then(data => setAuthors(data));

        if (!token) {
            // SIN TOKEN, NO HAY USUARIO LOGUEADO
            navigate("/");
            return;
        }

        // COMPRUEBA DATOS DEL USUARIO LOGUEADO
        fetchUserLogged(id, token)
        .then(user => {
                console.log(user.role);
                if (user.role === "admin" || user.role === "mod") {
                    setAllowed(true);
                } else {
                    navigate("/");
                }
            })
            // Redirige al home si el token expiró
            .catch(() => navigate("/"))
            .finally(() => setLoading(false));
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


    const handleAddBook = async (event) => {
        event.preventDefault();

        const bookData = {
            title,
            authorId: parseInt(selectedAuthor),
            pages: parseInt(pages, 10),
            genres: selectedGenres,
            summary,
            imageUrl
        };

        try {
            await newBook(token, bookData);
            successToast("Libro añadido correctamente");
            console.log(bookData);
            
            resetForm();
        } catch (error) {
            console.log("Error al añadir el libro: ", error);
            errorToast("Error al añadir libro");
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (!allowed) return null;

    return (
        <div className='new-book-page'>
            <Form className='new-book-form' onSubmit={handleAddBook}>
                <h4 className='new-book-form-title'>{translate("new_book")}</h4>

                <Row>
                    <FormGroup>
                        <FormLabel>{translate("title")}</FormLabel>
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
                            <FormLabel>{translate("author")}</FormLabel>
                            <FormSelect
                                onChange={handleChangeSelectAuthor}
                                value={selectedAuthor}
                            >
                                <option value={null}></option>
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
                            <FormLabel>{translate("pages")}</FormLabel>
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
                        <FormLabel>{translate("genres")}</FormLabel>
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
                            {translate("selected")}: {
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
                        <FormLabel>{translate("summary")}</FormLabel>
                        <FormControl
                            as='textarea'
                            rows={3}
                            onChange={handleChangeSummary}
                            value={summary}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <FormLabel>{translate("cover")}</FormLabel>
                        <FormControl
                            type='text'
                            onChange={handleChangeImageUrl}
                            placeholder={translate("url")}
                            value={imageUrl}
                        />
                    </FormGroup>
                </Row>

                <br />
                <Row>
                    <Button type='submit'>{translate("add")}</Button>
                </Row>
            </Form>
        </div>
    );
};

export default NewBook;
