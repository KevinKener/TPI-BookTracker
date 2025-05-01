import express from 'express';

import { sequelize } from './db.js'
import { PORT } from './config.js';

import './models/Book.js'

import bookRoutes from './routes/book.routes.js'
import authorRoutes from './routes/author.routes.js'

const app = express();

try{
    app.use(express.json());
    app.listen(PORT);
    app.use(bookRoutes);
    app.use(authorRoutes);

    await sequelize.sync();
    console.log(`Server is listening to port: ${PORT}`);
} catch (error){
    console.log("There was an error on initilization");
}
