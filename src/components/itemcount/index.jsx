import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCount = (props) =>{
  const [count, setCount] = useState(props.initial);
  const [nStock, setStock] = useState(props.stock); //Stock disponible
  function onDecrease(){
    if(count>1){
      setCount(parseInt(count) - 1);
    }else {
      setCount(props.initial);
    }
  }
  function onIncrease(){
    if(count<nStock){
      setCount(parseInt(count) + 1);
    }
  }
  function addToCart(){
    if(nStock!==0&&count<=nStock){
      alert('agregando '+ count +' refs. al carrito.');
      setStock(nStock - count);
      //console.log(nStock);
      setCount(props.initial);
    }
  }

  return (
     
    <>
    {/* <div className="h1">{props.stock}</div>
    <div className="h1">{props.initial}</div> */}
    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px' }}>
    <button onClick={onDecrease}>-</button>
    <input style={{width: '100px', display:'block', textAlign: 'center'}}
            name="numberOfProducts"
            type="text"
            value={count}
     />
    <button onClick={onIncrease}>+</button>
    
    </div>
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
      <div><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={addToCart}>Agregar al carrito</button>
      </div>
    </div>
    
    
    </>
   
  );
}

export default ItemCount;