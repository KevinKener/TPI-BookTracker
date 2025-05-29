import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserMenu from '../userMenu/UserMenu';
import SearchBar from '../searchBar/searchBar';
import logo from "../logo/logo.png"
import logoText from "../logo/logoText.png"
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from '../hooks/translation/UseTranslate';

const NavBar = () => {

  const translate = useTranslate();
  const { username, role } = useContext(AuthenticationContext);

  return (
    
    <Navbar variant="light" expand="lg" className="header-container"> 
      <Container fluid> 

        
        <Navbar.Brand as={Link} to='/' className='logo'>
          
          <span> 
          <img src={logo} className='logo-img' /> 
          
          Book Tracker
          </span>
        </Navbar.Brand>

        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          
          <Nav className='menu-bar' >
            <Nav.Link as={Link} to='/'>{translate("home")}</Nav.Link>
            <Nav.Link as={Link} to='my-books'>{translate("my_books")}</Nav.Link>
            <Nav.Link as={Link} to='browse'>{translate("browse")}</Nav.Link>
            { (role === 'mod' || role === 'admin') &&
                <Nav.Link as={Link} to='new-book'>{translate("new_book")}</Nav.Link>
            }
          </Nav>

          <SearchBar />

          <UserMenu className="user-menu"
            username={username}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;