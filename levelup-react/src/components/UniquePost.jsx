import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { UserInteraction } from "./UserInteraction";

function UniquePost() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getUniquePost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);
  // TEMPORAL
  const photos = ["Foto 1", "Foto 2"];
  console.log(post.nameMember);
  console.log(post.comments);

  return (
    <>
      <section className="user-detail-full">
        {post.avatarURL ? (
          <img className="user-avatar-full" src={post.avatarURL} alt="Avatar" />
        ) : (
          <DefaultAvatar border={false} />
        )}
        <span className="user-name-full">{post.nameMember}</span>
      </section>

      <section className="user-interaction-full">
        <UserInteraction />
      </section>

      <section className="post-content-full">
        <figure className="post-images-full">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
          ))}
        </figure>
      </section>

      <section className="post-text-full">
        <h3 className="post-title-full">{post.title}</h3>
        <p className="post-entradilla-full">{post.entradilla}</p>
        <p className="post-description-full">{post.description}</p>
        <p className="post-created-full">{post.createdAt}</p>
      </section>

      <div className="separador">
        <p>&nbsp;</p>
      </div>

      <section className="post-comments-full">
        {post.comments?.map((comment, index) => (
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
        ))}
      </section>
    </>
  );
}

export default UniquePost;
