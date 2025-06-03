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
                errorToast(translate("load_error"));
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [bookId, token, userId, navigate]);

    const handleEditTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleEditSelectAuthor = (event) => {
        setSelectedAuthor(event.target.value);
    }

    const handleEditPages = (event) => {
        setPages(event.target.value);
    }

    const handleEditGenres = (event) => {
        const genreId = String(event.target.value);
        const isChecked = event.target.checked;

        setSelectedGenres(prevSelectedGenres => {
            if (isChecked) {
                return Array.from(new Set([...prevSelectedGenres, genreId]));
            } else {
                return prevSelectedGenres.filter(id => id !== genreId);
            }
        });
    }

    const handleEditSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleEditImageUrl = (event) => {
        setImageUrl(event.target.value);
    }

    const validateForm = ({ title, selectedAuthor, pages, selectedGenres, summary }) => {
        if (!title || title.trim().length < 1 || title.trim().length > 50)
            return translate("error_title_range");

        if (!selectedAuthor || isNaN(parseInt(selectedAuthor, 10)))
            return translate("error_author_invalid");

        const numPages = parseInt(pages, 10);
        if (!numPages || numPages < 1 || numPages > 6000)
            return translate("error_pages_range");

        if (!selectedGenres || selectedGenres.length === 0)
            return translate("error_genre_required");

        if (!summary || summary.length > 1000)
            return translate("error_summary_required");

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
            successToast(translate("edit_success"));
            navigate(`/books/${updated.id}`);
        } catch (error) {
            errorToast(error.message);
        }
    };

    if (!allowed || loading || !book) return null;

    return (
        <div className='edit-book-page'>
            <Form className='edit-book-form' onSubmit={handleSubmit}>
                <h2 className='edit-book-form-title'>{translate("edit_book")}</h2>

                <Row className='mb-3'>
                    <input
                        type="text"
                        placeholder={translate("title")}
                        value={title}
                        onChange={handleEditTitle}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <input
                        type="url"
                        placeholder={`${translate("cover")} (URL)`}
                        value={imageUrl}
                        onChange={handleEditImageUrl}
                        className='primary-input-large'
                    />
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <FormGroup>
                            <select
                                className='primary-input-short'
                                value={selectedAuthor}
                                onChange={handleEditSelectAuthor}
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
                                onChange={handleEditPages}
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
                                onChange={handleEditGenres}
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

                <Row className='mb-2'>
                    <FormGroup>
                        <FormControl
                            placeholder={translate("summary")}
                            as='textarea'
                            rows={4}
                            value={summary}
                            onChange={handleEditSummary}
                            className='text-tarea-newBook'
                        />
                    </FormGroup>
                </Row>

                <br />
                <Row>
                    <button type='submit' className='primary-button-newBook'>{translate("save_changes")}</button>
                </Row>
            </Form>

            <div className='preview-book-main'>
                <p>{translate("preview")}</p>
                <div className='preview-book'>
                    {imageUrl ? <img src={imageUrl} alt="ImageBook" /> : <img src={notFound} alt="Imagedefault" />}
                    {title ? <h3>{title}</h3> : <h3>{translate("title")}</h3>}
                    {selectedAuthor ? <h5>{authors.find(a => a.id === parseInt(selectedAuthor))?.authorName}</h5> : <h5>{translate("author")}</h5>}
                    {pages ? <p>{pages}</p> : <p>{translate("pages")}</p>}
                </div>
            </div>
        </div>
    );
};

export default EditBook;
