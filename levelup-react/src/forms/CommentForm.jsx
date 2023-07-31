import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="comment">
        <textarea
          type="text"
          placeholder="Agregar comentario"
          value={comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn">Agregar</button>
      <Link to="/post/:id/comment"></Link>
    </form>
  );
};

export default CommentForm;