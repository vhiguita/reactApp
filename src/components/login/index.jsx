import React , {useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';
import {cartContext} from '../../context/cartContext';
import './login.css';

const Login = () =>{
  const history = useHistory();
  const { setLogged } = useContext(cartContext);
  const [datos, setDatos] = useState({
        email: '',
        pwd: ''
  });
  const [msg, setMsg] = useState('');
  const [isVal, setIsVal] = useState(true);
  const handleInputChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    let msg = '';
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //alert('enviando datos...' + datos.email + ' ' + datos.pwd);
    if (datos.email === '' || datos.email === null) {
      msg = msg + 'El correo electrónico no puede ser vacío';
      isValid = false;
    }else if(!regex.test(datos.email)){
      msg = msg + 'El correo electrónico es incorrecto';
      isValid = false;
    }
    if (datos.pwd === '' || datos.pwd === null) {
      if(msg===''){
        msg = msg + 'La contraseña no puede ser vacía';
      }else{
        msg = msg + ', la contraseña no puede ser vacía';
      }
      isValid = false;
    }
    if(isValid){
      const db = getFirestore();
      const itemUser = db.collection("users");
      const o_User = itemUser.where('email','==',datos.email).where('password', '==', datos.pwd);
      o_User.get().then((d) =>{
          if(d.size === 0){
            console.log('No results!');
            msg = "El usuario no esta registrado o los datos ingresados no son correctos";
            setIsVal(false);
            setMsg(msg);
          }else{
            window.localStorage.setItem('email', datos.email);
            setLogged(true);
            setIsVal(true);
            setMsg('');
            history.push('/cart');
          }
        }).catch((error) =>{
          console.log(error);
        }).finally(() =>{
        });
    }else{
      setIsVal(false);
      setMsg(msg);
    }
  }
  useEffect(() => {

   }, []);

  return (
    <>
    <form className="f" onSubmit={handleSubmit}>
     <div className="form-group">
       <input type="text" placeholder="Email" className="form-control" name="email" onChange={handleInputChange}/>
     </div>
     <div className="form-group">
       <input type="password" placeholder="Contraseña" className="form-control" name="pwd" onChange={handleInputChange}/>
     </div>
     <div className="form-group">
       <input type="submit" value="Iniciar" className="button"/>
     </div>
     <div className="form-group">
       <Link to={`/register`}>
               <h5 style={{textAlign: "center"}}>Registro</h5>
       </Link>
     </div>
    </form>
    {isVal ?
      <></>
      :<h5 style={{textAlign: "center", color:"red"}}>{msg}</h5>
    }
    </>

  );
}

export default Login;
