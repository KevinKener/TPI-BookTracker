import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import UserMenu from '../userMenu/UserMenu';
import SearchBar from '../searchBar/searchBar';
import logo from "../logo/logo.png"
import { AuthenticationContext } from '../services/auth.context';
import { useTranslate } from '../hooks/translation/UseTranslate';
import './navBar.css'

const NavBar = () => {
  const translate = useTranslate();

  const { role } = useContext(AuthenticationContext);

  return (
    <Navbar variant="light" expand="lg" className="header-container">
      <Container fluid>
        <Navbar.Brand as={Link} to='/' className='logo'>
          <span className='logo-span'>
            <img src={logo} className='logo-img' alt="Book Tracker Logo" />
            <h2>Book Tracker</h2>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='menu-bar' >
            <Nav.Link as={NavLink} to='/'>{translate("home")}</Nav.Link>
            <Nav.Link as={NavLink} to='my-books'>{translate("my_books")}</Nav.Link>
            <Nav.Link as={NavLink} to='browse'>{translate("browse")}</Nav.Link>
            {(role === 'mod' || role === 'admin') &&
              <Nav.Link as={NavLink} to='new-book'>{translate("new_book")}</Nav.Link>
            }
          </Nav>

          <SearchBar />

          <UserMenu
            className="user-menu"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;