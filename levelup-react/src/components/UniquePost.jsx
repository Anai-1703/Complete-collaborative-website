import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { DefaultAvatar } from "./DefaultAvatar.jsx";
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";
import { getUserToken } from "../services/token/getUserToken";
import Loading from "./Loading";
import EditForm from "../forms/EditForm";
import CommentForm from "../forms/CommentForm";
import deletePost from "../services/deletePost";
import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";

// const host = import.meta.env.VITE_API_HOST;

function UniquePost() {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState(post.data);
  const [comments, setComments] = useState(post?.data?.comments); 
  
  const location = useLocation();
  const commentInputRef = useRef(null);

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
        setComments(data?.data?.comments || []);
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

  useEffect(() => {
    // Verifica si la propiedad focus está presente en la ubicación del historial
    if (location.state && location.state.focus) {
      // Enfoca en el input de comentario
      commentInputRef.current.focus();
    }
  }, [location.state]);

  if (!post.data) {
    return <Loading />;
  }

  const tokenInfo = getUserToken();

  const userIdFromToken = tokenInfo ? tokenInfo.id : null;
  const createdByUserId = post.data.idUser;

  const isCurrentUserPostCreator = userIdFromToken === createdByUserId;

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
  
  const hasComments = post.data.comments[0].idUser;

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleEditClick = () => {
    if (isExpanded) {
        setShowControlPanel(false); // Contraer el formulario al hacer clic en "Contraer"
    } else {
        handleFormSubmit(postData); // Llamar a handleFormSubmit con los datos actuales antes de expandir el formulario
        setShowControlPanel(!showControlPanel); // Expandir el formulario al hacer clic en "Editar Post"
    }
    setIsExpanded(!isExpanded);
} ;
  
  const handleFormSubmit = async (formData) => {
    try {
      setPostData({ ...post.data, ...formData }); // Actualizar solo el campo post.data con los datos editados
      setShowControlPanel(false); // Cerrar el formulario después de enviar los datos
    } catch (error) {
      console.error('Error al editar el post:', error.message);
    }
  };


  const handleDeleteClick = async () => {
    try {
      const postDeleted = await deletePost(id);
      <Navigate to="/" />
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };
  



  return (
      <article className="unique-post-page">
        <UserDetail post={post}>
        </UserDetail>
        <section className="user-interaction-full">
          <UserInteraction postId={post.data.id} initialUpvotes={post.data.upvotes} initialDownvotes={post.data.downvotes} updatePostVotes={updatePostVotes} />
        </section>

        <PostText post={post} />

        <PostImage post={post} />

        <PostDate post={post} />
        {/* <section className="post-date-full">
          <p
            className="post-created-full"
            title={showFullDate ? fullDate : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {formattedDate}
          </p>
        </section> */}

        <section className="tags-full">
          <p className="tags-cat">Categorías: {categoriesLinks}</p>
          <p className="tags-plat">Plataformas: {platformsLinks}</p>
        </section>

        {isCurrentUserPostCreator && (
        <section className="section-editpost">
          <button className="btn-editpost" onClick={handleEditClick}>
            {isExpanded ? "Contraer" : "Editar Post"}
          </button>
          <button className="btn-deletepost" onClick={handleDeleteClick}>Delete</button>
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

        {!hasComments &&
        <section className="post-comments-full">
          <p>No hay comentarios. ¡Se el primero en dejar uno!</p>
          <CommentForm
            postId={post.data.id}
            onAddComment={addComment}
            setComments={setComments}
            ref={commentInputRef} // Pasa la referencia aquí
          />
        </section>
        }

        {hasComments && (
          <section className="post-comments-full">
            {post.data.comments.map((comment, index) => (
              <Link key={`${comment.idUser}-${index}`} className="link-to-user-comment" to={`/users/${comment.idUser}`}>
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
            <CommentForm
              postId={post.data.id}
              onAddComment={addComment}
              setComments={setComments}
              ref={commentInputRef}
            />
          </section>
        )}
    </article>
  );
}

export default UniquePost;