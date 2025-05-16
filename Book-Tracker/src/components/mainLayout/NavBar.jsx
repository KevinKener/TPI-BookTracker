import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from '../userMenu/UserMenu';
import SearchBar from '../searchBar/SearchBar';
import logo from "../logo/logo.png"
import logoText from "../logo/logoText.png"
import { Navigate } from 'react-router';

const NavBar = ({isLogged, setIsLogged, userName, books}) => {

  const navigate = useNavigate();

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
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='my-books'>My Books</Nav.Link>
            <Nav.Link as={Link} to='browse'>Browse</Nav.Link>
          </Nav>

          <SearchBar books={books} />

          <UserMenu className="user-menu"
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            username={userName}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;