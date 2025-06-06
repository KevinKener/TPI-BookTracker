import { Card, CardBody } from "react-bootstrap";
import './cardBook.css';

const CardBook = ({ book, handleClick, handleAuthor, translate }) => {
    return (
        <Card key={book.id} className='book-item-main'>
            <CardBody className="book-item">
                {/* IMAGEN */}
                <img
                    src={book.imageUrl}
                    className="clickable"
                    onClick={handleClick(book.id)}
                />

                {/* TITULO */}
                <span
                    className="book-item-title clickable"
                    onClick={handleClick(book.id)}
                >
                    {translate(book.title)}
                </span>
                <br />

                {/* AUTOR */}
                <span
                    className="book-item-author clickable"
                    onClick={handleAuthor(book.authorId)}
                >
                    {translate(book.author?.authorName)}
                </span>
                <br />

                {/* PAGINAS */}
                <span className="book-item-pages">
                    {book.pages} {translate("pages")}
                </span>
            </CardBody>
        </Card>
    )
}

export default CardBook