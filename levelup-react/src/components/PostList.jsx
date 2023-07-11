/* 
import { PostContent } from "./PostContent";


export function PostList({posts}) {
    return posts.length ? (
    <>
        <h2> Posts </h2>
        <article>
            {posts.map(post => key={post.id} <PostContent />)}
        </article>
    </>
    ) : (
    <p>No hay posts disponibles... ¡Se el primero en crearlos!</p>
    );
}

*/


export function PostList({ posts }) {
    const { id, title, entradilla, description, idUser, createdAt } = posts

    return posts.length ? (
    <section>Lista De Posts</section>
    ) : (
    <p>No hay posts que mostrar.</p>
    );
}