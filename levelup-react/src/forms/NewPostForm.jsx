// Importamos los hooks.
import { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom'

// Importamos los componentes.
import Select from 'react-select';
import Modal from '../components/Modal';

// Importamos los servicios.
import { createNewPost } from '../services/createNewPost';
import { getToken } from '../services/token/getToken';
import { sendPhotoToPost } from '../services/sendPhotoToPost';

// Importamos los estilos.
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

  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // Nuevo estado para mostrar el Modal de error
  const [submitMessage, setSubmitMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  
  // Crear referencia, para el input de tipo "file"
  const fileInputRef = useRef();

  // Obtenemos el token.
  const token = getToken();

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige a /login
      <Navigate to='/login' />
    }
  }, [token]);

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    // Cancelamos el comportamiento por defecto del formulario.
    e.preventDefault();

    if (!title || !entradilla || !description || !platforms || !categories) {
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
      };
    
      setLoading(true);
      
      setSubmitMessage('Enviando...');
    
      const createdPost = await createNewPost(newPostData);
    
      if (createdPost.success) {
        const postId = createdPost.data.id;
        console.log(createdPost);
        console.log("postId", postId);

        if (photo == null) {
          window.location.href = `/posts/${postId}`;
          // usar navigate
        }
    
        if (photo !== null) {
          console.log("El post tiene foto...");
          console.log(photo);
          console.log(postId);
          console.log(token);
          console.log("------");
    
          const photoSended = await sendPhotoToPost(photo, postId, token);
    
          if (photoSended.success) {
            console.log("Photo sent successfully:", photoSended.success);
            window.location.href = `/posts/${postId}`;
            setSubmitMessage('Enviando');
          } else {
            console.error("Error sending photo:", photoSended.error);
            // You might want to handle the photo sending error here
          }
        }
      } else {
        console.error("Error creating the post:", createdPost.error);
      }
    } catch (error) {
      console.log(error);
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
    fileInputRef.current.click();
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
    fileInputRef.current.value = '';
    setLoading(true);
    setCancelMessage('Canceled');

    setTimeout(() => {
      setCancelMessage('');
      setLoading(false);
    }, 1000);
  
  };

    const handlePlatformChange = (selectedOptions) => {
      setPlatform(selectedOptions);
    };
    
    const handleCategoryChange = (selectedOptions) => {
      setCategory(selectedOptions);
    };

  return (
    <>
    <div className="form-custom-form " onSubmit={handleSubmit} >
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
              { value: "PC", label: "PC" },
              { value: "PS5", label: "PlayStation 5" },
              { value: "PS4", label: "PlayStation 4" },
              { value: "PS3", label: "PlayStation 3" },
              { value: "PS2", label: "PlayStation 2" },
              { value: "PSOne", label: "PlayStation One" },
              { value: "Xbox Series", label: "Xbox Series" },
              { value: "Xbox One", label: "Xbox One" },
              { value: "Xbox360", label: "Xbox 360" },
              { value: "Xbox Classic", label: "Xbox Classic" },
              { value: "Switch", label: "Nintendo Switch" },
              { value: "Wii U", label: "Nintendo Wii U" },
              { value: "Wii", label: "Nintendo Wii" },
              { value: "N64", label: "Nintendo 64" },
              { value: "SNES", label: "Super Nintendo (SNES)" },
              { value: "NES", label: "Nintendo Entertainment System (NES)" },
              { value: "Moviles", label: "Móviles / SmartPhones" },
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
          className={`submit-button ${loading ? 'submitted' : ''}`}
          onClick={(event) =>{
            event.stopPropagation();
          }}
        >
          {loading ? 'Submitted' : 'Create New Post'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={`cancel-button ${loading ? 'canceled' : ''}`}
        >
          {loading ? 'Canceled' : 'Cancel'}
        </button>
      </div>
      </form>
    </div>
    {showErrorModal && <Modal type="newpost" visible={true} onClose={() => setShowErrorModal(false)} />} {/* Mostrar el Modal de error si showErrorModal es true */}
    </>
  );
}

export default NewPostForm;