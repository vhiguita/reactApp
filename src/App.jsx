//import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/navbar/index';
import ItemListContainer from './containers/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';

const App = () =>{
  return (
    <>
      <NavbarComponent/>
      {/* <ItemListContainer greeting="Este es el listado de productos."/>*/}
      <ItemDetailContainer/>
    </>

  );
}

export default App;
