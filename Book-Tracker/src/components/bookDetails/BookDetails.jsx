import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBook,
  addLecture,
  fetchLectures,
  removeLecture,
  deleteBook,
} from "./bookdetails.services.js";
import { Button, Modal } from "react-bootstrap";
import {
  errorToast,
  infoToast,
  successToast,
} from "../notifications/notifications.js";
import { AuthenticationContext } from "../services/auth.context.jsx";
import "./bookDetails.css";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
      }
    };

    loadData();
  }, [id, token]);

  if (!book) return <p style={{ padding: "2rem" }}>Cargando libro...</p>;
  const { title, pages, summary, imageUrl, author, genres } = book;
  const authorId = book.authorId;
  const bookId = book?.id;
  const alreadyInLectures = lectures.some(
    (lecture) => lecture.bookId === bookId
  );
  const lectureFound = lectures.find((lecture) => lecture.bookId === bookId);

  const handleAuthorClick = () => {
    navigate(`/authors/${authorId}`);
  };

  const handleEditClick = () => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleRemoveLecture = async () => {
    try {
      if (token) {
        await removeLecture(token, bookId);
        successToast("Libro eliminado de tu lista.");
        const updatedLectures = await fetchLectures(token);
        setLectures(updatedLectures);
      } else {
        infoToast("Necesitás iniciar sesión.");
        navigate("/login");
      }
    } catch (error) {
      errorToast("Ocurrió un error al eliminar el libro.");
      console.error("Error al eliminar la lectura:", error);
    }
  };

  const handleAddLecture = async () => {
    try {
      if (token) {
        const res = await addLecture(token, bookId);
        successToast("Se ha añadido a la lista.");
        const updatedLectures = await fetchLectures(token);
        setLectures(updatedLectures);
      } else {
        infoToast("Crea una cuenta y registra tus libros.");
        navigate("/login");
      }
    } catch (error) {
      errorToast("Ocurrió un error al agregar a la lista.");
      console.error("Error al agregar la lectura:", error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      if (token) {
        await deleteBook(token, bookId);
        successToast("Libro eliminado correctamente.");
        navigate("/browse");
      } else {
        infoToast("Necesitás iniciar sesión.");
        navigate("/login");
      }
    } catch (error) {
      errorToast("Error al eliminar el libro.");
      console.error("Error al eliminar el libro:", error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="details-page">
      <div className="book-cover-container">
        <img className="book-cover" src={imageUrl} />
      </div>
      <div className="book-body-container">
        <div className="book-body">
          <span className="book-title">{title}</span>
          <span className="book-author clickable" onClick={handleAuthorClick}>
            {author?.authorName}
          </span>
          <span className="book-summary">{summary}</span>
          <span className="book-pages">{pages} páginas</span>
          <span className="book-genres">
            {genres?.map((g) => g.name).join(", ")}
          </span>
        </div>
        <br />
        {alreadyInLectures ? (
          <>
            <p className="book-details-status">{lectureFound.status}</p>
            <Button
              className="removeLecture-btn"
              variant="danger"
              onClick={handleRemoveLecture}
            >
              Eliminar de la lista
            </Button>
          </>
        ) : (
          <Button className="addLecture-btn" onClick={handleAddLecture}>
            Añadir a la lista
          </Button>
        )}

        {/* Si es admin o editor, mostrar opción de eliminar el libro */}
        {(role === "admin") && (
          <>
            <Button
              className="editBook-btn"
              variant="outline-primary"
              onClick={handleEditClick}
            >
              Editar libro
            </Button>

            <hr />
            <Button
              className="deleteBook-btn"
              variant="outline-danger"
              onClick={() => setShowModal(true)}
            >
              Eliminar este libro
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>¿Eliminar libro?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que querés eliminar este libro? Esta acción no
                se puede deshacer.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
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
