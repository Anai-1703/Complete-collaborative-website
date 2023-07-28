import { useEffect, useState } from "react";
import { getAllPosts } from "../services/getAllPost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { Link } from "react-router-dom";
import { UserInteraction } from "./UserInteraction";

const host = import.meta.env.VITE_API_HOST;


function PostList() {
    const [posts, setPosts] = useState([]);

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
    
    /*
    function updatePostVotes(id, upvotes, downvotes) {
        posts.findIndex()
        // buscar en el array por ID (la posicion findIndex - )
        // acceder a ese post posts[index] = {...posts[index], upvotes, downvotes}
        // setposts([...posts])
    }
    */

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
                        <UserInteraction postId={post.id} initialUpvotes={post.upvotes} initialDownvotes={post.downvotes} updatePostVotes={updatePostVotes}  />
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
                        <p className="post-date">{post.createdAt}</p>
                    </section>
                    </Link>
                    
                    {post.lastComment && (
                    <>
                        <div className="separador">
                            <p>&nbsp;</p>
                        </div>
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
                    </>
                    )}
                </article>
                
            ))}
        </>
    );
}

export default PostList;
