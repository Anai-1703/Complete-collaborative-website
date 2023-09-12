import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { saveToken } from '../services/token/saveToken';
import { sendLogin } from '../services/sendLogin';
import Modal from '../components/Modal';
import "../styles/GenericForm.css";
// import "../styles/index.css"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para mostrar el modal de error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendLogin(formData);
      const tokenSaved = saveToken(response.data.token); // Guardar el token en el localStorage
      window.location.href = '/';
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setFormData({
      email: '',
      password: ''
    })
  };
  
  return (
    <>
      <section className="form">
        <form className="login-form" method="post" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input 
            type="text" 
            name= "email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 

            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Sign in</button>  
          <p className="message">¿No estás registrado?{' '}
            <Link to="/register">¡Regístrate!</Link>
          </p>
          <p className="message">
        <Link to="/tos">Términos y Condiciones de Level Up!</Link>
        </p>
        </form>
        {showErrorModal && <Modal type="login" visible={showErrorModal} onClose={closeModal} autoCloseTimeout={null} />}
      </section>
  </>
  );
}

