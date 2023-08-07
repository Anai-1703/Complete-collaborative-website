import { useEffect, useState } from "react";
import { getAllPosts } from "../services/getAllPost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { Link } from "react-router-dom";
import { UserInteraction } from "./UserInteraction";
import CommentForm from "../forms/CommentForm";

const host = import.meta.env.VITE_API_HOST;

// FALTA ARREGLAR EL HOVER!!! QUE MUESTRA LA MISMA FECHA QUE EN EL DOM
function PostList() {
    const [posts, setPosts] = useState([]);

    const handleShowCommentForm = (postId) => {
        setPosts((prevPosts) =>
        prevPosts.map((post) =>
            post.id === postId ? { ...post, showCommentForm: true } : post
        )
        );
    };
    
    const handleHideCommentForm = (postId) => {
        setPosts((prevPosts) =>
        prevPosts.map((post) =>
            post.id === postId ? { ...post, showCommentForm: false } : post
        )
        );
    };

    async function updatePostVotes(id, upvotes, downvotes) {
        try {
            const index = posts.findIndex((post) => post.id === id);
            if (index !== -1) {
                // Actualizar los votos del post en el estado
                const updatedPost = { ...posts[index], upvotes, downvotes };
                setPosts((prevPosts) => {
                    const updatedPosts = [...prevPosts];
                    updatedPosts[index] = updatedPost;
                    return updatedPosts;
                });
            }
        } catch (error) {
            console.error("Error updating post votes:", error);
        }
    }
    
    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getAllPosts();
                const postsWithDate = data.map((post) => ({
                ...post,
                formattedDate: formatDate(post.createdAt),
                showFullDate: false,
                }));
                setPosts(postsWithDate);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
        }, []);


    const formatDate = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
    
        const timeDiffInMinutes = Math.floor((now - postDate) / (1000 * 60));
        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
        const timeDiffInDays = Math.floor(timeDiffInHours / 24);
    
        if (timeDiffInMinutes < 5) {
        return 'hace un momento';
        } else if (timeDiffInMinutes < 60) {
        return `hace ${timeDiffInMinutes} ${timeDiffInMinutes === 1 ? 'minuto' : 'minutos'}`;
        } else if (timeDiffInHours < 24) {
        return `hace ${timeDiffInHours} ${timeDiffInHours === 1 ? 'hora' : 'horas'}`;
        } else if (timeDiffInDays < 5) {
        return `hace ${timeDiffInDays} ${timeDiffInDays === 1 ? 'día' : 'días'}`;
        } else {
        return postDate.toLocaleDateString('es-ES');
        }
    };

    const handleMouseEnter = (postId) => {
        const index = posts.findIndex((post) => post.id === postId);
        if (index !== -1) {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].showFullDate = true;
            return updatedPosts;
        });
        }
    };
    
    const handleMouseLeave = (postId) => {
        const index = posts.findIndex((post) => post.id === postId);
        if (index !== -1) {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].showFullDate = false;
            return updatedPosts;
        });
        }
    };

    let categories = null
    let platforms = null

    return (
        <>
            {posts.map(post => (

                <article key={post.id}>
                    <Link className="link-to-user" to={`/users/${post.idUser}`}>
                    <section className="user-detail">
                        {post.avatarURL ? (
                        <img className="user-avatar" src={post.avatarURL} alt="Avatar" />
                        ) : (
                        <DefaultAvatar post={true} />
                        )}
                        <span className="user-name">{post.nameMember}</span>
                    </section>
                    </Link>
                    <section className="user-interaction">
                        <UserInteraction
                            postId={post.id}
                            initialUpvotes={post.upvotes}
                            initialDownvotes={post.downvotes}
                            updatePostVotes={updatePostVotes}
                            showCommentForm={post.showCommentForm}
                            onShowCommentForm={() => handleShowCommentForm(post.id)}
                            onHideCommentForm={() => handleHideCommentForm(post.id)}
                        />
                    </section>

                    <Link className="link-to-post" to={`/posts/${post.id}`}>
                    {post.imageURL ? (
                    <section className="post-content">
                        <figure className="post-images">
                            <img src={`${host}${post.imageURL}`} alt={`Photo about ${post.title}`} />
                        </figure>
                    </section>
                    ) : null}
                    <section className="post-text">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-entradilla">{post.entradilla}</p>
                        <p
                        className="post-date"
                        title={post.showFullDate ? formatDate(post.createdAt) : null}
                        onMouseEnter={() => handleMouseEnter(post.id)}
                        onMouseLeave={() => handleMouseLeave(post.id)}
                    >
                        {post.formattedDate}
                    </p>
                    </section>
                    </Link>
                    
                    <section className="tags-full">
                        {(() => {
                            categories = post.categories.split(",");
                            platforms = post.platforms.split(",");
                            return null;
                        })()}
                        <p className="tags-cat">Categorías: {categories.map((category) => (
                        <span key={category}>
                            <Link to={`${host}/searchcat/${category}`}>{category}</Link>{' '}
                        </span>
                        ))}</p>
                        <p className="tags-plat">Plataformas: {platforms.map((platform) => (
                        <span key={platform}>
                            <Link to={`${host}/searchplatform/${platform}`}>{platform}</Link>{' '}
                        </span>
                        ))}</p>
                    </section>

                    <div className="separador">
                        <p>&nbsp;</p>
                    </div>

                    {post.lastComment === null ? (
                        <>
                            <p className="no-comment-list">No hay comentarios. ¡Sé el primero en dejar uno!</p>
                        </>
                    ) : (
                        <section className="post-comments">
                            {post.commentUserAvatarURL ? (
                                <img className="comment-avatar" src={post.commentUserAvatarURL} alt="Comment Avatar" />
                            ) : (
                                <DefaultAvatar post={true} />
                            )}
                            <section className="buble">
                                <span className="comment-user">{post.commentUserNameMember}</span>
                                <p className="comment-text">{post.lastComment}</p>
                            </section>
                        </section>
                    )}
                    {/* Utiliza post.showCommentForm en lugar de showCommentForm */}
                    {post.showCommentForm && <CommentForm postId={post.id} />}
                </article>
            ))}
        </>
    );
}

export default PostList;
