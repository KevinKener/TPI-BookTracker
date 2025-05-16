import { Genre } from '../models/index.js'

export const findGenres = async (req,res) => {
    const genres = await Genre.findAll();

    res.json(genres);
}