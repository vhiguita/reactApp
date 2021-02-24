import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cart.css';
import {cartContext} from '../../context/cartContext';

const Cart = () =>{
  const cartContextUse = useContext(cartContext);
  const { removeItem, clear, product } = useContext(cartContext);
  //console.log(cartContextUse);
  console.log('prod');
  console.log(product);
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
     <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={clearCart}>Vaciar carrito</button></div>
     <div>
       <ul>
        {product.map((prod)=>{
          return <div className='card'>
                   <img src={prod.item.image}/>
                   <h3 style={{textAlign: "center"}}>{prod.item.name}</h3>
                   <p style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>Cantidad: {prod.quantity}</p>
                   <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
                   <button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={()=>{removeItemFromCart(prod.item.id)}}>Eliminar</button>
                   </div>
                  </div>
        })}
       </ul>
     </div>
    </>

  );
}

export default Cart;
