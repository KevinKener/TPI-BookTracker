import React, { useState } from 'react';

const SearchBar = ({books}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if(term.length > 0){
        const found = books.filter(book =>
            book.title.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredBooks(found.slice(0,5));
        } else {
        setFilteredBooks([]);
        }

    }

  return (
    <div className="search-wrapper">
              <input type="text" className="search-bar" 
              placeholder='Buscar libro...'
              value={searchTerm}
              onChange={handleSearchChange}
              />
              { filteredBooks.length > 0 && (
                  <ul className="search-suggestions">
                    {filteredBooks.map((book) => (
                      <li key={book.id} className='suggestion-item' >
                        <img src={book.imageUrl} alt={book.title} className='suggestion-cover' />
                        <div className="suggestion-text">
                          <div className='suggestion-title' >{book.title}</div>
                          <div className='suggestion-author' >{book.author}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
  );
};

export default SearchBar;
