import { useState } from 'react';

const CommentForm = ({onAddComment}) => {
  const [ newComment, setNewComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pasar el nuevo comentario al componente padre a través de la prop onAddComment
    onAddComment(newComment);
    // Limpiar el campo del formulario después de agregar el comentario
    setNewComment('');
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Agregar comentario:</label>
        <textarea
          type="text"
          id="comment"
          value={newComment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CommentForm;