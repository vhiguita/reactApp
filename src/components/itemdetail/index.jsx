import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemdetail.css';
import ItemCount from '../itemcount/index';

const ItemDetail = ({item}) =>{
  function onAdd(){
    alert('agregando  al carrito.');
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
       <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
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
