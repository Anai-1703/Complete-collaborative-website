import { useState} from 'react';

export function RegisterForm() {
  const [formData, setFormData]= useState ({
    nameMember: '',
    email: '',
    password: '',
    repeatPassword: '',
    birthday: '',
    acceptedTOS: false
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed.');
      }
  
      // La solicitud se realizó correctamente, puedes realizar acciones adicionales, como mostrar un mensaje de éxito o redirigir a otra página.
    } catch (error) {
      // La solicitud falló, puedes mostrar un mensaje de error o realizar acciones adicionales de manejo de errores.
      console.log(error);
    }
  };
}