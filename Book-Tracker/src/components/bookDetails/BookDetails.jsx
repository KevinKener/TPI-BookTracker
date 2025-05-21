import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import fetchBook from './bookdetails.services';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  
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
          <span className='book-author'>{author?.authorName}</span>
          <span className='book-summary'>{summary}</span>
          <span className='book-pages'>{pages} páginas</span>
          <span className='book-genres'>
            {genres?.map(g => g.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
