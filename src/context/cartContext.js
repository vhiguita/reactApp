import React, {createContext, useState} from 'react';
import { getFirestore } from '../firebase/index';
//import firebase from 'firebase/app';
import '@firebase/firestore';

export const cartContext = createContext();

function CartContext({children}){
  const[isCartEmpty,setIsCartEmpty] = useState(true);
  const[product,setProduct] = useState([]);
  const[totalPrice, setTotalPrice] = useState(0);
  const[numProd, setNumProd] = useState(0);
  const [isLogged, setIsLogged] = useState(false); //Si el usuario esta logeado o no
  //const [nStock, setStock] = useState(item.item.stock); //Stock disponible

  //Agregar nuevo item al carro de compras
  const addItem = (item) => {
    console.log(item);
    console.log('id='+item.item.id);
    const b = isInCart(item.item.id);
    const q = item.quantity;
    const db = getFirestore();

    let prodId = item.item.id;
    let docRef = db.collection("items").doc(prodId);

    let updateStock = docRef.update({
       stock: item.item.stock - q
    });

    //console.log('q='+q);
    if(b === -1){
       //console.log(item);
       item.item.stock = item.item.stock - q;
       console.log(item);
       product.push(item);
       //console.log(product);
       setProduct(product);
       setIsCartEmpty(false);
    }else{
      let i = 0;
      while(i<product.length){
        console.log(product[i].item);
        if(product[i].item.id === item.item.id){
          product[i].quantity = product[i].quantity + q;
          product[i].item.stock = product[i].item.stock - q;
          break;
        }
        i = i + 1;
      }
      console.log(product);
      setProduct(product);
      setIsCartEmpty(false);
    }

    let total =0;
    let j = 0;
    let n = 0;
    while(j<product.length){
      let price = product[j].item.price * product[j].quantity;
      n = n + product[j].quantity;
      console.log(price);
      total = total + price;
      j = j + 1;
    }
    setTotalPrice(total);
    setNumProd(n);
    console.log("cantidad de productos:"+n);
  }
  //Eliminar un item del carro de compras
  const removeItem = (id, q) =>{
    console.log(id);
    console.log(q);
    const newProducList = product.filter(prod =>prod.item.id !== id);
    //const newProducList = product.splice(id, 1);
    if(newProducList.length ===0){
       setIsCartEmpty(true);
    }
    setProduct(newProducList);
    let total =0;
    let j = 0;
    let n = 0;
    while(j<newProducList.length){
      let price = newProducList[j].item.price * newProducList[j].quantity;
      n = n + newProducList[j].quantity;
      console.log(price);
      total = total + price;
      j = j + 1;
    }
    setTotalPrice(total);
    setNumProd(n);
    console.log("cantidad de productos:"+n);
    const db = getFirestore();
    const itemCollection = db.collection("items");
    itemCollection.doc(id).get().then((d) =>{
      if (d.exists) {
         console.log(d.data());
         console.log(d.data().stock);
         let docRef = itemCollection.doc(id);

         let updateStock = docRef.update({
            stock: d.data().stock + q
         });
       } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
       }

    }).catch((error) =>{
      console.log(error);
    }).finally(() =>{
    });
  }
  //Si el item ya esta en el carro de compras
  const isInCart = (id) =>{
    //console.log(product);
    return product.findIndex(prod =>prod.item.id === id);
  }
  //Si un usuario esta logeado o no
  const setLogged = (b)=>{
    //console.log(product);
    setIsLogged(b);
  }
  //Limpiar carro de compras
  const clear = () =>{
    let i = 0;
    const db = getFirestore();
    const itemCollection = db.collection("items");
    while(i<product.length){
      let id = product[i].item.id;
      console.log(id);
      console.log(i);
      let docRef = db.collection("items").doc(id);

      let updateStock = docRef.update({
         stock: product[i].item.stock + product[i].quantity
      });
      i = i + 1;
    }
    setProduct([]);
    setTotalPrice(0);
    setIsCartEmpty(true);
    setNumProd(0);
    //console.log(product);
  }

  //Limpiar carro de compras al finalizar la orden de compra
  const clearElements = () =>{
    setProduct([]);
    setTotalPrice(0);
    setIsCartEmpty(true);
    setNumProd(0);
    //console.log(product);
  }
  return (

    <cartContext.Provider value={{
      product,
      addItem,
      removeItem,
      clear,
      clearElements,
      isCartEmpty,
      totalPrice,
      numProd,
      isLogged,
      setLogged,
     }}>
     {children}
    </cartContext.Provider>

  );
}

export default CartContext;
