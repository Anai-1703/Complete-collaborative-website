import { useState } from "react";
import { Link } from "react-router-dom";
import { createComment } from "../services/createComment";
import "../styles/GenericForm.css";
// import "../styles/CommentForm.css";

const CommentForm = ({ postId, onAddComment, setComments }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createComment(postId, comment);
    
    console.log(response);
    if (typeof onAddComment === 'function') {
      onAddComment(response);
        setComments((prevComments) => [...prevComments, response]); // Agregar el nuevo comentario aquí
        setComment('');
  }
};

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <section className="form">
    <form onSubmit={handleSubmit}>
      <div className="commentForm">
        <textarea
          type="text"
          name="comment"
          placeholder="Agregar comentario"
          value={comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btnComment">Agregar</button>
      <Link to={`/post/:id/comment`}></Link>
    </form>
    </section>
  );
};

export default CommentForm; 