import { Author } from '../models/Author.js'

export const findAuthors = async (req,res) => {
    const authors = await Author.findAll();

    res.json(authors);
}

export const findAuthor = async (req,res) => {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if(!author){
        return res.status(400).send({message:"El autor no se encuentra registrado"});
    }

    res.json(author);
}

export const createAuthor = async (req,res) => {
    const { authorName, birthplace, genres, imageUrl, summary } = req.body;

    if(!authorName){
        return res.status(400).send({message: "El autor requiere de nombre"});
    }

    const newAuthor = await Author.create({
        authorName, 
        birthplace, 
        genres, 
        imageUrl,
        summary
    });

    res.json(newAuthor);
}

export const updateAuthor = async (req,res) => {
    const { id } = req.params;
    const { authorName, birthplace, genres, imageUrl, summary } = req.body;

    const author = await Author.findByPk(id);

    if(!author){
        return res.status(400).send({message:"No se ha encontrado el autor"});
    }

    await author.update({
        authorName, 
        birthplace, 
        genres, 
        imageUrl, 
        summary
    }, {
        where: {
            id
        }
    });

    res.json(author);
}

export const deleteAuthor = async (req,res) => {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if(!author){
        return res.status(400).send({message:"No se ha encontrado el autor"});
    }

    author.destroy();

    res.send(`El autor de id: ${id} ha sido eliminado`);
}