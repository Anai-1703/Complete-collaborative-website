import { useState } from "react";
import { Link } from "react-router-dom";
import { createComment } from "../services/createComment";
import "../styles/GenericForm.css";
// import "../styles/CommentForm.css";

const CommentForm = ({ postId, onAddComment, setComments }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(postId);
    console.log(comment);
    // Pasar el postId al componente padre a través de la prop onAddComment, para llamarlo
    const response = await createComment(postId, comment);
    
    console.log(response);
  onAddComment(response);
  setComments((prevComments) => [...prevComments, response]); // Agregar el nuevo comentario aquí
  setComment('');
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <section className="form">
    <form onSubmit={handleSubmit}>
      <div className="comment">
        <textarea
          type="text"
          name="comment"
          placeholder="Agregar comentario"
          value={comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn">Agregar</button>
      <Link to="/post/:id/comment"></Link>
    </form>
    </section>
  );
};

export default CommentForm; 