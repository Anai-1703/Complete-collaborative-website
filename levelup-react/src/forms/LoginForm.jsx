import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../services/token/saveToken";
import { sendLogin } from "../services/sendLogin";
import "../styles/LoginForm.css"

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''

  });

  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState(false); // Nuevo estado para controlar los errores de inicio de sesión

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); //limpiar cualquier mensajde de error previo
    setLoginError(false);  // Reiniciar el estado de error de inicio de sesión
    const [footerColor, setFooterColor] = useState(''); // Color por defecto para el footer
    if (!formData.email || !formData.password) {
      setError("Invalid email or password."); // Mostrar mensaje de error si la contraseña está vacía
      return;
    }

    try {
      const response = await sendLogin(formData);
      console.log(response);
      console.log(response.data.token);
      
      saveToken(response.data.token); // Guardar el token en el localStorage
      // Redireccionar a la ruta principal
      navigate('/') ;
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
      setLoginError(true); // Establecer loginError en true para indicar que ha ocurrido un error de inicio de sesión
      navigate('/login');
    }
  };

  return (
   <div>
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

    {/* Mostrar el mensaje de error solo cuando loginError es true */}
    {loginError && <p className="error-message">{error}</p>} 

    <div className="form-btn">
      {/* Deshabilitar el botón de "Sign in" cuando loginError es true */}
      <button type="submit" className="btn" disabled={loginError}>Sign in</button>  
           <p className="message">Si no tienes una cuenta: {' '} 
      {/* Botón para crear cuenta */}
        <Link to="/register">Create an account</Link>
      </p>
    </div>
    </form>
    <footer 
      className="footer-login">     
    </footer>
    </div>
  );
}

