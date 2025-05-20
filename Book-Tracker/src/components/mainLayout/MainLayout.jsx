import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'

const MainLayout = ({ books }) => {
  return (
    <>
        <NavBar
        books={books}
        />
        <div className="main-layout">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default MainLayout