import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook, addLecture, fetchLectures, removeLecture, deleteBook } from "./bookdetails.services.js";
import { Button, Modal } from "react-bootstrap";
import { errorToast, infoToast, successToast } from "../notifications/notifications.js";
import { AuthenticationContext } from "../services/auth.context.jsx";
import "./bookDetails.css";
import { useTranslate } from "../hooks/translation/UseTranslate.jsx";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const translate = useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, role } = useContext(AuthenticationContext);

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
        errorToast("No se pudo cargar la información del libro.");
      }
    };

    loadData();
  }, [id, token]);

  if (!book) return <p style={{ padding: "2rem" }}>Cargando libro...</p>;

  const {
    title,
    pages,
    summary,
    imageUrl,
    author,
    genres,
    id: bookId,
    authorId,
  } = book;

  const alreadyInLectures = lectures.some(
    (lecture) => lecture.bookId === bookId
  );
  const lectureFound = lectures.find((lecture) => lecture.bookId === bookId);

  const handleAuthorClick = () => navigate(`/authors/${authorId}`);
  const handleEditClick = () => navigate(`/edit-book/${bookId}`);

  const handleRemoveLecture = async () => {
    try {
      if (!token) return infoToast("Necesitás iniciar sesión.");

      const lectureId = lectureFound?.id;

      if (!lectureId) {
        return errorToast("No se encontró la lectura para eliminar.");
      }

      await removeLecture(token, lectureId);
      successToast("Libro eliminado de tu lista.");
      const updatedLectures = await fetchLectures(token);
      setLectures(updatedLectures);
    } catch (error) {
      console.error("Error en handleRemoveLecture:", error);
      errorToast("Ocurrió un error al eliminar el libro.");
    }
  };

  const handleAddLecture = async () => {
    try {
      if (!token) return infoToast("Crea una cuenta y registra tus libros.");
      await addLecture(token, bookId);
      successToast("Se ha añadido a la lista.");
      const updatedLectures = await fetchLectures(token);
      setLectures(updatedLectures);
    } catch (error) {
      errorToast("Ocurrió un error al agregar a la lista.");
    }
  };

  const handleDeleteBook = async () => {
    try {
      if (!token) return infoToast("Necesitás iniciar sesión.");
      await deleteBook(token, bookId);
      successToast("Libro eliminado correctamente.");
      navigate("/browse");
    } catch (error) {
      errorToast("Error al eliminar el libro.");
    } finally {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="details-page">
      <div className="book-cover-container">
        <img
          className="book-cover"
          src={imageUrl}
          alt={`Portada de ${title}`}
        />
      </div>

      <div className="book-body-container">
        <div className="book-body">
          <span className="book-title">{translate(title)}</span>
          <span className="book-author clickable" onClick={handleAuthorClick}>
            {translate(author?.authorName)}
          </span>
          <span className="book-summary">{summary}</span>
          <span className="book-pages">{pages} páginas</span>
          <span className="book-genres">
            {genres?.map((g) => translate(g.name)).join(", ")}
          </span>
        </div>

        <br />

        {alreadyInLectures ? (
          <>
            <p className="book-details-status">{lectureFound?.status}</p>
            <Button
              className="removeLecture-btn"
              variant="danger"
              onClick={handleRemoveLecture}
            >
              {translate("remove_from_list")}
            </Button>
          </>
        ) : (
          <Button
            className="addLecture-btn btn-dark"
            onClick={handleAddLecture}
          >
            {translate("add_to_list")}
          </Button>
        )}

        {role === "admin" && (
          <>
            <hr />
            <Button
              className="editBook-btn"
              variant="dark"
              onClick={handleEditClick}
            >
              {translate("edit_book")}
            </Button>

            <Button
              className="deleteBook-btn"
              variant="outline-danger"
              onClick={handleOpenModal}
            >
              {translate("delete_book")}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>¿Eliminar libro?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que querés eliminar este libro? Esta acción no
                se puede deshacer.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleDeleteBook}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
