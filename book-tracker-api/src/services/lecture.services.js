import { Author, Book, Lecture } from "../models/index.js";

export const findLectures = async (req,res) => {
    const userId = req.user.id;

    const lectures = await Lecture.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Book,
                include: [
                    {
                        model: Author,
                        attributes: ['authorName']
                    }
                ]
            }
        ]
    });

    res.json(lectures);
}

export const createLecture = async (req,res) => {
    try {
        // USER ID
        const userId = req.user.id;
        
        // ID LIBRO
        const { bookId } = req.body;
        
        // LECTURA AGREGADA "PARA LEER" DEFAULT
        const status = "Para leer";


        // BUSCAR LECTURA EXISTENTE
        const existingLecture = await Lecture.findOne({
            where: {
                userId,
                bookId
            }
        });
        
        // ERROR SI EXISTE
        if(existingLecture){
            return res.status(400).send({ message: "Ya existe una lectura con ese libro" })
        }

        // CREACIÓN
        const newLecture = await Lecture.create({
            userId,
            bookId,
            status
        });

        // GUARDAMOS LA LECTURA CON NOMBRE DE AUTOR AGREGADO
        const lecture = await Lecture.findByPk(newLecture.id, {
            include: [
                {
                    model: Book,
                    include: [
                        {
                            model: Author,
                            attributes: ['authorName']
                        }
                    ]
                }
            ]
        });

        res.json(lecture);
    } catch (err) {
        console.error("Error en createLecture:", err);
        res.status(500).json({ message: "Error interno al crear la lectura" });
  }
}

export const updateLecture = async (req,res) => {
    // DATOS LIBRO
    const { bookId, status, rating, pageCount, dateStarted, dateFinished } = req.body;

    // USER ID
    const userId = req.user.id;

    // BUSCA SI EXISTE LA LECTURA
    const lecture = await Lecture.findOne({
        where: {
            userId,
            bookId
        }
    });

    // ERROR SI NO ENCUENTRA 
    if(!lecture){
        return res.status(404).send({ message: "No existe la correspondiente lectura" })
    }

    // ACTUALIZA
    await lecture.update({
        status,
        rating,
        pageCount,
        dateStarted,
        dateFinished
    })

    // GUARDAMOS LA LECTURA CON NOMBRE DE AUTOR AGREGADO
    const updatedLecture = await Lecture.findOne({
        where: {
            userId,
            bookId
        },
        include: [
            {
                model: Book,
                include: [
                    {
                        model: Author,
                        attributes: ['authorName']
                    }
                ]
            }
        ]
    });

    res.json(updatedLecture);
}

export const deleteLecture = async (req, res) => {
    // LIBRO ID
    const { bookId } = req.body;

    // USER ID
    const userId = req.user.id;

    // BUSCA SI EXISTE LA LECTURA
    const lecture = await Lecture.findOne({
        where: {
            userId,
            bookId
        }
    });

    // ERROR SI NO ENCUENTRA 
    if(!lecture){
        return res.status(404).send({ message: "No existe la correspondiente lectura" })
    }

    // LO BORRA
    await lecture.destroy();

    res.send(`La lectura con libro-id: ${bookId}, del usuario-id: ${userId}, ha sido destruido`);
}