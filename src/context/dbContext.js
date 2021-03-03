import React, {createContext, useEffect, useState} from 'react';
import { getFirestore } from './../firebase/index';

export const dbContext = createContext();

function DbContext({children}){

  const[prods,setProds] = useState([]);

   useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items");
        itemCollection.get().then((querySnapshot) =>{
           if(querySnapshot.size === 0){
             console.log('No results!');
           }
           console.log(querySnapshot.docs.map(doc => doc.data()))
           setProds(querySnapshot.docs.map(doc => doc.data()));
        }).catch((error) =>{
          console.log(error);
        }).finally(() =>{
        });
  }, []);


  return (

    <dbContext.Provider value={{
      prods,
      setProds,
     }}>
     {children}
    </dbContext.Provider>

  );
}

export default DbContext;
