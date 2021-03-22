import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemdetail.css';
import ItemCount from '../itemcount/index';
import {cartContext} from '../../context/cartContext';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';

const ItemDetail = ({item}) =>{
  //console.log("........");
  //console.log(item.stock);
  //const [quantity, setQuantity] = useState(0);
  const [goCart, setGoCart] = useState(false);
  const [isEmptyStock, setIsEmptyStock] = useState(false);
  const { addItem, product } = useContext(cartContext);
  useEffect(() => {
    //console.log("#########");
    //console.log(item.stock);
    if(item.stock===0){
        console.log("is empty");
        setIsEmptyStock(true);
    }
  }, [item]);

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

      <div className='_card'>
       <img src={item.image}/>
       <h3 style={{textAlign: "center"}}>{item.name}</h3>
       <p><strong>Descripción:</strong> {item.description}</p>
       <p><strong>Precio:</strong> {formatter.format(item.price)}</p>
       {goCart ? <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
        <Link to='/cart'><button className="btnF">Terminar compra</button></Link>
        </div>:<div>{isEmptyStock ? <h5 style={{textAlign: "center", color:"red"}}>Producto agotado.</h5>:<ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>}</div>
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
