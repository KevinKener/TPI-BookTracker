import React, { useEffect, useState } from 'react';
import fetchBooks from './searchbar.services.js';
// import './searchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);

  // Normalizacion UNICODE
  const normalizeText = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  // 

    useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    loadBooks();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const normalizedTerm = normalizeText(term);

    if (term.length > 0) {
      const found = books.filter(book =>
        normalizeText(book.title).includes(normalizedTerm)
      );
      setFilteredBooks(found.slice(0, 6));
    } else {
      setFilteredBooks([]);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar libro..."
        value={searchTerm}
        onChange={handleSearchChange}
        autoComplete="off"
      />
      {filteredBooks.length > 0 && (
        <ul className="search-suggestions">
          {filteredBooks.map((book) => (
            <li key={book.id} className="suggestion-item">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="suggestion-cover"
              />
              <div className="suggestion-text">
                <div className="suggestion-title">{book.title}</div>
                <div className="suggestion-author">{book.author.authorName}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
