// import time from './time.svg';
import timer from './timer.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
const NavbarComponent = () =>{
  return (
     
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home"><Image src={timer} responsive/>Timer</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Inicio</Nav.Link>
        <NavDropdown title="Relojes" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Relojes de Pulso</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Relojes de Pila</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Relojes Automáticos</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#contact">Contacto</Nav.Link>
      </Nav>
     
    </Navbar.Collapse>
  </Navbar>
   
  );
}

export default NavbarComponent;
