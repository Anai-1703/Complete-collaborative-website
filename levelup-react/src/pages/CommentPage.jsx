import { useState } from 'react';
import CommentForm from '../forms/CommentForm';
import Comment from "../components/Comment";
import PropTypes from 'prop-types';

// import "./CommentPage.css";

export default function CommentPage({ userAvatar }) {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, {comment: newComment, userAvatar }]);
    };  
  return (
    <div className="comment-page">
      <h1>Posts</h1>
    <div className="comments-list">
      {/* Mostrar comentarios existentes*/}
      {comments.map((commentData, index) => (
          <Comment
            key={index}
            comment={commentData.comment}
            userAvatar={commentData.userAvatar}
          />
        ))}
    </div>
        {/* Agregar comentario */}  
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
}

