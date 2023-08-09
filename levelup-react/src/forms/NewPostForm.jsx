import { useState, useRef, useEffect } from 'react';
import { createNewPost } from '../services/createNewPost';
import { getToken } from '../services/token/getToken';
import Select from 'react-select';
import Modal from '../components/Modal';
import '../styles/GenericForm.css'
import '../styles/NewPostForm.css';

const NewPostForm = () => {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [entradilla, setEntradilla] = useState('');
  const [description, setDescription] = useState('');
  const [platforms, setPlatform] = useState([]);
  const [categories, setCategory] = useState([]);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  
  const [showErrorModal, setShowErrorModal] = useState(false); // Nuevo estado para mostrar el Modal de error

  // Crear referencia, para el input de tipo "file"
  const fileInputRef = useRef();

  const [submitMessage, setSubmitMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  
  useEffect(() => {
    const userToken = getToken();
    if (!userToken) {
      // Si no hay token, redirige a /login
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = async () => {
    // event.preventDefault();

    console.log('Submitinh form...');

    if (!title.trim() || !entradilla.trim() || !description.trim() || !platforms || !categories) {
      console.log('missing data, showing error modal...');
      setShowErrorModal(true);
      return;
    }

    try {
      const newPostData = {
        title: title,
        entradilla: entradilla,
        description: description,
        platforms: platforms.map((platform) => platform.value), 
        categories: categories.map((category) => category.value),
        photo: photo || null,
      };

    console.log('Post entradilla:', newPostData);
    const createdPost = await createNewPost(newPostData);

    setSubmitButtonClicked(true);
    setSubmitMessage('Submitted');

    window.location.href = `/posts/${createdPost.data.id}`;

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

  const handleCancel = () => {
    // Limpiar el texto y la foto al hacer clic en "Cancelar"
    setTitle('');
    setEntradilla('');
    setDescription('');
    setPlatform([]);
    setCategory([]);
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
    <>
    <div className="form custom-form " onSubmit={handleSubmit} >
      <form className="newPost-container">
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
          onChange={(e) => setEntradilla(e.target.value)}
          placeholder="Entradilla (Resumen)"
          className="entradilla"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (texto)"
          className="description"
        />
        
        {/** Campo de la plataforma */}
        <div className="newPost-container">
          <label className="select-label-2">Platform:</label>
          <Select
            className="platform-select"
            value={platforms}
            onChange={handlePlatformChange}    
            options={[
              { value: "PC", label: "Plataforma PC" },
              { value: "PS5", label: "PlayStation 5" },
              { value: "PS4", label: "PlayStation 4" },
              { value: "PS3", label: "PlayStation 3" },
              { value: "PS2", label: "PlayStation 2" },
              { value: "PSOne", label: "PlayStation One" },
              { value: "Xbox Series", label: "Xbox Series" },
              { value: "Xbox One", label: "Xbox One" },
              { value: "Xbox 360", label: "Xbox 360" },
              { value: "Xbox Classic", label: "Xbox Classic" },
              { value: "Switch", label: "Nintendo Switch" },
              { value: "Wii U", label: "Nintendo Wii U" },
              { value: "Wii", label: "Nintendo Wii" },
              { value: "N64", label: "Nintendo 64" },
              { value: "SNES", label: "Super Nintendo" },
              { value: "NES", label: "Nintendo Entertainment System" },
              { value: "Moviles", label: "Plataforma Móviles" },
              { value: "Otras", label: "Otras Plataformas" },
            ]}
            isMulti
          /> 
        </div>

        {/* Campo de la categoría */}
        <div className="newPost-container">
          <label className="select-label-1">Category:</label>
          <Select
            className="category-select "
            value={categories}
            onChange={handleCategoryChange}   
            options={[
              { value: "RPG", label: "Role-playing game" },
              { value: "MMO", label: "Massively Multiplayer Online"  },
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
        </div>
        
          <div className="photo-preview-container">
            {photoPreview && 
            <img src={photoPreview} alt="Preview" 
            className="photo-preview" />}
            <label htmlFor="fileInput" className="file-input-button">
          Select photo
        </label>
        </div>

        <div className="custom-file-input">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            id="fileInput"
            className="photo-input"
          />
      </div>

      <div className="buttons-container">
        <button 
          type="submit" 
          className={`submit-button ${submitButtonClicked ? 'submitted' : ''}`}
          onClick={(event) =>{
            event.stopPropagation();
            handleSubmit();
          }}
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
      </form>
    </div>
    {showErrorModal && <Modal type="newpost" visible={true} onClose={() => setShowErrorModal(false)} />} {/* Mostrar el Modal de error si showErrorModal es true */}
    </>
  );
}

export default NewPostForm;