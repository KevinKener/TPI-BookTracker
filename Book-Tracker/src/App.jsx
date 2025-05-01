import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from './components/mainLayout/MainLayout'
import BookList from './components/bookList/BookList'
import books from './components/data/Books'
import BookDetails from './components/bookDetails/BookDetails'
import NotFound from './components/notFound/NotFound'
import Protected from './components/protected/Protected'
import Login from './components/login/Login'
import Home from './components/home/Home'
import NewBook from './components/newBook/NewBook'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [bookList, setBookList] = useState(books);
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('Anaklusmos');
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          
          {/* LAYOUT COMUN DE TODAS LAS PAGINAS */}
          <Route element={
            <MainLayout
              userName={userName}
              isLogged={isLogged}
              books={books}
              setIsLogged={setIsLogged}
            />
          }
          >
            {/* TODAS LAS RUTAS */}

            {/* INICIO */}
            <Route path='/' element={<Home />} />

            {/* LOGIN */}
            <Route path='/login' element={<Login setIsLogged={setIsLogged} />} />

            {/* LISTA */}
            <Route element={<Protected isLogged={isLogged} /> } >
              <Route path='/my-books' element={<BookList books={bookList} />} />
            </Route>

            {/* ITEM LIBRO */}
            <Route path='my-books/:id' element={<BookDetails />} />

            {/* PAGINA NO EXISTENTE */}
            <Route path="*" element={ <NotFound /> } />

            {/* AÑADIR NUEVO LIBRO */}
            <Route path='new-book' element={<NewBook />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
