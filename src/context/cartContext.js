import React, {createContext, useState} from 'react';


export const cartContext = createContext();
//const[product,setProduct] = useState([]);
// export const getCartContext = () => {
//   return useContext(cartContext);
// }

function CartContext({children}){
//const CartContext = ({children}) =>{
  const[product,setProduct] = useState([]);
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
    }
  }
  const removeItem = (id) =>{
    const newProducList = product.filter(prod =>prod.item.id !== id);
    //const newProducList = product.splice(id, 1);
    setProduct(newProducList);
  }
  const isInCart = (id) =>{
    //console.log(product);
    return product.findIndex(prod =>prod.item.id === id);
  }
  const clear = () =>{
    setProduct([]);
    //console.log(product);
  }
  return (

    <cartContext.Provider value={{
      product,
      addItem,
      removeItem,
      clear,
     }}>
     {children}
    </cartContext.Provider>

  );
}

export default CartContext;
