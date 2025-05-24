import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook, addLecture } from './bookdetails.services.js';
import { Button } from 'react-bootstrap'
import { successToast } from '../notifications/notifications.js'
import './bookDetails.css'

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
  fetchBook(id)
    .then(data => {
      setBook(data);
    })
    .catch(err => {
      console.error(err);
    });
}, [id]);
  
  if (!book) return <p style={{ padding: '2rem' }}>Cargando libro...</p>;
  
  const { title, pages, summary, imageUrl, author, genres } = book;
  const authorId = book.authorId
  const bookId = book?.id;

  const handleAuthorClick = () => {
    navigate(`/authors/${authorId}`)
  };

  const handleAddLecture = async () => {
    const token = localStorage.getItem("book-tracker-token");

    try {
      const res = await addLecture(token, bookId);
      console.log("Lectura agregada: ", res);
      successToast("Se ha añadido a la lista")
    } catch (error) {
      alert(error.message);
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
        <Button className='addLecture-btn' onClick={handleAddLecture} >
          Añadir a la lista
        </Button>
      </div>

    </div>
  );
};

export default BookDetails;
