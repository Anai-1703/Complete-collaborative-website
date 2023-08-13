import { useState } from 'react';
import CommentForm from '../forms/CommentForm';
import { createComment } from '../services/createComment';
import { useParams } from 'react-router-dom';
import "../styles/GenericForm.css";
import "../styles/Comment.css";

export default function CommentPage({ userAvatar  }) {
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    const handleAddComment = async (postId, newComment) => {
        try {

            const response = await createComment(id, newComment);

            setComments((prevComments) => [
                ...prevComments,
                { postId: id, comment: newComment, userAvatar }
            ]);

        } catch (error) {
            console.error("Error al agregar el comentario", error);
        }
    }

         const Comment = ({ comment, userAvatar, nameMember }) => {
             return (
               <div className="comment">
                <img src={userAvatar} alt="Avatar" className="avatar" />
                <p className="comment-text">{comment}</p>
                 <p className="user-name">{nameMember}</p>
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
            {/* Agregar comentario */}
            <CommentForm onAddComment={handleAddComment} postId={id} />
        </div>
    );
}