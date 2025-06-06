import express from 'express';

import { sequelize } from './db.js'
import { PORT } from './config.js';

import authRoutes from './routes/auth.routes.js'
import genreRoutes from './routes/genre.routes.js'
import authorRoutes from './routes/author.routes.js'
import bookRoutes from './routes/book.routes.js'
import lectureRoutes from './routes/lectures.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();

try {
    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    })

    app.use(authRoutes);
    app.use(genreRoutes);
    app.use(authorRoutes);
    app.use(bookRoutes);
    app.use(lectureRoutes);
    app.use(userRoutes);

    await sequelize.sync();

    app.listen(PORT);
    console.log(`Server is listening to port: ${PORT}`);
} catch (error) {
    console.log("There was an error on initilization");
}
