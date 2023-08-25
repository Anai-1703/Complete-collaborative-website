import { useState } from 'react';
import CommentForm from '../forms/CommentForm';
import { createComment } from '../services/createComment';
import { useParams } from 'react-router-dom';
import ".-/styles/GenericForm.css";

export default function CommentPage({ userAvatar }) {
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    const handleAddComment = async (postId, newComment) => {
        try {
            await createComment(id, newComment);

            setComments((prevComments) => [
                ...prevComments,
                { postId: id, comment: newComment, userAvatar }
            ]);

        } catch (error) {
            console.error("Error al agregar el comentario", error);
        }
    }

        const Comment = ({ comment, userAvatar, userName }) => {
            return (
            <div className="comment">
                <img src={userAvatar} alt="Avatar" className="avatar" />
                <p className="comment-text">{comment}</p>
                {/* Agregar el nombre de usuario si es necesario */}
                <p className="user-name">{userName}</p>
            </div>
            );
        };

    return (
        <div className="comment-page">
            <h1>Posts</h1>
            <div className="comments-list">
                {comments.map((commentData, index) => (
                    <Comment
                        key={index}
                        comment={commentData.comment}
                        userAvatar={commentData.userAvatar}
                        userName={commentData.userName}
                    />
                ))}
            </div>
            <CommentForm onAddComment={handleAddComment} postId={id} />
        </div>
    );
}