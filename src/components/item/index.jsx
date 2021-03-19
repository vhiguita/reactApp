import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './item.css';

const Item = (props) =>{
  const [isCartVisible, setIsCartVisible] = useState(true);
  console.log(props);
 // const formatter = new Intl.NumberFormat('en-US', {
 //     style: 'currency',
 //     currency: 'USD',
 //     minimumFractionDigits: 0
 //  });
 useEffect(() => {
    if(props.stock===0){
      setIsCartVisible(false);
    }
  }, []);
  return (

    <>
    <div className='card'>
     <img src={props.image}/>
     <h3 style={{textAlign: "center"}}>{props.name}</h3>
     {isCartVisible ?<Link to={`/item/${props.id}`}> {/* que nos lleve al detalle del libro pormedio del id */}
            <h4 style={{textAlign: "center"}}>Ver producto</h4>
      </Link>:<h5 style={{textAlign: "center", color:"red"}}>Producto agotado.</h5>}
     {/* <p>Precio: {formatter.format(props.price)}</p>*/}
    </div>


    </>

  );
}

export default Item;
