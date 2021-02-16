import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import timer from './timer.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import CartWidget from './../cartwidget/index';
//import Cart from './../cart/index';
import { NavItem } from 'react-bootstrap';
import products from './products';

const NavbarComponent = () =>{
  const [category, setCategory] = useState([]);
  useEffect(() => {
    //console.log(id);
    const promesa = new Promise ((resolve, reject) => {
       setTimeout( () => {
        resolve(products)
      }, 1000);
    });

    promesa.then( e => {
      let categories = [];
      products.map(category => {
                    var findCategory = categories.find(x => x.categoryId === category.categoryId);
                    if (!findCategory)
                        categories.push(category);
      });
      setCategory(categories);
    });
  }, []);
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
               {category.map((cat)=>{

                return <NavDropdown.Item><Link to={`/category/${cat.categoryId}`}>{cat.categoryName}</Link></NavDropdown.Item>

                })}
              {/*<NavDropdown.Item><Link to="/category/1">Relojes Automáticos</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/category/2">Relojes de Pila</Link></NavDropdown.Item>*/}
            </NavDropdown>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>

        </Navbar.Collapse>
        <NavItem><CartWidget/></NavItem>
      </Navbar>
   </>

  );
}

export default NavbarComponent;
