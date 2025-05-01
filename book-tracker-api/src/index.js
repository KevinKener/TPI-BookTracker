import express from 'express';

import { sequelize } from './db.js'
import { PORT } from './config.js';

import './models/Book.js'

import bookRoutes from './routes/book.routes.js'

const app = express();

try{
    app.listen(PORT);
    app.use(bookRoutes);

    await sequelize.sync();
    console.log(`Server is listening to port: ${PORT}`);
} catch (error){
    console.log("There was an error on initilization");
}
