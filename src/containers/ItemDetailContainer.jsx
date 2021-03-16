import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ItemCount from './../components/itemcount/index';
import ItemDetail from './../components/itemdetail/index';
import { getFirestore } from '../firebase/index';

const ItemDetailContainer = () =>{
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [productNotFound, setProductNotFound] = useState(false);
  useEffect(() => {
    console.log(id);
    // const promesa = new Promise ((resolve, reject) => {
    //    setTimeout( () => {
    //     resolve(
    //       [{id: 1, categoryId:1, categoryName:'Relojes Automáticos', name: 'Frederique Constant Horological', description: 'DAFC285V5B4 - Automático', image: window.location.origin +'/images/producto-1.jpg', stock: 3, price:2000},
    //        {id: 2, categoryId:2, categoryName:'Relojes de Pila', name: "D'Mario Academy", description: "ZL3113 - Pila", image: window.location.origin +'/images/producto-2.jpg', stock: 20, price:200},
    //        {id: 3, categoryId:1, categoryName:'Relojes Automáticos', name: 'Tissot complication T Squelette', description: 'T0704051641100 - Automático', image: window.location.origin +'/images/producto-3.jpg', stock: 5, price:3000}
    //       ])
    //   }, 1000);
    // });
    //
    // promesa.then( e => {
    //   let product = {};
    //   if (typeof(id) !== 'undefined' && id != null) {
    //     product = e.find((el) => {
    //       return el.id=== parseInt(id)
    //     });
    //   }
    //   setItem(product);
    // });
    let product = {};
    const db = getFirestore();
    const itemCollection = db.collection("items");
    if (typeof(id) !== 'undefined' && id != null) {
      itemCollection.doc(id).get().then((d) =>{
        if (d.exists) {
           product = { ...d.data(), id: d.id };
           console.log('--- { ITEM } ---');
           console.log("Document data:", product);
           setItem(product);
           setProductNotFound(false);
         } else {
             // doc.data() will be undefined in this case
             console.log("No such document!");
             setProductNotFound(true);
         }

      }).catch((error) =>{
        console.log(error);
      }).finally(() =>{
      });

    }

  }, [id]);

  return (

    <>
      {/* <ItemCount stock={5} initial={1} onAdd={onAdd}/>*/}
      {productNotFound ?
        <><h5 style={{textAlign: "center", color:"red"}}>El producto no existe en la base de datos.</h5></>
        :<ItemDetail item={item}/>
      }
    </>

  );
}

export default ItemDetailContainer;
