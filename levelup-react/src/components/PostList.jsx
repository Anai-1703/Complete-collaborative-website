import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/getAllPost';
import { DefaultAvatar } from './DefaultAvatar.jsx';


import { UserInteraction } from './UserIteraction';

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

    //TEMPORAL
    const photos = ['Foto 1', 'Foto 2'];

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
                        <figure className="post-images">
                            {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                            ))}
                        </figure>
                    </section>

                    <section className="post-text">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-entradilla">{post.entradilla}</p>
                        <p className="post-date">{post.createdAt}</p>
                    </section>
                    
                    <section className="post-comments">
                        <p>{post.lastComment}</p>
                    </section>


                </article>
            ))}
        </>
    );
}
// añadir el avatar y usuario del COMENTARIO!!!!!!

export default PostList;
