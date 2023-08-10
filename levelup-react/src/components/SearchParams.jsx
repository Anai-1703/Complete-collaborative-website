import { useEffect, useState } from "react";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { Link, useLocation } from "react-router-dom";
import { UserInteraction } from "./UserInteraction.jsx";
import CommentForm from "../forms/CommentForm.jsx";
import { getSearchParam } from "../services/getSearchParam.js";

const host = import.meta.env.VITE_API_HOST;

function SearchParams() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

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
        async function fetchQuery() {
            try {
                const url = location.pathname;
                console.log("Veamos la URL");
                console.log(url);
                const searchSegments = url.split('/'); // Divide la URL en segmentos
                const searchTypeIndex = searchSegments.indexOf('searchplatform') !== -1 ? searchSegments.indexOf('searchplatform') : searchSegments.indexOf('searchcat');

                if (searchTypeIndex !== -1) {
                    const searchType = searchSegments[searchTypeIndex]; // Obtiene el tipo de búsqueda desde el segmento correspondiente
                    const parameter = searchSegments[searchTypeIndex + 1]; // Obtiene el parámetro desde el siguiente segmento
            
                    const data = await getSearchParam(searchType, parameter);
            
                    const postsWithDate = data.map((post) => ({
                        ...post,
                        formattedDate: formatDate(post.createdAt),
                        showFullDate: false,
                    }));
                    setPosts(postsWithDate);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchQuery();
        }, [location]);


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
        <section className="all-posts">
            {posts.map(post => (
                    <article className="preview-post" key={post.id}>
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
                                <Link to={`/searchcat/${category}`}>{category}</Link>{' '}
                            </span>
                            ))}</p>
                            <p className="tags-plat">Plataformas: {platforms.map((platform) => (
                            <span key={platform}>
                                <Link to={`/searchplatform/${platform}`}>{platform}</Link>{' '}
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
        </section>

    );
}

export default SearchParams;