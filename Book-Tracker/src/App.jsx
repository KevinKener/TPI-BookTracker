import './index.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos CSS
import MainLayout from './components/mainLayout/MainLayout'
import BookList from './components/bookList/BookList'
import BookDetails from './components/bookDetails/BookDetails'
import NotFound from './components/notFound/NotFound'
import Protected from './components/protected/Protected'
import Login from './components/login/Login'
import Home from './components/home/Home'
import NewBook from './components/newBook/NewBook'
import Profile from './components/profile/Profile'
import Register from './components/register/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorDetails from './components/authorDetails/AuthorDetails'
import Browse from './components/browse/Browse';
import AdminUsers from './components/adminUsers/AdminUsers';
import Settings from './components/settings/Settings';


function App() {

  return (
      <BrowserRouter>
        <div className='app-container'>
          <Routes>
            
            {/* LAYOUT COMUN DE TODAS LAS PAGINAS */}
            <Route element={
              <MainLayout />
            }
            >
              {/* TODAS LAS RUTAS */}

            {/* INICIO */}
            <Route element={<Protected />}>
              <Route path='/' element={<Home />} />
            </Route>

            {/* REGISTER */}
            <Route path='/register' element={<Register/>} />

              {/* LOGIN */}
              <Route path='/login' element={<Login />} />

              {/* LISTA */}
              <Route element={<Protected /> } >
                <Route path='/my-books' element={<BookList />} />
              </Route>

              {/* AUTOR */}
              <Route path='/authors/:id' element={<AuthorDetails />} />

              {/* ITEM LIBRO */}
              <Route path='/books/:id' element={<BookDetails />} />

              {/* PAGINA NO EXISTENTE */}
              <Route path="*" element={ <NotFound /> } />

              {/* AÑADIR NUEVO LIBRO */}
              <Route element={<Protected />}>
                <Route path='/new-book' element={<NewBook />} />
              </Route>

              {/* PERFIL DEL USUARIO */}
              <Route element={<Protected />}>
                <Route path='/profile/:id' element={<Profile/>} />
              </Route>

              {/* EXPLORAR / BROWSE */}
              <Route path='/browse' element={<Browse />} />

              <Route element={<Protected />}>
                <Route path='/admin-users' element={<AdminUsers />} />
              </Route>

              {/* SETTINGS */}
              <Route element={<Protected />}>
                <Route path='/profile-settings' element={<Settings />} />
              </Route>

            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
  )
}

export default App
