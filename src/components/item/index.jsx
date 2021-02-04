import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './item.css';

const Item = (props) =>{
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  return (

    <>
    <div className='card'>
     <h3>{props.name}</h3>
     <p>Precio: {formatter.format(props.price)}</p>
    </div>


    </>

  );
}

export default Item;
