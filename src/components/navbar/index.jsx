import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import timer from './timer.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import CartWidget from './../cartwidget/index';
import Order from './../order/index';
import {cartContext} from '../../context/cartContext';
import { getFirestore } from '../../firebase/index';
import { NavItem } from 'react-bootstrap';
import products from './products';

const NavbarComponent = () =>{
  const history = useHistory();
  const [category, setCategory] = useState([]);
  //const [isLogged, setIsLogged] = useState(false);
  const { isCartEmpty, numProd, isLogged, setLogged } = useContext(cartContext);
  let mail = window.localStorage.getItem('email');
  //console.log('mail:'+mail);
  useEffect(() => {
    if(mail !== null){
       setLogged(true);
    }else{
       setLogged(false);
    }
    // const promesa = new Promise ((resolve, reject) => {
    //    setTimeout( () => {
    //     resolve(products)
    //   }, 1000);
    // });
    //
    // promesa.then( e => {
    //   let categories = [];
    //   products.map(category => {
    //                 var findCategory = categories.find(x => x.categoryId === category.categoryId);
    //                 if (!findCategory)
    //                     categories.push(category);
    //   });
    //   setCategory(categories);
    // });
    const db = getFirestore();
    const itemCollection = db.collection("categories");
    itemCollection.get().then((querySnapshot) =>{
       if(querySnapshot.size === 0){
         console.log('No results!');
       }

       let aux = querySnapshot.docs.map(doc => {

            return { ...doc.data(), categoryId: doc.id };
       });
       console.log('---CAT-------');
       console.log(aux);
       setCategory(aux);
    }).catch((error) =>{
      console.log(error);
    }).finally(() =>{
    });

  }, []);
  const logout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setLogged(false);
    history.push('/');
  }
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
                return <NavDropdown.Item><Link to={`/category/${cat.categoryName}`}>{cat.categoryName}</Link></NavDropdown.Item>
                })}
            </NavDropdown>
            {/*<Nav.Link href="#contact">Contacto</Nav.Link>*/}
          </Nav>

        </Navbar.Collapse>
        <NavItem>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown id="basic-nav-dropdown">
              { isLogged ?<><NavDropdown.Item><Link to={`/order`}>Pedidos</Link></NavDropdown.Item><NavDropdown.Item><a href="#" onClick={logout}>Salir</a></NavDropdown.Item></>:
              <><NavDropdown.Item><Link to={`/login`}>Ingresar</Link></NavDropdown.Item></>}

            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
        </NavItem>
        <NavItem>{ isCartEmpty ? <></> : <div className="cart rounded-circle">{numProd}</div>} <CartWidget/></NavItem>

      </Navbar>
   </>

  );
}

export default NavbarComponent;
