import { Link } from "react-router-dom";

import { DefaultAvatar } from "./DefaultAvatar.jsx";

function Comments({ post }) {
    const hasComments = post.data.comments[0].idUser;

    return(
        <>

            {!hasComments &&
                <section className="post-comments-full">
                    <p>No hay comentarios. ¡Se el primero en dejar uno!</p>
                </section>
            }

            {hasComments && (
            <section className="post-comments-full">
                {post.data.comments.map((comment, index) => (
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
                ))}
            </section>
        )} 
        </>
    )
}

export default Comments;