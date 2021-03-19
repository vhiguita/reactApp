import React , {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';

const Order = (props) =>{
  const [orders, setOrders] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: 0
  });
  useEffect(() => {

    const db = getFirestore();
    const orderCollection = db.collection("orders");
    const o_Collection = orderCollection.where('buyer.email','==','vhiguitacardona@gmail.com');
    o_Collection.get().then((d) =>{
        if(d.size === 0){
          console.log('No results!');
        }

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
      }).catch((error) =>{
        console.log(error);
      }).finally(() =>{
      });

  }, []);
  return (

    <>
    <table id='product'>
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
                  // <tr key={prod.item.id}>
                  //     <td>{prod.quantity}</td>
                  //     <td>{prod.item.name}</td>
                  //     <td>{formatter.format(prod.item.price)}</td>
                  //     <td>{formatter.format(prod.item.price * prod.quantity)}</td>
                  //     <td><img className="image" src={prod.item.image}/></td>
                  //     <td className='opration'>
                  //         <button onClick={()=>{removeItemFromCart(prod.item.id)}}>Eliminar</button>
                  //     </td>
                  // </tr>
               )})}
             </tbody>
     </table>
    </>

  );
}

export default Order;
