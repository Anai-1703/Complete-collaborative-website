import { useState, useRef, useEffect } from 'react';
import editPost from '../services/editPost';
import Select from 'react-select';
import { getToken } from "../services/token/getToken";
import "../styles/GenericForm.css";
import { sendPhotoToPost } from '../services/sendPhotoToPost';
// import '../styles/NewPostForm.css';

const EditForm = ({ id, postData, onChange, onEditClick, handleEditClick }) => {
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(postData ? postData.photo : null);
    const [title, setTitle] = useState(postData ? postData.title : '');
    const [entradilla, setEntradilla] = useState(postData ? postData.entradilla : '');
    const [description, setDescription] = useState(postData ? postData.description : '');
    const [platforms, setPlatform] = useState(
        postData && typeof postData.platforms === 'string'
        ? postData.platforms.split(',').map((platform) => ({ value: platform, label: platform }))
        : []
    );
    const [categories, setCategory] = useState(
        postData && typeof postData.categories === 'string'
        ? postData.categories.split(',').map((category) => ({ value: category, label: category }))
        : []
    );

    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    // Crear referencia, para el input de tipo "file"
    const fileInputRef = useRef();

    const [submitMessage, setSubmitMessage] = useState('');

    const token = getToken();

    useEffect(() => {
        if (postData && postData.photo) {
            setPhotoPreview(postData.photo);
        }
    }, [postData]);
    
    const handleSubmit = async () => {
        // event.preventDefault();

        if (!title.trim() || !entradilla.trim() || !description.trim() || !platforms || !categories) {
        alert('Please enter all fields.');
        return;
        }
        try {
        let editPostData;
        if (photo === null) {
            // Si photo es null, creamos editPostData sin la propiedad photo
            editPostData = {
                title: title,
                entradilla: entradilla,
                description: description,
                platforms: platforms.map((platform) => platform.value), 
                categories: categories.map((category) => category.value),
            };

            const editedPost = await editPost(id, editPostData, token);
            console.log(editedPost);

        } else {
            // Si photo no es null, creamos editPostData con la propiedad photo
            editPostData = {
                title: title,
                entradilla: entradilla,
                description: description,
                platforms: platforms.map((platform) => platform.value), 
                categories: categories.map((category) => category.value),
            };

            console.log(editPostData);
            const editedPost = await editPost(id, editPostData, token);
            console.log(editedPost);
            const photoSended = await sendPhotoToPost(photo, id);
            console.log(photoSended);
        }

        onChange(editPostData);
        console.log(editPostData);


        // setPostData({ ...postData, ...editPostData });



        // Establecer el estado de los botones
        setSubmitButtonClicked(true);
        setSubmitMessage('Submitted');

    }  catch (error) {
        console.error('Error al crear el post:', error.message);
        }
    };


    const handlePhotoChange = (event) => {
        const selectedPhoto = event.target.files[0];
        setPhoto(selectedPhoto);

        // Mostrar la vista previa de la foto seleccionada
        if (selectedPhoto) {
        const reader = new FileReader();
        reader.onloadend = () => {  
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(selectedPhoto);
        } else {
        setPhotoPreview(null);
        }
    }; 

    const handleSelectFile = () => {
        fileInputRef.current.click(); // Simula el clic en el input de tipo "file"
    };

    // Función para manejar el cambio de opciones seleccionadas
    const handlePlatformChange = (selectedOptions) => {
    setPlatform(selectedOptions);
    };

    const handleCategoryChange = (selectedOptions) => {
    setCategory(selectedOptions);
    };

    return (
        <form className="newPost-form" onSubmit={handleSubmit} >
        <section className="newPost-container">
            <h2>Create New Post</h2>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title"
            />

            <div className="input.wrapper">
            <input
    type="text"
    value={entradilla}
    onChange={(e) => setEntradilla(e.target.value)}
    placeholder="Entradilla (Resumen)"
    className="summary"
  />  
            <textarea
            value={entradilla}
            onChange={(e) => setEntradilla(e.target.value)}
            placeholder="Entradilla (Resumen)"
            className="entradilla"
            />
            </div>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (texto)"
            className="description"
            />
            

            <label className="select-label-2">Platform:</label>
            <Select
                className="platform-select"
                value={platforms}
                onChange={handlePlatformChange}
                options={[
                { value: "PS4", label: "PS4" },
                { value: "PS3", label: "PS3" },
                { value: "PS2", label: "PS2" },
                { value: "PSOne", label: "PSOne" },
                { value: "Xbox Series", label: "Xbox Series" },
                { value: "Xbox One", label: "Xbox One" },
                { value: "Xbox 360", label: "Xbox 360" },
                { value: "Xbox Classic", label: "Xbox Classic" },
                { value: "Switch", label: "Switch" },
                { value: "WiiU", label: "Wii U" },
                { value: "Wii", label: "Wii" },
                { value: "N64", label: "N64" },
                { value: "SNES", label: "SNES" },
                { value: "NES", label: "NES" },
                { value: "Moviles", label: "Moviles" },
                { value: "Otras", label: "Otras" },
                ]}
                isMulti
            /> 

            {/* Campo de la categoría */}
            <label className="select-label-1">Category:</label>
            <Select
                className="category-select"
                value={categories}
                onChange={handleCategoryChange}
                options={[
                { value: "RPG", label: "RPG" },
                { value: "MMO", label: "MMO" },
                { value: "Mundo Abierto", label: "Mundo Abierto" },
                { value: "Juegos De Mesa", label: "Juegos De Mesa" },
                { value: "Estrategia", label: "Estrategia" },
                { value: "Shooter", label: "Shooter" },
                { value: "Single Player", label: "Single Player" },
                { value: "Deportes", label: "Deportes" },
                { value: "Plataformas", label: "Plataformas" },
                { value: "Peleas", label: "Peleas" },
                { value: "Aventura Gráfica", label: "Aventura Gráfica" },
                { value: "Rol", label: "Rol" },
                { value: "Puzzle", label: "Puzzle" },
                ]}
                isMulti
            />

            {photoPreview && (
            <div className="photo-preview-container">
                <img src={photoPreview} alt="Preview" className="photo-preview" />
            </div>
            )}
            <div className="custom-file-input">
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                id="fileInput"
                className="photo-input"
            />
            <label htmlFor="fileInput" className="file-input-button">
            Select photo
            </label>
        </div>
        <div className="buttons-container">
                {/* Cambiar el onClick para contracción del formulario */}
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation(); // Evitar la propagación del evento
                        handleEditClick(); // Llama a la función proporcionada desde la prop handleEditClick
                        handleSubmit(); // También llama a la función handleSubmit
                    }}
                    className={`submit-button ${submitButtonClicked ? 'submitted' : ''}`}
                    >
                    {submitButtonClicked ? 'Submitted' : 'Edit Post'}
                    </button>
            </div>
        </section>
        </form>
    );
}

export default EditForm;
