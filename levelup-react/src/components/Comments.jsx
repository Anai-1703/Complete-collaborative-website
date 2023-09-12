import { useState } from 'react';
import { Link } from "react-router-dom";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { getUserToken } from "../services/token/getUserToken.js";
import { deleteComment } from "../services/deleteComment.js";

function Comments({ post }) {
    const [isDeleted, setIsDeleted] = useState(false);

    const hasComments = post.comments[0].idUser;
    const userInfo = getUserToken();

    const idPost = post.id;
    console.log(idPost);

    const handleDeleteClick = async (idComment) => {
        try {
        const response = await deleteComment(idPost, idComment);
        if (response.ok) {
            setIsDeleted(true);
            window.location.href = `/posts/${post.id}`
        } else {
            console.error('Error al eliminar el comentario.');
        }
        } catch (err) {
        console.error('Error en la solicitud de eliminación:', err);
        }
    };


    return(
        <>

            {!hasComments &&
                <section className="post-comments-full">
                    <p>No hay comentarios. ¡Se el primero en dejar uno!</p>
                </section>
            }

            {hasComments && (
            <section className="post-comments-full">
                {post.comments.map((comment, index) => (
                <>
                    <Link key={`${comment.idUser}-${index}`} className="link-to-user-comment" to={`/users/${comment.idUser}`}>
                        <section key={`${comment.idUser}-${index}`} className="comment">
                        {comment.avatarURL ? (
                            <img
                            className="comment-avatar"
                            src={comment.avatarURL}
                            alt="Comment Avatar"
                            />
                            ) : (
                                <DefaultAvatar />
                                )}
                            <section className="buble-full">
                                {comment.nameMember && (
                                    <span className="comment-user">{comment.nameMember}</span>
                                    )}
                                {comment.comment && (
                                    <p className="comment-text">{comment.comment}</p>
                                    )}
                            </section>
                        </section>
                    </Link>
                    {comment.idUser === userInfo.id && (
                    <section className="delete-area">
                        {console.log(comment.idComment)}
                        <button className="btn-deletepost" onClick={() => handleDeleteClick(comment.idComment)}>Delete</button>                    </section>
                    )}
                </>
                ))}
            </section>
        )} 
        </>
    )
}

export default Comments;