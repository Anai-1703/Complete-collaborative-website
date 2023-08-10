import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { UserInteraction } from "./UserInteraction";
import { getUserToken } from "../services/token/getUserToken";
import EditForm from "../forms/EditForm";
import CommentForm from "../forms/CommentForm";
import deletePost from "../services/deletePost";
// import "../styles/UniquePost.css";
const host = import.meta.env.VITE_API_HOST;

function UniquePost() {
  const [post, setPost] = useState({});
  const [showFullDate, setShowFullDate] = useState(false);
  const { id } = useParams();
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState(post.data);
  const [comments, setComments] = useState(post?.data?.comments);
  const [showComments, setShowComments] = useState(false);

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

  function updatePostVotes(postId, upvotes, downvotes) {
    if (post.id === postId) {
      setPost({ ...post, data: { ...post.data, upvotes, downvotes } });
    }
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
    if (post.data) {
      setComments(post.data.comments);
    }
  }, [post.data]);

  if (!post.data) {
    return <div>Cargando el post...</div>;
  }

  const tokenInfo = getUserToken();
  const userIdFromToken = tokenInfo ? tokenInfo.id : null;
  const createdByUserId = post.data.idUser;
  const isCurrentUserPostCreator = userIdFromToken === createdByUserId;
  const formattedDate = formatDate(post.data.createdAt);
  const fullDate = new Date(post.data.createdAt).toLocaleString("es-ES", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
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
      <Link to={`/searchcat/${category}`}>{category}</Link>{' '}
    </span>
  ));
  
  const platformsLinks = platforms.map(platform => (
    <span key={platform}>
      <Link to={`/searchplatform/${platform}`}>{platform}</Link>{' '}
    </span>
  ));
  
  const hasComments = post.data.comments.length > 0;
  
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleEditClick = () => {
    if (isExpanded) {
      setShowControlPanel(false);
    } else {
      handleFormSubmit(postData);
      setShowControlPanel(!showControlPanel);
    }
    setIsExpanded(!isExpanded);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setPostData({ ...post.data, ...formData });
      setShowControlPanel(false);
    } catch (error) {
      console.error('Error al editar el post:', error.message);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const postDeleted = await deletePost(id);
      window.location.href = '/';
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };
  
  
  
  return (
    <article className="unique-post-page">
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
        <UserInteraction postId={post.data.id} initialUpvotes={post.data.upvotes} initialDownvotes={post.data.downvotes} updatePostVotes={updatePostVotes} />
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

      {isCurrentUserPostCreator && (
        <section className="section-editpost">
          <button className="btn-editpost" onClick={handleEditClick}>
            {isExpanded ? "Contraer" : "Editar Post"}
          </button>
          <button className="btn-deletepost" onClick={handleDeleteClick}>Eliminar</button>
        </section>
      )}

      <section className="contain-form">
        {showControlPanel && (
          <EditForm
            id={id}
            postData={post.data}
            onChange={handleFormSubmit}
            onEditClick={handleEditClick}
            handleEditClick={handleEditClick}
          />
        )}
      </section>

      <div className="separador">
        <p>&nbsp;</p>
      </div>

      <section className="post-comments-full">
        <button onClick={toggleComments} className="btn-show-comments">
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>
        {showComments && (
          <div className="comment-container">
            <div className="comment-scroll-container">
              <div className="comment-scroll-content">
                {post.data.comments.map((comment, index) => (
                  <Link
                    key={`${comment.idUser}-${index}`}
                    className="link-to-user-comment"
                    to={`/users/${comment.idUser}`}
                  >
                    <section key={`${comment.idUser}-${index}`} className="comment">
                      {comment.avatarURL ? (
                        <img
                          className="comment-avatar"
                          src={comment.avatarURL}
                          alt="Avatar de Comentario"
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
              </div>
            </div>
            <CommentForm postId={post.data.id} onAddComment={addComment} setComments={setComments} />
          </div>
        )}
      </section>

      {!hasComments && (
        <section className="post-comments-full">
          <p>No hay comentarios. ¡Sé el primero en dejar uno!</p>
          <CommentForm postId={post.data.id} onAddComment={addComment} setComments={setComments} />
        </section>
      )}

      {hasComments && (
        <section className="post-comments-full">
          {post.data.comments.map((comment, index) => (
            <Link
              key={`${comment.idUser}-${index}`}
              className="link-to-user-comment"
              to={`/users/${comment.idUser}`}
            >
              <section key={`${comment.idUser}-${index}`} className="comment">
                {comment.avatarURL ? (
                  <img
                    className="comment-avatar"
                    src={comment.avatarURL}
                    alt="Avatar de Comentario"
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
          <CommentForm postId={post.data.id} onAddComment={addComment} setComments={setComments} />
        </section>
      )}
    </article>
  );
}

export default UniquePost;
