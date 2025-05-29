import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'

const MainLayout = () => {
  return (
    <>
        <NavBar
        />
        <div className="main-layout">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default MainLayout