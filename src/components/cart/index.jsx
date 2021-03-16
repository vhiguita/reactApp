import React, {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cart.css';
import {cartContext} from '../../context/cartContext';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';

const Cart = () =>{

  const cartContextUse = useContext(cartContext);
  const { product, addItem, removeItem, clear, isCartEmpty, totalPrice } = useContext(cartContext);
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  const [numOrder, setNumOrder] = useState('');
  const [isOrderCreated, setOrderCreated] = useState(false);
  //const [isValid, setIsValid] = useState(true);
  const [datos, setDatos] = useState({
        name: '',
        email: '',
        emailConfirmation: '',
        phone: ''
   });
   const handleInputChange = (event) => {
         // console.log(event.target.name)
         // console.log(event.target.value)
         setDatos({
             ...datos,
             [event.target.name] : event.target.value
         })
    }
  // useEffect(() => {
  //   //console.log(id);
  //   let total =0;
  //   product.map(prod => {
  //                 console.log(totalPrice);
  //                 console.log(prod);
  //                 let price = prod.item.price * prod.quantity;
  //                 console.log(price);
  //                 total = total + price;
  //                 console.log(total);
  //                 // setTotalPrice(totalPrice);
  //   });
  //   setTotalPrice(total);
  // }, []);
  function clearCart(){
    console.log('Vaciando carro de compras:');
    clear();
  }
  function removeItemFromCart(id){
    //alert(id);
    removeItem(id);
  }
  function newOrder(){
   // setIsValid(true);
   let isValid = true;
   console.log('enviando datos...' + datos.name + ' ' + datos.email + ' ' + datos.phone);
   console.log(datos.name);
    let msg = '';
    if (datos.name === '' || datos.name === null) {
        msg = msg + 'El nombre no puede ser vacío';
        isValid = false;
    }
    if (datos.phone === '' || datos.phone === null) {
      if(msg===''){
        msg = msg + 'El teléfono no puede ser vacío';
      }else{
        msg = msg + ', el teléfono no puede ser vacío';
      }
      isValid = false;
    }
    if (datos.email === '' || datos.email === null) {
      if(msg===''){
        msg = msg + 'El correo electrónico no puede ser vacío';
      }else{
        msg = msg + ', el correo electrónico no puede ser vacío';
      }
      isValid = false;
    }else if(datos.email !== datos.emailConfirmation) {
      if(msg===''){
        msg = msg + 'Ambos correos electrónicos deben coincidir';
      }else{
        msg = msg + ', ambos correos electrónicos deben coincidir';
      }
      isValid = false;
    }
    console.log(isValid);
    console.log(msg);
    if(isValid){
      const db = getFirestore();
      const orders = db.collection("orders");
      const newOrder_ = {
        buyer:{ name: datos.name, phone: datos.phone, email: datos.email},
        items: product,
        date:firebase.firestore.Timestamp.fromDate(new Date()),
        total: totalPrice,
      }
      orders.add(newOrder_).then(({ id }) =>{
        setNumOrder(id);
        setOrderCreated(true);
        setTimeout(() => setOrderCreated(false),
          5000
        );
        clear();
      }).catch(err => {
         console.log(err);
      }).finally(() => {

      });
    }else{
      alert(msg);
    }

  }
  return (

    <>
    {isCartEmpty ?
      <div>
          <Link to='/'><div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}}>Relojes</button></div></Link>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>El carro esta vacío.</div>
      </div>
      :<div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={clearCart}>Vaciar carrito</button></div>
    }

     <div>
     {isCartEmpty ?
       <>
       </>
       :<form>
       <div className="col-md-3">
         <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="name" />
       </div>
       <div className="col-md-3">
           <input type="text" placeholder="Teléfono" className="form-control" onChange={handleInputChange} name = "phone" />
        </div>
        <div className="col-md-3">
          <input type="text" placeholder="Email" className="form-control" onChange={handleInputChange} name="email" />
        </div>
        <div className="col-md-3">
          <input type="text" placeholder="Confirm Email" className="form-control" onChange={handleInputChange} name="emailConfirmation" />
        </div>
       </form>
       }

       <table id='product'>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio Unit.</th>
                    <th>Precio Total</th>
                    <th>Imagen</th>
                    <th></th>
                   </tr>
                </thead>
                <tbody>
                {product.map((prod)=>{
                  return (
                     <tr key={prod.item.id}>
                         <td>{prod.quantity}</td>
                         <td>{prod.item.name}</td>
                         <td>{formatter.format(prod.item.price)}</td>
                         <td>{formatter.format(prod.item.price * prod.quantity)}</td>
                         <td><img className="image" src={prod.item.image}/></td>
                         <td className='opration'>
                             <button onClick={()=>{removeItemFromCart(prod.item.id)}}>Eliminar</button>
                         </td>
                     </tr>
                  )})}
                </tbody>
        </table>
     </div>
     {isCartEmpty ?
       <>
       </>
       :<div>
        <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
         <strong>TOTAL = </strong> {formatter.format(totalPrice)}
        </div>
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={newOrder}>Finalizar compra</button></div>
        </div>
     }
     {isOrderCreated ?
       <><h5 style={{textAlign: "center", color:"red"}}>Se ha generado la orden # {numOrder}.</h5></>
       :<></>
     }
    </>

  );
}

export default Cart;
