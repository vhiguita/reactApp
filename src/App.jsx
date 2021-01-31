//import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/navbar/index';
import ItemListContainer from './containers/ItemListContainer';

const App = () =>{
  return (
    <>
      <NavbarComponent/>
      <ItemListContainer greeting="Mi Componente ItemList"/>
    </>
    
  );
}

export default App;
