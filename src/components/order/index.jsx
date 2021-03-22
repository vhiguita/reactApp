import React , {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';
import './order.css';

const Order = (props) =>{
  const [noOrder, setNoOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  useEffect(() => {

    const db = getFirestore();
    const orderCollection = db.collection("orders");
    let email = window.localStorage.getItem('email');
    //const o_Collection = orderCollection.where('buyer.email','==','vhiguitacardona@gmail.com');
    if(email !== null){
      //Obtener las ordenes o compras del usuario
      const o_Collection = orderCollection.where('buyer.email','==',email);
      o_Collection.get().then((d) =>{
          if(d.size === 0){
            console.log('No results!');
            setNoOrder(true);
          }else{
            let aux = d.docs.map(doc => {
                  let s = '';
                  console.log(doc.data().items[0].item);
                  for(let i=0;i<doc.data().items.length;i++){
                    s = s + '('+doc.data().items[i].quantity+') - '+doc.data().items[i].item.name+',';
                  }
                  s = s.substring(0, s.length - 1);
                  console.log(s);
                  return { ...doc.data(), detail: s, id: doc.id };
            });
            console.log(aux);
            setOrders(aux);
          }
        }).catch((error) =>{
          console.log(error);
        }).finally(() =>{
        });
    }else{
      //setNoOrder(true);
    }


  }, []);
  return (

    <>
    <div className="content">
      <table id='orders'>
               <thead>
                 <tr>
                   <th>Ref compra</th>
                   <th>Detalle</th>
                   <th>Total</th>
                   <th>Fecha</th>
                  </tr>
               </thead>
               <tbody>
               {orders.map((o)=>{
                 return (
                   <tr key={o.id}>
                       <td>{o.id}</td>
                       <td>{o.detail}</td>
                       <td>{formatter.format(o.total)}</td>
                       <td>{new Date((o.date.toDate())).toString()}</td>
                   </tr>
                 )})}
               </tbody>
       </table>
       {noOrder ?
         <h5 style={{textAlign: "center", color:"red"}}>No hay pedidos.</h5>
         :<></>
       }
     </div>
    </>

  );
}

export default Order;
