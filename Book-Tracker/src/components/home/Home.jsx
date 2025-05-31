import React, { useState, useEffect, useContext } from 'react';
import BookGroup from '../bookGroup/BookGroup';
import './home.css';
import { fetchLectures, getBooks } from './home.services';
import { AuthenticationContext } from '../services/auth.context';

const Home = () => {
  // const translate = useTranslate(); // Descomenta si lo necesitas

  // TOKEN CONTEXT
  const { token } = useContext(AuthenticationContext);

  const [lectures, setLectures] = useState([]);
  // Este es para todos los libros
  const [books, setBooks] = useState([]);
  // Este es para las 10 lecturas mas populares
  // Se suman todas las veces que los usuarios han seleccionado un libro (los tres estados)
  // const [popularBooks, setPopularBooks] = useState([]);
  // Este es para los libros "Leídos" del usuario
  const [booksUser, setBooksUser] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar lectures
        const lecturesData = await fetchLectures(token);

        setLectures(lecturesData);

        // Cargar books
        const booksData = await getBooks(token);

        setBooks(booksData);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  // Procesar los datos una vez que esten cargados
  useEffect(() => {
    if (lectures.length > 0 && books.length > 0) {

      const lectureReadBookIds = lectures
        // Filtra solo las lecturas 'Leído'
        .filter(lecture => lecture.status === 'Leído')
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
      <BookGroup title={'Populares'}>
        {lectures.length === 0 ? (
          <p>Cargando libros populares...</p>
        ) : (
          // Aca tengo que renderizar un componente que SUPONGO que tiene mati
          books.map((book) => (
            <div key={book.id} className='elements'>
              <img src={book.imageUrl} alt={book.title} />
              <h5>{book.title}</h5>
              <p>{book.author.authorName}</p>
              <p>{book.pages}</p>
            </div>
          ))
        )}
      </BookGroup>

      <BookGroup title={'Aca va alguna otra categoria'}>
        {booksUser.length === 0 ? (
          <p>Cargando libros leídos...</p>
        ) : (
          // Aca tengo que renderizar un componente que SUPONGO que tiene mati
          booksUser.map((book) => (
            <div key={book.id} className='elements'>
              <img src={book.imageUrl} alt={book.title} />
              <h5>{book.title}</h5>
              <p>{book.author.authorName}</p>
              <p>{book.pages}</p>
            </div>
          ))
        )}
      </BookGroup>

      <BookGroup title={'Leidos'}>
        {booksUser.length === 0 ? (
          <p>Cargando libros leídos...</p>
        ) : (
          // Aca tengo que renderizar un componente que SUPONGO que tiene mati
          booksUser.map((book) => (
            <div key={book.id} className='elements'>
              <img src={book.imageUrl} alt={book.title} />
              <h5>{book.title}</h5>
              <p>{book.author.authorName}</p>
              <p>{book.pages}</p>
            </div>
          ))
        )}
      </BookGroup>
    </div>
  );
};

export default Home;