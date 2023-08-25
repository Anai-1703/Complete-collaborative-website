

function PostText({post}) {


    return(

        <section className="post-text-full">
            <h3 className="post-title-full">{post.data.title}</h3>
            <p className="post-entradilla-full">{post.data.entradilla}</p>
            <p className="post-description-full">{post.data.description}</p>
        </section>
    )
}

export default PostText;