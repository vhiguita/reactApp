import React, {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cart.css';
import {cartContext} from '../../context/cartContext';

const Cart = () =>{

  const cartContextUse = useContext(cartContext);
  const { product, addItem, removeItem, clear, isCartEmpty, totalPrice } = useContext(cartContext);
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });

  // useEffect(() => {
  //   //console.log(id);
  //   let total =0;
  //   product.map(prod => {
  //                 console.log(totalPrice);
  //                 console.log(prod);
  //                 let price = prod.item.price * prod.quantity;
  //                 console.log(price);
  //                 total = total + price;
  //                 console.log(total);
  //                 // setTotalPrice(totalPrice);
  //   });
  //   setTotalPrice(total);
  // }, []);
  function clearCart(){
    console.log('Vaciando carro de compras:');
    clear();
  }
  function removeItemFromCart(id){
    //alert(id);
    removeItem(id);
  }
  return (

    <>
    {isCartEmpty ?
      <div>
          <Link to='/'><div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}}>Relojes</button></div></Link>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>El carro esta vacío.</div>
      </div>
      :<div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={clearCart}>Vaciar carrito</button></div>
    }

     <div>
       <ul>

       </ul>
       <table id='product'>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio Unit.</th>
                    <th>Precio Total</th>
                    <th>Imagen</th>
                    <th></th>
                   </tr>
                </thead>
                <tbody>
                {product.map((prod)=>{
                  return (
                     <tr key={prod.item.image.id}>
                         <td>{prod.quantity}</td>
                         <td>{prod.item.name}</td>
                         <td>{formatter.format(prod.item.price)}</td>
                         <td>{formatter.format(prod.item.price * prod.quantity)}</td>
                         <td><img className="image" src={prod.item.image}/></td>
                         <td className='opration'>
                             <button onClick={()=>{removeItemFromCart(prod.item.id)}}>Eliminar</button>
                         </td>
                     </tr>
                  )})}
                </tbody>
        </table>
     </div>
     {isCartEmpty ?
       <>
       </>
       :<div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
         <strong>TOTAL = </strong> {formatter.format(totalPrice)}
        </div>
     }
    </>

  );
}

export default Cart;
