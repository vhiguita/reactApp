//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/navbar/index';
import ItemListContainer from './containers/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';
import Cart from './components/cart/index';
import CartContext from './context/cartContext';
import Order from './components/order/index';

const App = () =>{
  return (
    <>
      <BrowserRouter>
      <CartContext>
        <NavbarComponent/>
        <Switch>
         <Route exact path="/">
          <ItemListContainer/>
         </Route>
         <Route exact path="/category/:categoryId">
          <ItemListContainer/>
         </Route>
         <Route exact path="/item/:id">
          <ItemDetailContainer/>
         </Route>
         <Route exact path="/cart">
          <Cart/>
         </Route>
         <Route exact path="/order">
          <Order/>
         </Route>
        </Switch>
      </CartContext>
      </BrowserRouter>
    </>

  );
}

export default App;
