import { useState } from "react";
import { createComment } from "../services/createComment";
import "../styles/GenericForm.css";

const CommentForm = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createComment(postId, comment);
  
    onAddComment(response);
    setComment('');
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="commentForm">
          <textarea
            id="commentTextarea"
            type="text"
            name="comment"
            placeholder="Agregar comentario"
            value={comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btnComment">Agregar</button>
      </form>
    </section>
  );
};

CommentForm.displayName = "CommentForm";

export default CommentForm;
