

function PostText({post, postText, postTitle, postEntradilla, postDescription }) {


    return(

        <section className={postText}>
            <h3 className={postTitle}>{post.title}</h3>
            <p className={postEntradilla}>{post.entradilla}</p>
            <p className={postDescription}>{post.description}</p>
        </section>
    )
}

export default PostText;