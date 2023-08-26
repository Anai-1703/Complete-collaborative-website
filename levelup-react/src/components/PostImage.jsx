
const host = import.meta.env.VITE_API_HOST;

function PostImage({post, postContent, postImages, img}) {


    return(
        <section className={postContent}>
            {post.imageURL ? (
            <figure className={postImages}>
                <img className={img} src={`${host}${post.imageURL}`} alt={`Photo ${post.title}`} />
            </figure>
            ) : null}
        </section>
    )
}

export default PostImage;