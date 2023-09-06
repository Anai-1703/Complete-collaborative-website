import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendRegister } from "../services/sendRegister";
import "../styles/GenericForm.css";
// import "../styles/index.css"

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameMember: "",
    email: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    acceptedTOS: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validar los campos antes de procesar el registro
    if (
      formData.nameMember === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.repeatPassword === "" ||
      formData.birthday === "" ||
      !formData.acceptedTOS
    ) {
      alert("Completa todos los campos");
      return;
    }

    // añadido Ana:
     // Comparar las contraseñas para asegurarse de que coincidan
  if (formData.password !== formData.repeatPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }
  
    try {
      // Enviar los datos del formulario al servidor
      const response = await sendRegister(formData);

      // Manejar la respuesta del servidor
      if (response && response.success) {
        alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Hubo un error en el registro. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="form">
    <form className="register-form" onSubmit={handleCreate}>
      <h2>Register</h2>
      <input
        type="text"
        name="nameMember"
        placeholder="Name *"
        value={formData.nameMember}
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

      {/* Botón para crear cuenta */}
      <button type="submit" className="btn" name="createAccountButton">
        Create
      </button>

      {/* Enlace para ir a LoginPage(inicio sesión) */}
      <p className="message">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
      <p className="message">
        <Link to="/tos">Términos y Condiciones de Level Up!</Link>
      </p>
    </form>
    </div>
  );
}
