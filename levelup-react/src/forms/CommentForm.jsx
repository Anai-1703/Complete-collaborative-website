import { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onAddComment, postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pasar el postId al componente padre a través de la prop onAddComment, para llamarlo
    onAddComment(postId, comment);
    // Limpiar el campo del formulario después de agregar el comentario
    setComment('');
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Agregar comentario:</label>
        <textarea
          type="text"
          id="comment"
          value={comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CommentForm;