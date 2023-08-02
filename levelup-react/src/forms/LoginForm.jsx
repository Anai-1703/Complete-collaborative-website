
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveToken } from "../services/token/saveToken";
import { sendLogin } from "../services/sendLogin";
import "../styles/LoginForm.css"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [name]: value
    }));
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al servidor
    try {
      const response = await sendLogin(formData);
      console.log(response);
      console.log(response.data.token);
      
      saveToken(response.data.token); // Guardar el token en el localStorage
      // Redireccionar a la ruta principal
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      // Manejar el error de inicio de sesión
    }
  };

  return (
   
    <form className="login-form" method="post" onSubmit={handleSubmit}>
       <h2>Login</h2>
       
        <input 
        type="text" 
        name= "email"
        className="email"
        placeholder="Email" 
        value={formData.email}
        onChange={handleChange}
        required 
      />
      <input 
        type="password" 
        name="password"
        className="password"
        placeholder="Password"  
        value={formData.password}
        onChange={handleChange}
        required
      />
      
    <div className="form-btn">
      <button type="submit" className="btn">Sign in</button>  
      <p className="message">Not registered?{' '}
        <Link to="/guest-register"> Guest</Link>
      </p>
      <p className="message">Or register as{' '} 
        <Link to="/register">Create an account</Link>
      </p>
    </div>
    </form>
  );
}

