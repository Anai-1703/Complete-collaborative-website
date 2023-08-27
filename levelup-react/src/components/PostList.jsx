import { useEffect, useState } from "react";
import { getAllPosts } from "../services/getAllPost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { Link } from "react-router-dom";
import { UserInteraction } from "./UserInteraction";
import Loading from "./Loading";

import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import Separador from "./Separador";

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
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
        }, []);


    let categories = null
    let platforms = null

    if (!posts) {
        return <Loading />;
    }

    return (
        <section className="all-posts">
            {posts.map(post => (
                    <article className="preview-post" key={post.id}>
                        <UserDetail post={post} userDetail="user-detail" userAvatar="user-avatar" userName="user-name" size={true}></UserDetail>
                        <PostDate post={post} />
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
                    </article>
            ))}
        </section>

    );
}

export default PostList;