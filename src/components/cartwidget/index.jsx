// import time from './time.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartWidget = () =>{
  return (

    <>
    <Link to='/cart'><button><img src={window.location.origin +'/cart.svg'} alt="Carro de compras"/></button></Link>
    </>

  );
}

export default CartWidget;
