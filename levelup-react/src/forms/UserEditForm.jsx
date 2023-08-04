import { useState, useEffect } from "react";
import { CountrySelector } from '../components/CountrySelector'
import editUser from "../services/editUser";
import '../styles/UserControlPanel.css';

const UserEditForm = ({ userData, onClose, onUpdate  }) => {
    const [nameMember, setNameMember] = useState("");
    const [password, setPassword] = useState("");
    const [biography, setBiography] = useState("");
    const [country, setCountry] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (userData) {
            setNameMember(userData.nameMember || "");
            setPassword("");
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

    const handleCountryChange = (selectedCountry) => {
        setCountry(selectedCountry); 
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filtrar los datos para enviar solo los campos NO NULL al servidor
            const updatedUserData = {
                nameMember: nameMember.trim(),
                ...(password.trim() && { password: password.trim() }),
                ...(biography.trim() && { biography: biography.trim() }),
                ...(country.trim() && { country: country.trim() }),
                ...(imageFile && { avatarURL: imageFile }),
            };
            
            await editUser(userData.id, updatedUserData);
            onUpdate(updatedUserData);
            onClose();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
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
                    <label>Country:</label>
                    <CountrySelector userData={userData} onChange={handleCountryChange} />
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

export default UserEditForm;
