
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { DefaultAvatar } from "./DefaultAvatar.jsx";
import CommentForm from "../forms/CommentForm";

function Comments({post}) {
    const [comments, setComments] = useState(post?.data?.comments); 


    const hasComments = post.data.comments[0].idUser;

    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };
    
    useEffect(() => {
        if (post.data) {
            setComments(post.data.comments);
        }
    }, [post.data]);

    return(
        <>
            {!hasComments &&
                <section className="post-comments-full">
                    <p>No hay comentarios. ¡Se el primero en dejar uno!</p>
                    <CommentForm
                        postId={post.data.id}
                        onAddComment={addComment}
                        setComments={setComments}
                    />
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
                <CommentForm
                    postId={post.data.id}
                    onAddComment={addComment}
                    setComments={setComments}
                />
            </section>
        )}
        </>
    )
}

export default Comments;