import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Item from '../item/index';
import './itemlist.css';

const ItemList = ({products}) =>{
  console.log(products);
  return (
    <>
      <div>
        <ul>
         {products.map((product)=>{
           return <li><Item key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} stock={product.stock}/></li>
         })}
        </ul>
      </div>
    </>

  );
}

export default ItemList;
