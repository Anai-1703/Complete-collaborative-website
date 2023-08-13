import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createComment } from "../services/createComment";
import "../styles/GenericForm.css";


const CommentForm = React.forwardRef(({ postId, onAddComment, setComments }, ref) => {
  const [comment, setComment] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.focus) {
      setTimeout(() => {
        ref.current.focus();
      }, 100);
    }
  }, [location.state, ref]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await createComment(postId, comment);
  
    onAddComment(response);
    setComments((prevComments) => [...prevComments, response]);
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
});

CommentForm.displayName = "CommentForm";

export default CommentForm;
