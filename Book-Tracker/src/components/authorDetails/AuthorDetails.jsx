import { useEffect, useState, } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const AuthorDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();           
    const [author, setAuthor] = useState(null);  

    useEffect(() => {
        fetch(`http://localhost:3000/authors/${id}`) 
            .then(res => res.json())
            .then(data => setAuthor(data))           
            .catch(err => console.error("Error cargando autor", err));
    }, [id]); 

    if (!author) return <p>Cargando autor...</p>;

    const handleExit = () => {
        navigate("/libros");
    };


    return (

        <div className='details-page'>
            <div className='author-cover-container'>
                <img
                    className='author-cover'
                    variant="top"
                    src={author.imageUrl}
                />


            </div>
            <div className='author-body-container'>
                <div className='author-body'>
                    <span className='author-name'>{author.authorName}</span>
                    <span className='author-birth-place'>Nacionalidad: {author.birthplace}</span>
                    <span className='author-description'>{author.description}</span>
                </div>
            </div>
            <div>
                <Button className="me-2" onClick={handleExit}>
                    Volver a la página principal
                </Button>
            </div>
        </div>

    )

}

export default AuthorDetails;