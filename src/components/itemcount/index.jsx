import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCount = (props) =>{
  const [count, setCount] = useState(props.initial);
  let nStock = props.stock;
  //const [nStock, setStock] = useState(props.stock); //Stock disponible
  function onDecrease(){
    if(count>1){
      setCount(count - 1);
    }else {
      setCount(props.initial);
    }
  }
  function onIncrease(){
    if(count<nStock){
      setCount(count + 1);
    }
  }

  return (
     
    <>
    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px' }}>
    <button onClick={onDecrease}>-</button>
   
    <p style={{width: '100px', display:'block', textAlign: 'center'}}>{count}</p>
    <button onClick={onIncrease}>+</button>
    
    </div>
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
      <div><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={props.onAdd}>Agregar al carrito</button>
      </div>
    </div>
    
    
    </>
   
  );
}

export default ItemCount;