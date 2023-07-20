
import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/getAllPost';
import { DefaultAvatar } from './DefaultAvatar.jsx';
import { Link } from 'react-router-dom';

import { UserInteraction } from './UserIteraction';

const host = import.meta.env.VITE_API_HOST;


function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        }

        fetchPosts();
    }, []);

    // const photos = ['Foto 1', 'Foto 2'];
    console.log(posts);

    return (
        <>
            {posts.map(post => (
                <article key={post.id}>
                    <section className="user-detail">
                        {post.avatarURL ? (
                        <img className="user-avatar" src={post.avatarURL} alt="Avatar" />
                        ) : (
                        <DefaultAvatar border={true} />
                        )}
                        <span className="user-name">{post.nameMember}</span>
                    </section>
                    <section className="user-interaction">
                        <UserInteraction />
                    </section>
                    <section className="post-content">
                        <Link className="link-to-post" to={`/posts/${post.id}`}>
                            {console.log(host)}
                            {console.log(post.imageURL)}
                            <figure className="post-images">
                                <img src={`${host}${post.imageURL}`} alt={`Photo about ${post.title}`} />
                            </figure>
                        </Link>
                    </section>

                    <section className="post-text">
                        <Link className="link-to-post" to={`/posts/${post.id}`}>
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-entradilla">{post.entradilla}</p>
                            <p className="post-date">{post.createdAt}</p>
                        </Link>
                    </section>
                    
                    {post.lastComment && (
                    <section className="post-comments">
                        {post.commentUserAvatarURL ? (
                        <img className="comment-avatar" src={post.commentUserAvatarURL} alt="Comment Avatar" />
                        ) : (
                            <DefaultAvatar border={true} />
                        )}
                        <section className="buble">
                            <span className="comment-user">{post.commentUserNameMember}</span>
                            <p className="comment-text">{post.lastComment}</p>
                        </section>
                    </section>
                    )}

                </article>
            ))}
        </>
    );

}

export default PostList;
