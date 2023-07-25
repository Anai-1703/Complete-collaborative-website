// UserControlPanel.jsx
import React, { useState } from "react";

const UserControlPanel = ({ user }) => {
    const [name, setName] = useState(user.nameMember);
    const [biography, setBiography] = useState(user.biography || "");
    const [avatarURL, setAvatarURL] = useState(user.avatarURL || "");
    const [country, setCountry] = useState(user.country || "");

    const handleNameChange = (e) => setName(e.target.value);
    const handleBiographyChange = (e) => setBiography(e.target.value);
    const handleAvatarURLChange = (e) => setAvatarURL(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);

    const handleSubmit = () => {
        // Aquí puedes enviar los cambios al servidor utilizando el endpoint de actualización de usuario.
        // Por ejemplo, podrías usar el fetchAPI con el método "put" para enviar los datos actualizados.
        // Recuerda enviar el token como parte del encabezado de autenticación para las peticiones seguras.

        // Luego de guardar los cambios, podrías mostrar un mensaje de éxito o actualizar la vista de alguna manera.
    };

    return (
        <div>
        <h2>User Control Panel</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
            Biography:
            <textarea value={biography} onChange={handleBiographyChange} />
            </label>
            <label>
            Avatar URL:
            <input type="text" value={avatarURL} onChange={handleAvatarURLChange} />
            </label>
            <label>
            Country:
            <input type="text" value={country} onChange={handleCountryChange} />
            </label>
            <button type="submit">Save Changes</button>
        </form>
        </div>
    );
};

export default UserControlPanel;
