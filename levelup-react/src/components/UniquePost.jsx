import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";

const host = import.meta.env.VITE_API_HOST;


function UniquePost() {
  const [post, setPost] = useState({});
  const { id } = useParams();


  // console.log(post.data);
  // console.log(post.data.idUser);


  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getUniquePost(id);
        setPost(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);
  
  if (!post.data) {
    return <div>Cargando...</div>;
  }


  return (
      <>
      <Link className="link-to-user" to={`/users/${post.data.idUser}`}>
      <section className="user-detail-full">
        {post.avatarURL ? (
          <img className="user-avatar-full" src={post.data.avatarURL} alt="Avatar" />
        ) : (
          <DefaultAvatar border={false} />
        )}
        <span className="user-name-full">{post.data.nameMember}</span>
      </section>
      </Link>
      <section className="user-interaction-full">
        <UserInteraction postId={post.data.id} initialUpvotes={post.data.upvotes} initialDownvotes={post.data.downvotes} />
      </section>

      <section className="post-text-full">
        <h3 className="post-title-full">{post.data.title}</h3>
        <p className="post-entradilla-full">{post.data.entradilla}</p>
        <p className="post-description-full">{post.data.description}</p>
      </section>

      <section className="post-content-full">
        <figure className="post-images-full">
            <img src={`${host}${post.data.imageURL}`} alt={`Photo ${post.data.title}`} />
        </figure>
      </section>
      <p className="post-created-full">{post.data.createdAt}</p>

      <div className="separador">
        <p>&nbsp;</p>
      </div>
        <section className="post-comments-full">
        {post.data.comments?.map((comment, index) => (
          <Link key={comment.id + 1 } className="link-to-user-comment" to={`/users/${comment.idUser}`}>
          <section key={`${comment.idUser}-${index}`} className="comment">
            {comment.avatarURL ? (
              <img
                className="comment-avatar"
                src={comment.avatarURL}
                alt="Comment Avatar"
              />
            ) : (
              <DefaultAvatar />
            )}
            <section className="buble-full">
              <span className="comment-user">{comment.nameMember}</span>
              <p className="comment-text">{comment.comment}</p>
            </section>
          </section>
          </Link>
        ))}
      </section>
    </>
  );
}

export default UniquePost;
