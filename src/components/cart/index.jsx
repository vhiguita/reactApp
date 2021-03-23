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
  const { product, addItem, removeItem, clear, clearElements, isCartEmpty, totalPrice, isLogged } = useContext(cartContext);
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  const [numOrder, setNumOrder] = useState('');
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [isOrderCreated, setOrderCreated] = useState(false);
  //const [isLogged, setIsLogged] = useState(false);
  const [isVal, setIsVal] = useState(true);
  const [datos, setDatos] = useState({
        name: '',
        //email: '',
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
    let mail = window.localStorage.getItem('email');
    //console.log('mail:'+mail);
    useEffect(() => {
       if(mail !== null){
          setEmail(mail);
          //setIsLogged(true);
       }else{
          setEmail('');
          //setIsLogged(false);
       }
       if(isCartEmpty){
          setMsg('');
       }
     }, []);
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
    setMsg('');
    clear();
  }
  function removeItemFromCart(id,q){
    //alert(id);
    removeItem(id,q);
  }
  //Generar nueva orden de compra
  function newOrder(){
   // setIsValid(true);
    let isValid = true;
    let msg = '';
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

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
    if (datos.emailConfirmation === '' || datos.emailConfirmation === null) {
     if(msg===''){
       msg = msg + 'El correo electrónico de confirmación no puede ser vacío';
     }else{
       msg = msg + ', el correo electrónico de confirmación no puede ser vacío';
     }
     isValid = false;
   }else if(!regex.test(datos.emailConfirmation)){
     if(msg===''){
       msg = msg + 'El correo electrónico es incorrecto';
     }else{
       msg = msg + ', el correo electrónico es incorrecto';
     }
     isValid = false;
   }else if(email !== datos.emailConfirmation) {
      if(msg===''){
        msg = msg + 'Ambos correos electrónicos deben coincidir';
      }else{
        msg = msg + ', ambos correos electrónicos deben coincidir';
      }
      isValid = false;
    }
    //console.log(isValid);
    //console.log(msg);
    if(isValid){
      const db = getFirestore();
      const orders = db.collection("orders");
      const newOrder_ = {
        buyer:{ name: datos.name, phone: datos.phone, email: datos.emailConfirmation},
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
        clearElements();
      }).catch(err => {
         console.log(err);
      }).finally(() => {

      });
      setIsVal(true);
      setMsg('');
    }else{
      //alert(msg);
      setIsVal(false);
      setMsg(msg);
    }

  }
  return (

    <>
    <div className="content">
    {isCartEmpty ?
      <div>
          <Link to='/'><div className="center"><button style={{width: '200px', height: '60px', minWidth: '200px', display:'block'}}>Lista de productos</button></div></Link>
          <div style={{ textAlign: "center"}}>El carro esta vacío.</div>
      </div>
      :<div className="center"><button style={{width: '200px', height: '60px', minWidth: '200px', display:'block'}} onClick={clearCart}>Vaciar carrito</button></div>
    }

     <div>
     {isCartEmpty ?
       <>
       </>
       :<form className="frm">
       <div className="form-group">
         <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="name" />
       </div>
       <div className="form-group">
           <input type="text" placeholder="Teléfono" className="form-control" onChange={handleInputChange} name = "phone" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="" className="form-control" value={email} name="email" readOnly/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Confirmar correo electrónico" className="form-control" onChange={handleInputChange} name="emailConfirmation" />
        </div>
       </form>
       }
       {isVal ?
         <></>
         :<h5 style={{textAlign: "center", color:"red"}}>{msg}</h5>
       }

       <table id='products'>
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
                             <button onClick={()=>{removeItemFromCart(prod.item.id,prod.quantity)}}>Eliminar</button>
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
        <div style={{ textAlign: "center"}}>
         <strong>TOTAL = </strong> {formatter.format(totalPrice)}
        </div>
        {isLogged ?<div className="center"><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}} onClick={newOrder}>Finalizar compra</button></div>:<Link to='/login'><div className="center"><button style={{width: '100px', height: '60px', minWidth: '200px', display:'block'}}>Iniciar sesión</button></div></Link>}
        </div>
     }
     {isOrderCreated ?
       <><h5 style={{textAlign: "center", color:"red"}}>Se ha generado la orden # {numOrder}.</h5></>
       :<></>
     }
     </div>
    </>

  );
}

export default Cart;
