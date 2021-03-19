import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemdetail.css';
import ItemCount from '../itemcount/index';
import {cartContext} from '../../context/cartContext';

const ItemDetail = ({item}) =>{
  //const [quantity, setQuantity] = useState(0);
  const [goCart, setGoCart] = useState(false);

  const { addItem, product } = useContext(cartContext);


  function onAdd(q){
    alert('agregando  al carrito: '+q);
    //setQuantity(q);
    setGoCart(true);
    addItem( {item:item, quantity:q} );
  }
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  try{
  if(isNaN(item.price)===false){
    return (

      <>

      <div className='card'>
       <img src={item.image}/>
       <h3 style={{textAlign: "center"}}>{item.name}</h3>
       <p><strong>Descripción:</strong> {item.description}</p>
       <p><strong>Precio:</strong> {formatter.format(item.price)}</p>
       {goCart ? <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
        <Link to='/cart'><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}}>Terminar compra</button></Link>
        </div>:<ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
       }
      </div>

      </>
    );
  }else{
    return (

      <>

      </>
    );
  }
 } catch(e){
    return (

      <>

      </>
    );
  }
}

export default ItemDetail;
