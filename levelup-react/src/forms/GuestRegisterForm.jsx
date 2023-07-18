

      [name]: value

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
  // Validar los campos antes de procesar el registro
  if (
    guestData.name === '' ||
    guestData.email === '' ||
    guestData.password === ''
  ) {
    alert('Complete all required fields');
    return;
  }

  // Lógica para manejar el registro de invitados
  console.log('Guest data:', guestData);
  
   // Redireccionar al usuario a la página de inicio de sesión
   window.location.href = '/login';
};
  
  return (
    <form className="guest-register-form"onSubmit={handleSubmit}>

      <h2>Guest Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={guestData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={guestData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={guestData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register as Guest</button>

      <p className="message"> Already registered? 

        <Link to="/login"> Sign In</Link>
      </p>
    </form>
  );

}
