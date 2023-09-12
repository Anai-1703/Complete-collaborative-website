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

    } catch (error) {
      console.error(error);
    }
  };
}