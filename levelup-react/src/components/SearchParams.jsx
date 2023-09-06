import { useEffect, useState } from "react";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { Link, useLocation } from "react-router-dom";
import { UserInteraction } from "./UserInteraction.jsx";
import CommentForm from "../forms/CommentForm.jsx";
import { getSearchParam } from "../services/getSearchParam.js";

import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import Separador from "./Separador";

const host = import.meta.env.VITE_API_HOST;

function SearchParams() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

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
                const searchSegments = url.split('/'); 
                const searchTypeIndex = searchSegments.indexOf('searchplatform') !== -1 ? searchSegments.indexOf('searchplatform') : searchSegments.indexOf('searchcat');

                if (searchTypeIndex !== -1) {
                    const searchType = searchSegments[searchTypeIndex];
                    const parameter = searchSegments[searchTypeIndex + 1];
            
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
                        <UserDetail post={post} userDetail="user-detail" userAvatar="user-avatar" userName="user-name" size={true}></UserDetail>
                        <UserInteraction
                            postId={post.id}
                            initialUpvotes={post.upvotes}
                            initialDownvotes={post.downvotes}
                            updatePostVotes={updatePostVotes}
                            showCommentForm={post.showCommentForm}
                            onShowCommentForm={() => handleShowCommentForm(post.id)}
                            onHideCommentForm={() => handleHideCommentForm(post.id)}
                        />

                        <Link className="link-to-post" to={`/posts/${post.id}`}>
                            <PostImage post={post} postContent="post-content" postImages="post-images" img="img-preview" />
                            <PostText post={post} postText="post-text" postTitle="post-title" postEntradilla="post-entradilla" postDescription="post-description" />
                        </Link>
                        
                        <section className="tags-full">
                            {(() => {
                                categories = post.categories.split(",");
                                platforms = post.platforms.split(",");
                                // return null;
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

                        <Separador />

                        {post.lastComment === null ? (
                            <>
                            <Link className="link-to-post" to={{ pathname: `/posts/${post.id}`, state: { focus: true } }}>
                                <p className="no-comment-list">No hay comentarios. ¡Sé el primero en dejar uno!</p>
                            </Link>
                        </>
                        ) : (
                            <Link className="link-to-post" to={{ pathname: `/posts/${post.id}`, state: { focus: true } }}>

                            <section className="post-comments">
                                {post.commentUserAvatarURL ? (
                                    <img className="comment-avatar" src={post.commentUserAvatarURL} alt="Comment Avatar" />
                                ) : (
                                    <DefaultAvatar size={true} />
                                )}
                                <section className="buble">
                                    <span className="comment-user">{post.commentUserNameMember}</span>
                                    <p className="comment-text">{post.lastComment}</p>
                                </section>
                            </section>
                            </Link>

                        )}
                        {post.showCommentForm && <CommentForm postId={post.id} />}
                    </article>
            ))}
        </section>

    );
}

export default SearchParams;