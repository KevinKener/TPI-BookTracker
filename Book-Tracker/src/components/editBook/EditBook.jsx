import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row, Col, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { fetchGenres, fetchAuthors } from '../newBook/newbook.services.js';
import { updateBook, fetchBook } from './edit.services.js';
import { successToast, errorToast } from '../notifications/notifications.js';
import { useTranslate } from '../hooks/translation/UseTranslate.jsx';
import { AuthenticationContext } from '../services/auth.context.jsx';
import fetchUserLogged from '../profile/profile.services.js';
import notFound from '../newBook/image-not-found.jpg';
import './editBook.css';
import '../input/Input.css';


const EditBook = () => {
    const { id: bookId } = useParams();
    const translate = useTranslate();
    const navigate = useNavigate();
    const { token, id: userId } = useContext(AuthenticationContext);

    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");
    const [summary, setSummary] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const user = await fetchUserLogged(userId, token);
                if (user.role === 'admin' || user.role === 'mod') {
                    setAllowed(true);
                } else {
                    navigate('/');
                    return;
                }

                const bookData = await fetchBook(bookId);
                setBook(bookData);
                setTitle(bookData.title);
                setPages(bookData.pages);
                setSummary(bookData.summary);
                setImageUrl(bookData.imageUrl);
                setSelectedAuthor(bookData.authorId);
                setSelectedGenres(bookData.genres.map(g => String(g.id)));

                const [authorsData, genresData] = await Promise.all([
                    fetchAuthors(token),
                    fetchGenres(token)
                ]);
                setAuthors(authorsData);
                setAllGenres(genresData);
            } catch (error) {
                errorToast("Error al cargar datos");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [bookId, token, userId, navigate]);

    const validateForm = ({ title, selectedAuthor, pages, selectedGenres, summary }) => {
        if (!title || title.trim().length < 1 || title.trim().length > 50)
            return "El título debe tener entre 1 y 50 caracteres.";

        if (!selectedAuthor || isNaN(parseInt(selectedAuthor, 10)))
            return "Debes seleccionar un autor válido.";

        const numPages = parseInt(pages, 10);
        if (!numPages || numPages < 1 || numPages > 6000)
            return "El libro debe tener entre 1 y 6000 páginas.";

        if (!selectedGenres || selectedGenres.length === 0)
            return "Debes seleccionar al menos un género.";

        if (!summary || summary.length > 1000)
            return "El resumen es obligatorio y no debe superar los 1000 caracteres.";

        return null;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const errorMsg = validateForm({ title, selectedAuthor, pages, selectedGenres, summary });
        if (errorMsg) {
            errorToast(errorMsg);
            return;
        }

        const bookData = {
            title,
            authorId: parseInt(selectedAuthor),
            pages: parseInt(pages, 10),
            genres: selectedGenres,
            summary,
            imageUrl
        };

        try {
            const updated = await updateBook(token, bookId, bookData);
            successToast("Libro editado correctamente");
            navigate(`/books/${updated.id}`);
        } catch (error) {
            errorToast(error.message);
        }
    };

    if (!allowed || loading || !book) return null;

    return (
        <div className='edit-book-page'>
            <Form className='edit-book-form' onSubmit={handleSubmit}>
                <h2 className='edit-book-form-title'>Editar Libro</h2>

                <Row className='mb-3'>
                    <input
                        type="text"
                        placeholder={translate("title")}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <input
                        type="url"
                        placeholder={`${translate("cover")} (URL)`}
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <FormGroup>
                            <select
                                className='primary-input-short'
                                value={selectedAuthor}
                                onChange={e => setSelectedAuthor(e.target.value)}
                            >
                                <option value="" disabled hidden>{translate("author")}</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>{author.authorName}</option>
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
                                value={pages}
                                onChange={e => setPages(e.target.value)}
                                min="1"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className='mb-3'>
                    <FormLabel>{translate("genres")}</FormLabel>
                    <div className='genres-checkbox-group d-flex flex-wrap gap-3 p-2'>
                        {allGenres.map(genre => (
                            <FormCheck
                                key={genre.id}
                                type="checkbox"
                                label={genre.name}
                                value={genre.id}
                                checked={selectedGenres.includes(String(genre.id))}
                                onChange={e => {
                                    const checked = e.target.checked;
                                    const value = String(e.target.value);
                                    setSelectedGenres(prev => checked
                                        ? [...prev, value]
                                        : prev.filter(id => id !== value)
                                    );
                                }}
                            />
                        ))}
                    </div>
                </Row>

                <Row className='mb-2'>
                    <FormGroup>
                        <FormControl
                            placeholder={translate("summary")}
                            as='textarea'
                            rows={4}
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            className='text-tarea-newBook'
                        />
                    </FormGroup>
                </Row>

                <br />
                <Row>
                    <button type='submit' className='primary-button-newBook'>Guardar cambios</button>
                </Row>
            </Form>

            <div className='preview-book-main'>
                <p>Preview</p>
                <div className='preview-book'>
                    {imageUrl ? <img src={imageUrl} alt="ImageBook" /> : <img src={notFound} alt="Imagedefault" />}
                    {title ? <h3>{title}</h3> : <h3>Title</h3>}
                    {selectedAuthor ? <h5>{authors.find(a => a.id === parseInt(selectedAuthor))?.authorName}</h5> : <h5>Author</h5>}
                    {pages ? <p>{pages}</p> : <p>pages</p>}
                </div>
            </div>
        </div>
    );
};

export default EditBook;
