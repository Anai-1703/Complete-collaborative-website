import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../services/createComment";
import "../styles/GenericForm.css";
import "../styles/UniquePostPage.css";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment(postId, comment);
    window.location.href = `/posts/${postId}`; // Cambiar por Navigate 
    setComment('');
    navigate(`/posts/${postId}`);
  };
  
  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <textarea
        id="commentTextarea"
        type="text"
        name="comment"
        placeholder="Agregar comentario"
        value={comment}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btnComment">Agregar</button>
    </form>
  );
};

CommentForm.displayName = "CommentForm";

export default CommentForm;
