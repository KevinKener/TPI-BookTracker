import { useState, useEffect, useContext } from 'react';
import BookGroup from '../bookGroup/BookGroup';
import CardBook from '../cardBook/CardBook';
import { fetchLectures, getBooks, getPopularBooks } from './home.services';
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from "../hooks/translation/UseTranslate.jsx";
import { useNavigate } from "react-router-dom";

import './home.css';
const Home = () => {

  // TOKEN CONTEXT
  const { token } = useContext(AuthenticationContext);

  const [lectures, setLectures] = useState([]);
  // Este es para todos los libros
  const [books, setBooks] = useState([]);
  // Este es para las 10 lecturas populares
  const [popularBooks, setPopularBooks] = useState([]);
  // Este es para los libros "Leyendo" del usuario
  const [booksUser, setBooksUser] = useState([]);
  const translate = useTranslate();
  const navigate = useNavigate();

  const handleClick = (id) => () => {
    navigate(`/books/${id}`, { replace: true });
  };

  const handleAuthor = (id) => () => {
    navigate(`/authors/${id}`, { replace: true });
  };

  const handleBrowse = () => {
    navigate(`/browse/`, { replace: true });
  }

  const handleSingUp = () => {
    navigate(`/login/`, { replace: true });
  }

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        const lecturesData = await fetchLectures(token);
        setLectures(lecturesData);

        const booksData = await getBooks(token);
        setBooks(booksData);

        const popularBooksData = await getPopularBooks();
        setPopularBooks(popularBooksData);
      } else {
        const popularBooksData = await getPopularBooks();
        setPopularBooks(popularBooksData);
      }

    };

    loadData();
  }, [token]);

  // Procesar los datos una vez que esten cargados
  useEffect(() => {
    if (lectures.length > 0 && books.length > 0) {

      const lectureReadBookIds = lectures
        // Filtra solo las lecturas 'Leído'
        .filter(lecture => lecture.status === 'Leyendo')
        // Luego, mapea para obtener sus bookId
        .map(lecture => lecture.bookId);

      // Filtrar los libros donde el ID del libro esté incluido en el array de IDs de las lecturas leídas
      const userBooks = books.filter(book => lectureReadBookIds.includes(book.id));

      // Actualizar el estado de booksUser
      setBooksUser(userBooks);
    }
  }, [lectures, books]); // Se ejecuta cuando lectures o books cambian

  return (
    <div className="home-container">
      <BookGroup title={translate('populars')}>
        {popularBooks.length === 0 ? (
          <p>{translate('loading-books')}</p>
        ) : (
          popularBooks.map((book) => (
            <CardBook key={book.id} book={book} handleAuthor={handleAuthor} handleClick={handleClick} translate={translate} />
          ))
        )}
      </BookGroup>

      {token && <BookGroup title={translate('reading')}>
        {booksUser.length === 0 ? (
          <p>{translate('loading-books')}</p>
        ) : (
          booksUser.map((book) => (
            <CardBook key={book.id} book={book} handleAuthor={handleAuthor} handleClick={handleClick} translate={translate} />
          ))
        )}
      </BookGroup>}

      {token ? (
        <div className='go-browse'>
          <h3>{translate('redirect-browse')}</h3>
          <button onClick={handleBrowse}>{translate('browse-button')}</button>
        </div>
      ) : (
        <div className='go-browse'>
          <h3>{translate('sing-up-for-more-options')}</h3>
          <button onClick={handleSingUp}>{translate('login')}</button>
        </div>
      )}
    </div>
  );
};

export default Home;