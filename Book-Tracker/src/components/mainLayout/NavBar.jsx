 import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../userMenu/UserMenu';
import SearchBar from '../searchBar/SearchBar';

const NavBar = ({isLogged, setIsLogged, userName, books}) => {
  return (
    
    <Navbar bg="light" variant="light" expand="lg" className="mb-3"> 
      <Container fluid> 

        
        <Navbar.Brand href="#home">
          
          <span style={{ marginRight: '8px' }}> 
           
            img
          </span>
          Book Tracker
        </Navbar.Brand>

        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#my-books">My Books</Nav.Link>
            <Nav.Link href="#browse">Browse</Nav.Link>
          </Nav>

          
          <Form className="d-flex">
            <SearchBar books={books} />

      
          </Form>

          <UserMenu 
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