import express from 'express';

import { sequelize } from './db.js'
import { PORT } from './config.js';

import loginRoutes from './routes/auth.routes.js'
import genreRoutes from './routes/genre.routes.js'
import authorRoutes from './routes/author.routes.js'
import bookRoutes from './routes/book.routes.js'

const app = express();

app.use(express.json());
app.use(loginRoutes);
app.use(genreRoutes);
app.use(authorRoutes);
app.use(bookRoutes);

try{
    await sequelize.sync({alter: true});
    
    app.listen(PORT);

    console.log(`Server is listening to port: ${PORT}`);
} catch (error){
    console.log("There was an error on initilization");
}
