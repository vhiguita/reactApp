//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/navbar/index';
import ItemListContainer from './containers/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';

const App = () =>{
  return (
    <>
      <BrowserRouter>
      <NavbarComponent/>
      {/* <ItemListContainer greeting="Este es el listado de productos."/>*/}
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
      {/*<ItemDetailContainer/>*/}
      </Switch>
      </BrowserRouter>
    </>

  );
}

export default App;
