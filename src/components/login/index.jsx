import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () =>{
  return (

    <>
    <form>
     <div className="form-group">
       <input type="text" placeholder="Email" className="form-control" name="email" />
     </div>
     <div className="form-group">
       <input type="password" placeholder="Contraseña" className="form-control" name="pwd" />
     </div>
     <div className="form-group">
       <input type="submit" value="Iniciar" className="btn btn-success" />
     </div>
     <div className="form-group">
       <Link to={`/register`}>
               <h5 style={{textAlign: "center"}}>Registro</h5>
       </Link>
     </div>
    </form>

    </>

  );
}

export default Login;
