import React from 'react';
import { Link } from 'react-router-dom';
import timer from './timer.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
// import CarWidget from './../carwidget/index';
import Cart from './../cart/index';
import { NavItem } from 'react-bootstrap';

const NavbarComponent = () =>{
  return (
   <>
      <h3>Timer</h3>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><Link to="/"><Image src={timer} responsive/>Timer</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/*<Nav.Link href="#home">Inicio</Nav.Link>*/}
            <NavDropdown title="Relojes" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/category/1">Relojes Automáticos</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/category/2">Relojes de Pila</Link></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>

        </Navbar.Collapse>
        <NavItem><Cart/></NavItem>
        {/*<NavItem><CarWidget/></NavItem>*/}
      </Navbar>
   </>

  );
}

export default NavbarComponent;
