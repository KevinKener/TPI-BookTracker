import React, { useEffect, useState, useContext } from 'react'
import { Form, Row, Col, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { fetchGenres, fetchAuthors, newBook } from './newbook.services.js'
import { successToast, errorToast } from '../notifications/notifications.js'
import { useTranslate } from '../hooks/translation/UseTranslate.jsx'
import { useNavigate } from 'react-router'
import { AuthenticationContext } from '../services/auth.context.jsx'
import fetchUserLogged from '../profile/profile.services.js'
import notFound from './image-not-found.jpg'
import './newBook.css'
import '../input/Input.css'

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
                console.log("User role: ", user.role);
                if (user.role === "admin" || user.role === "mod") {
                    setAllowed(true);
                } else {
                    navigate("/");
                }
            })
            // Redirige al home si el token expiró
            .catch(() => navigate("/"))
            .finally(() => setLoading(false));
    }, [id, token, navigate]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeSelectAuthor = (event) => {
        setSelectedAuthor(event.target.value);
    }

    const handleChangePages = (event) => {
        setPages(event.target.value);
    }

    // Lógica para manejar la selección de géneros con checkboxes
    const handleChangeGenres = (event) => {
        const genreId = String(event.target.value);
        const isChecked = event.target.checked;

        setSelectedGenres(prevSelectedGenres => {
            if (isChecked) {
                // Si el checkbox está marcado, añade el ID del genero si no está ya
                return Array.from(new Set([...prevSelectedGenres, genreId]));
            } else {
                // Si el checkbox está desmarcado, quita el ID del género
                return prevSelectedGenres.filter(id => id !== genreId);
            }
        });
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
            successToast(translate("Libro añadido correctamente"));
            console.log(bookData);

            resetForm();
        } catch (error) {
            console.log("Error al añadir el libro: ", error);
            errorToast(translate("Error al añadir libro"));
        }
    };

    if (!allowed) return null;

    return (
        <div className='new-book-page'>
            <Form className='new-book-form' onSubmit={handleAddBook}>
                <h2 className='new-book-form-title'>{translate("new_book")}</h2>
                <p className='new-book-form-description'>Create a new book</p>

                <Row className='mb-3'>
                    <input
                        type="text"
                        placeholder={translate("title")}
                        value={title}
                        onChange={handleChangeTitle}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <input
                        type="url"
                        placeholder={`${translate("cover")} (URL)`}
                        value={imageUrl}
                        onChange={handleChangeImageUrl}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <FormGroup>
                            <select
                                id="autor"
                                name="autor"
                                className='primary-input-short'
                                onChange={handleChangeSelectAuthor}
                                value={selectedAuthor}
                            >
                                <option value="" disabled hidden>{translate("author")}</option> {/* Opción deshabilitada y oculta por defecto */}
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>
                                        {author.authorName}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <input
                                type="number"
                                className='primary-input-short'
                                placeholder={translate("pages")}
                                onChange={handleChangePages}
                                value={pages}
                                min="1"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                {/* Géneros con checkboxes */}
                <Row className="mb-3">
                    <FormLabel className="d-block mb-2">{translate("genres")}</FormLabel>
                    <div className="genres-checkbox-group d-flex flex-wrap gap-3 p-2">
                        {allGenres.map(genre => (
                            <FormCheck
                                key={genre.id}
                                type="checkbox"
                                id={`genre-checkbox-${genre.id}`}
                                label={genre.name}
                                value={genre.id}
                                checked={selectedGenres.includes(String(genre.id))}
                                onChange={handleChangeGenres}
                            />
                        ))}
                    </div>
                    <Form.Text className="text-muted mt-2">
                        {translate("selected")}: {
                            allGenres
                                .filter(genre => selectedGenres.includes(String(genre.id)))
                                .map(genre => genre.name)
                                .join(', ') || translate("none_selected") // Muestra "Ninguno seleccionado" si no hay géneros
                        }
                    </Form.Text>
                </Row>

                <Row className='mb-2'> {/* Añadido mb-4 para espaciado */}
                    <FormGroup>
                        <FormControl
                            placeholder={translate("summary")}
                            as='textarea'
                            rows={4}
                            onChange={handleChangeSummary}
                            value={summary}
                            className='text-tarea-newBook'
                        />
                    </FormGroup>
                </Row>

                <br />
                <Row>
                    <button type='submit' className='primary-button-newBook'>{translate("add")}</button>
                </Row>
            </Form>
            {console.log(authors)}
            <div className='preview-book-main'>
                <p>Preview</p>
                <div className='preview-book'>
                    {imageUrl ? <img src={imageUrl} alt="ImageBook"/> : <img src={notFound} alt="Imagedefault"/>}
                    {title ? <h3>{title}</h3> : <h3>Title</h3>}
                    {selectedAuthor ? <h5>{authors[selectedAuthor-1].authorName}</h5> : <h5>Author</h5>}
                    {pages ? <p>{pages}</p> : <p>pages</p>}
                </div>
            </div>
        </div>
    );
};

export default NewBook;