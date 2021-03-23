import React , {useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore } from '../../firebase/index';
import firebase from 'firebase/app';
import '@firebase/firestore';
import './register.css';

const Register = () =>{
  const [isVal, setIsVal] = useState(true);
  const [msg, setMsg] = useState('');
  const [datos, setDatos] = useState({
        name: '',
        email: '',
        pwd: '',
        pwdConfirmation: ''
   });
   const handleInputChange = (event) => {
         //console.log(datos);
         //console.log(event.target.name)
         //console.log(event.target.value)
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
    if (datos.name === '' || datos.name === null) {
        msg = msg + 'El nombre no puede ser vacío';
        isValid = false;
    }
    if (datos.email === '' || datos.email === null) {
      if(msg===''){
        msg = msg + 'El correo electrónico no puede ser vacío';
      }else{
        msg = msg + ', el correo electrónico no puede ser vacío';
      }
      isValid = false;
    }else if(!regex.test(datos.email)){
      if(msg===''){
        msg = msg + 'El correo electrónico es incorrecto';
      }else{
        msg = msg + ', el correo electrónico es incorrecto';
      }
      isValid = false;
    }
    if (datos.pwd === '' || datos.pwd === null) {
      if(msg===''){
        msg = msg + 'La contraseña no puede ser vacía';
      }else{
        msg = msg + ', la contraseña no puede ser vacía';
      }
      isValid = false;
    }else if(datos.pwd !== datos.pwdConfirmation) {
      if(msg===''){
        msg = msg + 'Ambas contraseñas deben coincidir';
      }else{
        msg = msg + ', ambas contraseñas deben coincidir';
      }
      isValid = false;
    }
    //console.log(isValid);
    if(isValid){
      const db = getFirestore();
      const oUser = db.collection("users");
      const o_User = oUser.where('email','==',datos.email);
      o_User.get().then((d) =>{
          if(d.size !== 0){
            msg = "Ya existe un usuario registrado con el mismo correo";
            setIsVal(false);
            setMsg(msg);
          }else{
            const newUser = {
              name: datos.name,
              email:datos.email,
              password: datos.pwd,
              registerDate:firebase.firestore.Timestamp.fromDate(new Date()),
            }
            //Insertar nuevo usuario en la base de datos que se ha registrado
            oUser.add(newUser).then(({ id }) =>{
              alert("El usuario se ha registrado con éxito ahora puede iniciar sesión.");
              event.target.reset();

            }).catch(err => {
               console.log(err);
            }).finally(() => {

            });
            setIsVal(true);
            setMsg('');
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
  return (

    <>
      <form className="f" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" placeholder="Nombre" className="form-control" name="name" onChange={handleInputChange}/>
      </div>
       <div className="form-group">
         <input type="text" placeholder="Email" className="form-control" name="email" onChange={handleInputChange}/>
       </div>
       <div className="form-group">
         <input type="password" placeholder="Contraseña" className="form-control" name="pwd" onChange={handleInputChange}/>
       </div>
       <div className="form-group">
         <input type="password" placeholder="Confirmar Contraseña" className="form-control" name="pwdConfirmation" onChange={handleInputChange}/>
       </div>
       <div className="form-group">
         <input type="submit" value="Registrarse" className="button" />
       </div>
       <div className="form-group">
         <Link to={`/login`}>
                 <h5 style={{textAlign: "center"}}>Inicio de sesión</h5>
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

export default Register;
