import { validateAuthor, validateTitle, validatePages, validateGenre, validateSummary } from "../helpers/validations.books.js";
import { Author, Book } from "../models/index.js";
import { Genre } from "../models/index.js";

export const findBooks = async (req, res) => {
    const books = await Book.findAll({
        include: [
            {
                model: Author,
                attributes: ['authorName']
            },
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });

    res.json(books);
}

export const findBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id, {
        include: [
            {
            model: Author,
            attributes: ['authorName']
        },
        {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [] }
        }
    ]
    });

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    res.json(book);

}

export const createBook = async (req, res) => {
    
    // validaciones
    const result = validateNewBook(req);

    if(result.error){
        return res.status(400).send({ message: result.message });
    }
    
    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    // busca por si hay algun libro con ese título 
    const book = await Book.findOne({
        where: {
            title
        }
    });

    if(book){
        return res.status(400).send({ message: "El libro ya se encuentra registrado" }) 
    }

    const newBook = await Book.create({
        title, 
        authorId, 
        pages, 
        summary, 
        imageUrl
    })

    // INICIALIZAR ARRAY DE GENEROS VACIO
    const genreInstances = [];
    
    // BUSCAR GENEROS POR ID
    if (Array.isArray(genres)){

        for (const id of genres){
            const genre = await Genre.findByPk(id);
            // LOS AGREGA A LA LISTA INICIALIZADA
            genreInstances.push(genre);
        }
        
        // ASOCIA LOS GENEROS AL LIBRO
        await newBook.addGenres(genreInstances);
    }

    const createdBook = await Book.findByPk(newBook.id, {
        include: [
            {
                model: Author,
                attributes: ['authorName']
            }, 
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    })

    res.json(createdBook);
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({ message: "No se ha encontrado el libro" });
    }

    await book.update({
        title, 
        authorId, 
        pages, 
        summary, 
        imageUrl
    });

    if (Array.isArray(genres)){

        const genreInstances = [];
        
        for (const genreId of genres){
            const genre = await Genre.findByPk(genreId);

            if (genre) {
                // LOS AGREGA A LA LISTA INICIALIZADA
                genreInstances.push(genre);
            }
            
        }

        // REEMPLAZA LOS GENEROS VIEJOS POR LOS NUEVOS
        await book.setGenres(genreInstances);
    }

    const updatedBook = await Book.findByPk(id, {
        include: [
            {
            model: Author,
            attributes: ['authorName']
        },
        {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [] }
        }
    ]
    });

    res.json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    
    await book.destroy();

    res.send(`El libro con id: ${id} ha sido destruido`);
}

const validateNewBook = (req) => {

    const result = {
        error: false,
        message: ""
    }

    const { title, authorId, pages, genres, summary } = req.body;

    // titulo, maximo, minimo
    if(!title || !validateTitle(title, 50, 1)){
        result.error = true,
        result.message = "El título ingresado debe contener entre 1 y 50 caracteres"
    }

    // autor
    if(!authorId || !validateAuthor(authorId)){
        result.error = true,
        result.message = "Debes elegir algún autor"
    }
    // paginas, maximo, minimo
    if(!pages || !validatePages(pages, 1000, 1)){
        result.error = true,
        result.message = "Las paginas deben ser entre 1 y 1000"
    }
    // genero
    if(!genres || !validateGenre(genres)){
        result.error = true,
        result.message = "Debes elegir algún género"
    }
    // sumary, maximo
    if(!summary || !validateSummary(summary, 1000)){
        result.error = true,
        result.message = "La descripcion ha superado el límite de caracteres"
    }

}