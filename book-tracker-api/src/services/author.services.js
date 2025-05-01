import { Author } from '../models/Author.js'

export const findAuthors = async (req,res) => {
    const authors = await Author.findAll();

    res.json(authors);
}

export const findAuthor = async (req,res) => {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if(!author){
        return res.status(400).send({message:"El autor no existe"})
    }

    res.json(author);
}