import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './item.css';

const Item = (props) =>{
 // const formatter = new Intl.NumberFormat('en-US', {
 //     style: 'currency',
 //     currency: 'USD',
 //     minimumFractionDigits: 0
 //  });
  return (

    <>
    <div className='card'>
     <img src={props.image}/>
     <h3 style={{textAlign: "center"}}>{props.name}</h3>
     <Link to={`/item/${props.id}`}> {/* que nos lleve al detalle del libro pormedio del id */}
            <h4 style={{textAlign: "center"}}>Ver producto</h4>
      </Link>
     {/* <p>Precio: {formatter.format(props.price)}</p>*/}
    </div>


    </>

  );
}

export default Item;
