import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ItemCount from './../components/itemcount/index';
import ItemList from './../components/itemlist/index';
//import {dbContext} from '../context/dbContext';
import { getFirestore } from '../firebase/index';

const ItemListContainer = ({greeting}) =>{
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  //const dbContextUse = useContext(dbContext);
  //const { prods } = useContext(dbContext);
  /*function onAdd(){
    alert('agregando  al carrito.');
  }*/


  useEffect(() => {

    // const promesa = new Promise ((resolve, reject) => {
    //    setTimeout( () => {
    //     resolve(
    //       [{id: 1, categoryId:1, categoryName:'Relojes Automáticos', name: 'Frederique Constant Horological', description: 'DAFC285V5B4 - Automático', image: window.location.origin +'/images/producto-1.jpg', stock: 3, price:2000},
    //        {id: 2, categoryId:2, categoryName:'Relojes de Pila', name: "D'Mario Academy", description: "ZL3113 - Pila", image: window.location.origin +'/images/producto-2.jpg', stock: 20, price:200},
    //        {id: 3, categoryId:1, categoryName:'Relojes Automáticos', name: 'Tissot complication T Squelette', description: 'T0704051641100 - Automático', image: window.location.origin +'/images/producto-3.jpg', stock: 5, price:3000}
    //       ])
    //     }, 2000);
    //   });
    //
    // promesa.then( e => {
    //   let products;
    //   if (typeof(categoryId) !== 'undefined' && categoryId != null) {
    //     products = e.filter((el) => {
    //       return el.categoryId === parseInt(categoryId)
    //     });
    //   } else {
    //      products = e;
    //   }
    //   setProducts(products);
    //
    // });
    let products;
    const db = getFirestore();
    const itemCollection = db.collection("items");
    //console.log(itemCollection)
    if (typeof(categoryId) !== 'undefined' && categoryId != null) {
      const categoryCollection = itemCollection.where('categoryName','==',categoryId);
      categoryCollection.get().then((querySnapshot) =>{
         if(querySnapshot.size === 0){
           console.log('No results!');
         }

         let aux = querySnapshot.docs.map(doc => {

              return { ...doc.data(), id: doc.id };
         });
         // console.log('---ITEMS-------');
         // console.log(aux);
         setProducts(aux);

      }).catch((error) =>{
        console.log(error);
      }).finally(() =>{
      });
    } else {
      itemCollection.get().then((querySnapshot) =>{
         if(querySnapshot.size === 0){
           console.log('No results!');
         }

         let aux = querySnapshot.docs.map(doc => {

              return { ...doc.data(), id: doc.id };
         });
         //console.log('---ITEMS-------');
         //console.log(aux);
         setProducts(aux);
      }).catch((error) =>{
        console.log(error);
      }).finally(() =>{
      });
    }


  }, [categoryId]);

  return (

    <>
     <div className="h1">{greeting}</div>
      {/* <ItemCount stock={5} initial={1} onAdd={onAdd}/>*/}
     <ItemList products={products}/>
    </>

  );
}

export default ItemListContainer;
