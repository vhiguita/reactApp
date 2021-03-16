import React , {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';

const Order = (props) =>{
  const [orders, setOrders] = useState([]);
  useEffect(() => {

    const db = getFirestore();
    const orderCollection = db.collection("orders");
    const o_Collection = orderCollection.where('buyer.email','==','vhiguitacardona@gmail.com');
    o_Collection.get().then((d) =>{
        if(d.size === 0){
          console.log('No results!');
        }
        let aux = d.docs.map(doc => {

              return { ...doc.data(), id: doc.id };
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
    </>

  );
}

export default Order;
