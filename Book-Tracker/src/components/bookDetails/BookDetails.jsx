import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook, addLecture, fetchLectures } from './bookdetails.services.js';
import { Button } from 'react-bootstrap'
import { errorToast, infoToast, successToast } from '../notifications/notifications.js'
import { AuthenticationContext } from '../services/auth.context.jsx'
import './bookDetails.css'

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();
  
  // Necesitaba el id del libro
  const { id } = useParams();
  
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
  const loadData = async () => {
    try {
      const bookData = await fetchBook(id);
      setBook(bookData);

      if (token) {
        const lecturesData = await fetchLectures(token);
        setLectures(lecturesData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  loadData();
}, [id]);
  
  if (!book) return <p style={{ padding: '2rem' }}>Cargando libro...</p>;
  
  const { title, pages, summary, imageUrl, author, genres } = book;
  const authorId = book.authorId;
  const bookId = book?.id;
  const alreadyInLectures = lectures.some(lecture => lecture.bookId === bookId);
  const lectureFound = lectures.find(lecture => lecture.bookId === bookId);

  const handleAuthorClick = () => {
    navigate(`/authors/${authorId}`);
  };

  const handleAddLecture = async () => {

    try {
      if (token) {
        const res = await addLecture(token, bookId);
        console.log("Lectura agregada: ", res);
        successToast("Se ha añadido a la lista.");

        const updatedLectures = await fetchLectures(token);
        setLectures(updatedLectures);
      }
      else {
        infoToast("Crea una cuenta y registra tus libros.");
        navigate("/login");
      }
    } catch (error) {
      errorToast("Ocurrió un error al agregar a la lista.");
      console.error("Error al agregar la lectura:", error);
    }
  }

  return (
    <div className='details-page'>
      <div className='book-cover-container'>
        <img
          className='book-cover'
          src={imageUrl}
        />
      </div>
      <div className='book-body-container'>
        <div className='book-body'>
          <span className='book-title'>{title}</span>
          <span className='book-author clickable' onClick={handleAuthorClick} >{author?.authorName}</span>
          <span className='book-summary'>{summary}</span>
          <span className='book-pages'>{pages} páginas</span>
          <span className='book-genres'>
            {genres?.map(g => g.name).join(', ')}
          </span>
        </div>
        <br />
        {alreadyInLectures ? (
          <p className='book-details-status'>
            {lectureFound.status}
          </p>
        ) : (
          <Button className='addLecture-btn' onClick={handleAddLecture}>
            Añadir a la lista
          </Button>
        )}
      </div>

    </div>
  );
};

export default BookDetails;
