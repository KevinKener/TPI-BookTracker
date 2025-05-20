import './index.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-bootstrap'
import MainLayout from './components/mainLayout/MainLayout'
import BookList from './components/bookList/BookList'
import books from './components/data/Books'
import BookDetails from './components/bookDetails/BookDetails'
import NotFound from './components/notFound/NotFound'
import Protected from './components/protected/Protected'
import Login from './components/login/Login'
import Home from './components/home/Home'
import NewBook from './components/newBook/NewBook'
import Profile from './components/profile/Profile'
import Users from './components/data/Users'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [bookList, setBookList] = useState(books);
  const [users, setUsers] = useState(Users);

  return (
    // <ToastContainer>
      <BrowserRouter>
        <div className='app-container'>
          <Routes>
            
            {/* LAYOUT COMUN DE TODAS LAS PAGINAS */}
            <Route element={
              <MainLayout
                books={books}
              />
            }
            >
              {/* TODAS LAS RUTAS */}

              {/* INICIO */}
              <Route path='/' element={<Home />} />

              {/* LOGIN */}
              <Route path='/login' element={<Login />} />

              {/* LISTA */}
              <Route element={<Protected /> } >
                <Route path='/my-books' element={<BookList books={bookList} />} />
              </Route>

              {/* ITEM LIBRO */}
              <Route path='my-books/:id' element={<BookDetails />} />

              {/* PAGINA NO EXISTENTE */}
              <Route path="*" element={ <NotFound /> } />

              {/* AÑADIR NUEVO LIBRO */}
              <Route path='new-book' element={<NewBook />} />

              {/* PERFIL DEL USUARIO */}
              <Route path='profile/:id' element={<Profile users={users} setUsers={setUsers}/>} />
            
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    // </ToastContainer>
  )
}

export default App
