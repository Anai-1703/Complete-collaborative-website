import { useState } from 'react';
import CommentForm from '../forms/CommentForm';
import Comment from "../components/Comment";
import { createComment } from '../services/createComment';
import { useParams } from 'react-router-dom';

// import "./CommentPage.css";

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
                        userName={commentData.userName}
                    />

                ))}
            </div>
            {/* Agregar comentario */}
            <CommentForm onAddComment={handleAddComment} postId={id} />
        </div>
    );
}