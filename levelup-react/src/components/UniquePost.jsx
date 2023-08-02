import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";
import { getUserToken } from "../services/token/getUserToken";
import { getTokenInfo } from "../services/token/getTokenInfo";
import { getToken } from "../services/token/getToken";
import CommentPage from "../pages/CommentPage";
import "../styles/UniquePost.css";
const host = import.meta.env.VITE_API_HOST;


function UniquePost() {
  const [post, setPost] = useState({});
  const [showFullDate, setShowFullDate] = useState(false);
  const { id } = useParams();
  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();

    const timeDiffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
    const timeDiffInDays = Math.floor(timeDiffInHours / 24);

    if (timeDiffInMinutes < 5) {
      return 'hace un momento';
    } else if (timeDiffInMinutes < 60) {
      return `hace ${timeDiffInMinutes} ${timeDiffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (timeDiffInHours < 24) {
      return `hace ${timeDiffInHours} ${timeDiffInHours === 1 ? 'hora' : 'horas'}`;
    } else if (timeDiffInDays < 5) {
      return `hace ${timeDiffInDays} ${timeDiffInDays === 1 ? 'día' : 'días'}`;
    } else {
      return postDate.toLocaleDateString('es-ES');
    }
  };

  function updatePostVotes(upvotes, downvotes) {
    setPost({ ...post, upvotes, downvotes })
  }


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

  useEffect(() => {
    // Verificar si el usuario actual es el creador del post
    const token = getToken();
    const tokenInfo = getTokenInfo(token);

    setIsCurrentUserPost(post && post.data && post.data.idUser === tokenInfo.userId);
  }, [post]);



  if (!post.data) {
    return <div>Leveling Up Posts...</div>;
  }

  const [showCommentForm, setShowCommentForm] = useState(false);

  // Función para mostrar/ocultar el formulario de comentarios
  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const formattedDate = formatDate(post.data.createdAt);
  const fullDate = new Date(post.data.createdAt).toLocaleString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleMouseEnter = () => {
    setShowFullDate(true);
  };

  const handleMouseLeave = () => {
    setShowFullDate(false);
  };

  const categories = post.data.categories.split(",");
  const platforms = post.data.platforms.split(",");

  const categoriesLinks = categories.map(category => (
    <span key={category}>
      <Link to={`${host}/searchcat/${category}`}>{category}</Link>{' '}
    </span>
  ));

  const platformsLinks = platforms.map(platform => (
    <span key={platform}>
      <Link to={`${host}/searchplatform/${platform}`}>{platform}</Link>{' '}
    </span>
  ));

  const hasComments = post.data.comments[0].idUser;


  return (
    <>
      <section className="user-detail-full">
        <Link className="link-to-user" to={`/users/${post.data.idUser}`}>
          {post.avatarURL ? (
            <img className="user-avatar-full" src={post.data.avatarURL} alt="Avatar" />
          ) : (
            <DefaultAvatar post={false} />
          )}
          <span className="user-name-full">{post.data.nameMember}</span>
        </Link>
      </section>
      <section className="user-interaction-full">
        <UserInteraction postId={post.data.id} upvotes={post.data.upvotes} downvotes={post.data.downvotes} updatePostVotes={updatePostVotes} />
      </section>

      <section className="post-text-full">
        <h3 className="post-title-full">{post.data.title}</h3>
        <p className="post-entradilla-full">{post.data.entradilla}</p>
        <p className="post-description-full">{post.data.description}</p>
      </section>

      <section className="post-content-full">
        {post.data.imageURL ? (
          <figure className="post-images-full">
            <img src={`${host}${post.data.imageURL}`} alt={`Photo ${post.data.title}`} />
          </figure>
        ) : null}
      </section>

      <section className="post-date-full">
        <p
          className="post-created-full"
          title={showFullDate ? fullDate : null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {formattedDate}
        </p>
      </section>

      <section className="tags-full">
        <p className="tags-cat">Categorías: {categoriesLinks}</p>
        <p className="tags-plat">Plataformas: {platformsLinks}</p>
      </section>

      {isCurrentUserPost && (
        <section className="btn-editpost">
          <button>Editar Post</button>
        </section>
      )}


      <div className="separador">
        <p>&nbsp;</p>
      </div>

      {!hasComments && <p>No hay comentarios. ¡Se el primero en dejar uno!</p>}
      {hasComments && (
        <section className="post-comments-full">
          {post.data.comments.map((comment, index) => (
            <Link key={comment.id + 1} className="link-to-user-comment" to={`/users/${comment.idUser}`}>
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
                  {comment.nameMember && (
                    <span className="comment-user">{comment.nameMember}</span>
                  )}
                  {comment.comment && (
                    <p className="comment-text">{comment.comment}</p>
                  )}
                </section>
              </section>
            </Link>
          ))}
        </section>
      )}


    </>
  );
}

export default UniquePost;
