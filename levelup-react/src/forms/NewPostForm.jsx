import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createNewPost } from '../services/createNewPost';
import './NewPostForm.css';

const NewPostForm = () => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [category, setCategory] = useState('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  
  // Crear referencia, para el input de tipo "file"
  const fileInputRef = useRef();

  const [submitMessage, setSubmitMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !summary.trim() || !description.trim() || !platform || !category || !photo) {
      alert('Please enter all fields.');
      return;
    }
    
    try {
      const newPostData = {
        title: title, 
        summary: summary, 
        description: description, 
        platform: platform, 
        category: category, 
        text: text,
        photo: photo,
      };
    
      // Llama a la función para crear un nuevo post utilizando la API
      const createdPost = await createNewPost(newPostData);

      // Realiza alguna acción con el post creado, si es necesario
      console.log('Post creado:', createdPost);
      console.log('Texto añadido:', text);
      console.log('Foto seleccionada:', photo);


    // Limpiar el texto y la foto después de enviarlo
    setTitle('');
    setSummary('');
    setDescription('');
    setPlatform('');
    setCategory('');
    setText('');
    setPhoto(null);
    setPhotoPreview(null);

    // Resetea el valor del input de tipo "file" para eliminar el nombre de la foto  
    fileInputRef.current.value = '';

    // Establecer el estado de los botones
      setSubmitButtonClicked(true);

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

  return (
    <>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className="new-post-form">
        <div className="input-container">
          <div className="title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          </div>
          <div className="summary">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Entradilla (Resumen)"
            className="post-text-input"
          />
          </div>
          <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (texto)"
            className="post-text-input"
          />
          </div>
        </div>

          {photoPreview && (
            <div className="photo-preview-container">
              <img src={photoPreview} alt="Preview" className="photo-preview" />
            </div>
           )}
      
        {/** Campo de la plataforma */}
        <div className="input-container">
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            className="platform-select"
          >
            <option value="">Selecciona una plataforma</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="PS4">PS4</option>
            <option value="PS3">PS3</option>
            <option value="PS2">PS2</option>
            <option value="PSOne">PSOne</option>
            <option value="Xbox Series">Xbox Series</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Xbox Classic">Xbox Classic</option>
            <option value="Switch">Switch</option>
            <option value="WiiU">Wii U</option>
            <option value="Wii">Wii</option>
            <option value="N64">N64</option>
            <option value="SNES">SNES</option>
            <option value="NES">NES</option>
            <option value="Moviles">Mviles</option>
            <option value="Otras">Otras</option>
          </select>
        </div>

        {/* Campo de la categoría */}
        <div className="input-container">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="category-select"
          >
            <option value="">Selecciona una categoría</option>
            <option value="RPG">RPG</option>
            <option value="MMO">MMO</option>
            <option value="Mundo Abierto">Mundo Abierto</option>
            <option value="Juegos De Mesa">Juegos De Mesa</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Shooter">Shooter</option>
            <option value="Single Player">Single pLAYER</option>
            <option value="Deporte">Deportes</option>
            <option value="Plataformas">Plataformas</option>
            <option value="Peleas">Peleas</option>
            <option value="Aventura Gráfica">Aventura Gráfica</option>
            <option value="Rol">Rol</option>
            <option value="Puzzle">Puzzle</option>
           
          </select>
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
    </form>
    </>
  );
};
NewPostForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default NewPostForm;