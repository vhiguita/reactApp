
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCount from './../components/itemcount/index';
const ItemListContainer = ({greeting}) =>{
  return (
     
    <>
     <div className="h1">{greeting}</div>
     <ItemCount stock="5" initial="1"/>
    </>
   
  );
}

export default ItemListContainer;
