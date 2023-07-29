import { useState, useEffect } from "react";
import '../styles/UserControlPanel.css'

const UserControlPanel = ({ userData }) => {
    // Estado local para almacenar los valores del formulario
    const [nameMember, setNameMember] = useState("");
    const [password, setPassword] = useState("");
    const [biography, setBiography] = useState("");
    const [country, setCountry] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Establecer los valores iniciales de los campos del formulario utilizando userData
    useEffect(() => {
        if (userData) {
        setNameMember(userData.nameMember || "");
        setPassword(userData.password || "")
        setBiography(userData.biography || "");
        setCountry(userData.country || "");
        }
    }, [userData]);

    const handleNameChange = (e) => {
        setNameMember(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleBiographyChange = (e) => {
        setBiography(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos actualizados del usuario al servidor o realizar otras acciones necesarias
        // Puedes acceder a los valores actualizados del formulario desde las variables de estado (nameMember, biography, country, imageFile)
        console.log("Name:", nameMember);
        console.log("Password (unhashed): ", password);
        console.log("Biography:", biography);
        console.log("Country:", country);
        console.log("Image File:", imageFile);
    };

    return (
        <>
        <h2>Editor de Usuario</h2>
        <article className="form-user">
            <form className="user-edit-form" method="post" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={nameMember} onChange={handleNameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" onChange={handlePasswordChange} />
                </label>
                <label>
                    Biography:
                    <textarea value={biography} onChange={handleBiographyChange} />
                </label>
                <label>
                    Country:
                    <input type="text" value={country} onChange={handleCountryChange} />
                </label>
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button className="btn-edit-user" type="submit">Save Changes</button>
            </form>
        </article>
        </>
    );
};

export default UserControlPanel;
