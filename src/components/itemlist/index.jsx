import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Item from '../item/index';
const ItemList = ({products}) =>{

  return (
    <>
      <div>
        <ul>
         {products.map((product)=>{
           return <Item key={product.id} name={product.name} price={product.price}/>
         })}
        </ul>
      </div>
    </>

  );
}

export default ItemList;
