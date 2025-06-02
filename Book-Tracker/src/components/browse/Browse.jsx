import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks, fetchGenres } from "./browse.services.js";
import { AuthenticationContext } from "../services/auth.context.jsx";
import { errorToast } from "../notifications/notifications.js";
import { useTranslate } from "../hooks/translation/UseTranslate";

import "./browse.css";
import CardBook from "../cardBook/CardBook.jsx";

const Browse = () => {
  const { token } = useContext(AuthenticationContext);
  const translate = useTranslate();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);

  const handleFilter = (genre) => () => setGenreFilter(genre);

  const filteredBooks = genreFilter
    ? books.filter((book) =>
        book.genres?.some((genre) => genre.name === genreFilter)
      )
    : books;

  const handleClick = (id) => () => {
    navigate(`/books/${id}`, { replace: true });
  };

  const handleAuthor = (id) => () => {
    navigate(`/authors/${id}`, { replace: true });
  };

  useEffect(() => {
    const getBrowse = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);

        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        errorToast(error);
      }
    };

    getBrowse();
  }, []);

  return (
    <div className="browse-page">
      <span className="page-title">{translate("browse")}</span>
      <br />
      {/* MAPEO LIBROS */}
      <div className="browse-container">
        <div className="browse-grid">
          {filteredBooks.map((book) => (
            <CardBook
              key={book.id}
              book={book}
              handleAuthor={handleAuthor}
              handleClick={handleClick}
              translate={translate}
            />
          ))}
        </div>

        {/* FILTRO */}
        <div className="browse-filters">
          <div className="filter-menu">{translate("filter")}</div>

          <div className="browse-filters-grid">
            {/* MAPEO GENEROS */}
            {genres.map((genre) => (
              <div
                key={genre.id}
                className={`genre-filter clickable ${
                  genreFilter === genre.name ? "active" : ""
                }`}
                onClick={handleFilter(genre.name)}
              >
                {genre.name}
              </div>
            ))}

            {genreFilter != null && (
              <div
                className="clear-browse-filter clickable"
                onClick={handleFilter(null)}
              >
                Limpiar filtro
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
