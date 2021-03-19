import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () =>{
  return (

    <>
      <form>
      <div className="form-group">
        <input type="text" placeholder="Nombre" className="form-control" name="name" />
      </div>
       <div className="form-group">
         <input type="text" placeholder="Email" className="form-control" name="email" />
       </div>
       <div className="form-group">
         <input type="password" placeholder="Contraseña" className="form-control" name="pwd" />
       </div>
       <div className="form-group">
         <input type="password" placeholder="Confirmar Contraseña" className="form-control" name="confirmPwd" />
       </div>
       <div className="form-group">
         <input type="submit" value="Registrarse" className="btn btn-success" />
       </div>
      </form>
    </>

  );
}

export default Register;
