
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    birthday: '',
    acceptedTOS: false

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos antes de procesar el registro
    if (

      formData.name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.repeatPassword === '' ||
      formData.birthday === '' ||
      !formData.acceptedTOS
    ) {
      alert('Completa este campo');

      return;
    }

    // Redireccionar al usuario a la página de inicio de sesión

    window.location.href = '/login';
  };
  
  const handleCreate = (e) => {
    e.preventDefault();
    // lógica para procesar el registro   
  };

return (

    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name *"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password *"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="repeatPassword"
        placeholder="Repeat Password *"
        value={formData.repeatPassword}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="birthday"
        placeholder="Birthday *"
        value={formData.birthday}
        onChange={handleChange}
        required
      />
      <label>
        AcceptedTOS
        <input
          type="checkbox"
          name="acceptedTOS"
          checked={formData.acceptedTOS}
          onChange={handleChange}
          required
        />
      </label>


    {/*  Botón para crear cuenta */}
    <button type="submit" className="btn" name="createAccountButton">Create</button>

 
    {/*  Enlace para ir a LoginPage(inicio sesión) */}
      <p className="message">Already registered? 
      <Link to="/login">Sign In</Link>

      </p>
    </form>
  );
}
