import React from 'react'
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";

const BookDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();


  const {title, author, cover, rating, summary, pages} = location.state.book;

  // const clickHandler = () => {
  //   navigate("/my-books");
  // }

  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <div className='details-page'>
      <div className='book-cover-container'>
        <img
            className='book-cover'
            variant="top"
            src={cover !== "" ? cover : "https://bit.ly/47NylZk"}
        />
        

      </div>
      <div className='book-body-container'>
        <div className='book-body'>
            <span className='book-title'>{title}</span>
            <span className='book-author'>{author}</span>
            <span className='rating-stars'>{ratingStars}</span>
            <span className='book-summary'>{summary}</span>
            <span className='book-pages'>{pages} páginas</span>
        </div>
      </div>
    </div>

  )
}

export default BookDetails
















  // NO ESTOY SEGURO DE QUE HACE ESTO
  // if (!location.state || !location.state.book) {
  //   return <p style={{ padding: '2rem' }}>No se encontró el libro.</p>;
  // }
