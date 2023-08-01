import { useState, useRef, useEffect } from 'react';
import { createNewPost } from '../services/createNewPost';
import Select from 'react-select';
import '../styles/NewPostForm.css';

const EditForm = ({postData}) => {
    console.log(postData);
    const [text, setText] = useState(postData ? postData.text : '');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(postData ? postData.photo : null);
    const [title, setTitle] = useState(postData ? postData.title : '');
    const [entradilla, setSummary] = useState(postData ? postData.entradilla : '');
    const [description, setDescription] = useState(postData ? postData.description : '');
    const [platforms, setPlatform] = useState(
        postData && Array.isArray(postData.platforms)
        ? postData.platforms.map((platform) => ({ value: platform, label: platform }))
        : []
    );
    
    const [categories, setCategory] = useState(
        postData && Array.isArray(postData.categories)
        ? postData.categories.map((category) => ({ value: category, label: category }))
        : []
    );
    
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [cancelButtonClicked, setCancelButtonClicked] = useState(false);

    // Crear referencia, para el input de tipo "file"
    const fileInputRef = useRef();

    const [submitMessage, setSubmitMessage] = useState('');
    const [cancelMessage, setCancelMessage] = useState('');

    useEffect(() => {
        if (postData && postData.photo) {
            setPhotoPreview(postData.photo);
        }
    }, [postData]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() || !entradilla.trim() || !description.trim() || !platforms || !categories) {
        alert('Please enter all fields.');
        return;
        }
        
        try {
        const editPostData = {
            title: title,
            entradilla: entradilla,
            description: description,
            platforms: platforms.map((platform) => platform.value), 
            categories: categories.map((category) => category.value),
            photo: photo || null,
        };

        console.log('Post titulo:', editPostData.title);
        console.log('Post entradilla:', editPostData.entradilla);
        console.log('Post descripcion:', editPostData.description);
        console.log('Post plataformas:', editPostData.platforms);
        console.log('Post categorias:', editPostData.categories);
        const editedPost = await createNewPost(editPostData);


        // Limpiar entradas después de enviarlo
        setTitle('');
        setSummary('');
        setDescription('');
        setPlatform([]);
        setCategory([]);
        setText('');
        setPhoto(null);
        setPhotoPreview(null);

        // Resetea el valor del input de tipo "file" para eliminar el nombre de la foto  
        fileInputRef.current.value = '';

        // Establecer el estado de los botones
        setSubmitButtonClicked(true);
        setSubmitMessage('Submitted');

            setSubmitMessage('Submitted');
        // Después de un tiempo, restablecer el estado de los botones
        setTimeout(() => {
        setSubmitMessage('');
        setSubmitButtonClicked(false);
        }, 1000); // Cambia 1000 por el tiempo deseado (en milisegundos) para mantener el estado cambiado

    }  catch (error) {
        console.error('Error al crear el post:', error.message);
        }
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
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

    const handleCancel = () => {
        // Limpiar el texto y la foto al hacer clic en "Cancelar"
        
        setText('');
        setPhoto(null);
        setPhotoPreview(null);
        
        // Resetea el valor del input de tipo "file" para eliminar el nombre de la foto
        fileInputRef.current.value = '';
        setCancelButtonClicked(true);

        setCancelMessage('Canceled');

        setTimeout(() => {
        setCancelMessage('');
        setCancelButtonClicked(false);
        }, 1000);
    
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
        <div className="newPost-container">
            <h2>Create New Post</h2>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title"
            />
            <textarea
            value={entradilla}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Entradilla (Resumen)"
            className="summary"
            />
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
                className="category-select "
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
            <button 
            type="submit" 
            className={`submit-button ${submitButtonClicked ? 'submitted' : ''}`}
            >
            {submitButtonClicked ? 'Submitted' : 'Create New Post'}
            </button>
            <button
            type="button"
            onClick={handleCancel}
            className={`cancel-button ${cancelButtonClicked ? 'canceled' : ''}`}
            >
            {cancelButtonClicked ? 'Canceled' : 'Cancel'}
            </button>
        </div>
        </div>
        </form>
    );
}

export default EditForm;
