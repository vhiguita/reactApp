import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCount from './../components/itemcount/index';
import ItemList from './../components/itemlist/index';

const ItemListContainer = ({greeting}) =>{
  const [products, setProducts] = useState([]);
  function onAdd(){
    alert('agregando  al carrito.');
  }
  useEffect(() => {
    const promesa = new Promise ((resolve, reject) => {
       setTimeout( () => {
        resolve([
          {id: 1, name: "Frederique Constant Horological", description: "DAFC285V5B4", stock: 5, price:2000},
          {id: 2, name: "D'Mario Academy", description: "ZL3113", stock: 20, price:200}
        ])
      }, 3000);
    });

    promesa.then( e => {
      setProducts(e);
      console.log(e);
    });
  }, []);

  return (

    <>
     <div className="h1">{greeting}</div>
      {/* <ItemCount stock={5} initial={1} onAdd={onAdd}/>*/}
     <ItemList products={products}/>
    </>

  );
}

export default ItemListContainer;
