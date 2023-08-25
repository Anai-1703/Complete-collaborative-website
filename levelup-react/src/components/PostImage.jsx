
const host = import.meta.env.VITE_API_HOST;

function PostImage({post}) {


    return(
        <section className="post-content-full">
            {post.data.imageURL ? (
            <figure className="post-images-full">
                <img src={`${host}${post.data.imageURL}`} alt={`Photo ${post.data.title}`} />
            </figure>
            ) : null}
        </section>
    )
}

export default PostImage;