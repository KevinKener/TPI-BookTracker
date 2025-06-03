import { useEffect, useState, } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useTranslate } from '../hooks/translation/UseTranslate.jsx';
import './authorDetails.css'

const AuthorDetails = () => {

  const translate = useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:3000/authors/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error de servidor");
        return res.text(); // TEMPORALMENTE usamos text en lugar de json
      })
      .then(text => {
        console.log("Respuesta cruda:", text);
        try {
          const data = JSON.parse(text);
          setAuthor(data);
        } catch (err) {
          console.error("No es JSON válido:", err);
          setError(true);
        }
      })
      .catch(err => {
        console.error("Error cargando autor", err);
        setError(true);
      });
  }, [id]);


  if (error) return <p>{translate("error_loading_author")}</p>;

  if (!author) return <p>{translate("loading_author")}</p>;
  const { authorName, birthplace, imageUrl, summary } = author;


  const handleExit = () => {
    navigate("/");
  };


  return (

    <div className='details-page'>
      <div className='author-cover-container'>
        <img
          className='author-cover'
          variant="top"
          src={imageUrl}
        />


      </div>
      <div className='author-body-container'>
        <div className='author-body'>
          <span className='author-name'>{authorName}</span>
          <span className='author-birthplace'>{birthplace}</span>
          <span className='author-summary'>{summary}</span>
        </div>
        <Button className="me-2" onClick={handleExit}>
          {translate("back_home")}
        </Button>
      </div>
    </div>

  )

}

export default AuthorDetails;