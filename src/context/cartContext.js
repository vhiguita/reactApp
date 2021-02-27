import React, {createContext, useState} from 'react';


export const cartContext = createContext();
//const[product,setProduct] = useState([]);
// export const getCartContext = () => {
//   return useContext(cartContext);
// }

function CartContext({children}){
//const CartContext = ({children}) =>{
  const[isCartEmpty,setIsCartEmpty] = useState(true);
  const[product,setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numProd, setNumProd] = useState(0);

  const addItem = (item) => {
    //console.log(item);
    //console.log('id='+item.item.id);
    const b = isInCart(item.item.id);
    const q = item.quantity;
    //console.log('q='+q);
    if(b === -1){
       product.push(item);
       //console.log(product);
       setProduct(product);
       setIsCartEmpty(false);
    }else{
      let i = 0;
      while(i<product.length){
        if(product[i].item.id === item.item.id){
          product[i].quantity = product[i].quantity + q;
          break;
        }
        i = i + 1;
      }
      //console.log(product);
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
  const removeItem = (id) =>{
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
  }
  const isInCart = (id) =>{
    //console.log(product);
    return product.findIndex(prod =>prod.item.id === id);
  }
  const clear = () =>{
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
      isCartEmpty,
      totalPrice,
     }}>
     {children}
    </cartContext.Provider>

  );
}

export default CartContext;
