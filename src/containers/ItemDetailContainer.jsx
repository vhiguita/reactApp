import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ItemCount from './../components/itemcount/index';
import ItemDetail from './../components/itemdetail/index';

const ItemDetailContainer = () =>{
  const [item, setItem] = useState({});
  useEffect(() => {
    const promesa = new Promise ((resolve, reject) => {
       setTimeout( () => {
        resolve(
          [{id: 1, categoryid:1, name: 'Frederique Constant Horological', description: 'DAFC285V5B4 - Automático', image: window.location.origin +'/images/producto-1.jpg', stock: 3, price:2000},
          {id: 2, categoryid:2, name: "D'Mario Academy", description: "ZL3113 - Pila", image: window.location.origin +'/images/producto-2.jpg', stock: 20, price:200}
        ])
      }, 2000);
    });

    promesa.then( e => {
      setItem(e);
      console.log(e);
    });
  }, []);

  return (

    <>
      {/* <ItemCount stock={5} initial={1} onAdd={onAdd}/>*/}
      <ItemDetail item={item}/>
    </>

  );
}

export default ItemDetailContainer;
