import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'

const MainLayout = ({isLogged, setIsLogged, userName, books}) => {
  return (
    <>
        <NavBar
        userName={userName}
        isLogged={isLogged}
        books={books}
        setIsLogged={setIsLogged}
        />
        <div className="main-layout">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default MainLayout