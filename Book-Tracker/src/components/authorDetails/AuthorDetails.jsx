import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const AuthorDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
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

export default AuthorDetails