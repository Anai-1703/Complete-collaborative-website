import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";
import { getUserToken } from "../services/token/getUserToken";
import Loading from "./Loading";
import deletePost from "../services/deletePost";

// components
import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import Tags from "./Tags";
import Comments from "./Comments";
import CommentForm from "../forms/CommentForm";
import EditForm from "../forms/EditForm";

function UniquePost() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState(post);
  const navigate = useNavigate();



  const toggleEditFormVisibility = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleEditClick = () => {
    if (isExpanded) {
      toggleEditFormVisibility(false); // Aquí, pasamos false para ocultar el formulario
    } else {
      handleFormSubmit(postData);
      toggleEditFormVisibility(true); // Aquí, pasamos true para mostrar el formulario
    }
    setIsExpanded(!isExpanded);
  };

  const handleFormSubmit = async (formData) => {
      try {
        setPostData({ ...post, ...formData }); // Actualizar solo el campo post con los datos editados
        setShowControlPanel(false); // Cerrar el formulario después de enviar los datos
      } catch (error) {
          console.error('Error al editar el post:', error.message);
      }
  };

  const handleDeleteClick = async () => {
    try {
        await deletePost(id);
        navigate("/");
    } catch (error) {
        console.error("Error al eliminar el post:", error);
    }
  };

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

  if (!post.data) {
    return <Loading />;
  }

  console.log("------------");
  console.log(postData);
  const tokenInfo = getUserToken();
  console.log(tokenInfo);
  const userIdFromToken = tokenInfo ? tokenInfo.id : null;
  console.log(userIdFromToken);
  console.log(post);
  const createdByUserId = post.data.idUser;
  console.log(createdByUserId);
  const isCurrentUserPostCreator = userIdFromToken === createdByUserId;
  console.log(isCurrentUserPostCreator);


  function updatePostVotes(postId, upvotes, downvotes) {
    if (post.id === postId) {
    setPost({ ...post, data: { ...post.data, upvotes, downvotes } });
    }
  }

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

  return (
    <>
      <article className="unique-post-page">
        <UserDetail post={post.data} userDetail="user-detail-full" userAvatar="user-avatar-full" userName="user-name-full" size={false}></UserDetail>
        <PostDate post={post.data}  />
        <UserInteraction postId={post.data.id} initialUpvotes={post.data.upvotes} initialDownvotes={post.data.downvotes} updatePostVotes={updatePostVotes} />
        <PostText post={post.data} postText="post-text-full" postTitle="post-title-full" postEntradilla="post-entradilla-full" postDescription="post-description-full"/>
        <PostImage post={post.data} postContent="post-content-full" postImages="post-images-full" img="img-full" />
        <Tags categoriesLinks={categoriesLinks} platformsLinks={platformsLinks} />
        {isCurrentUserPostCreator && (
            <section className="section-editpost">
                <button className="btn-editpost" onClick={handleEditClick}>
                    {isExpanded ? "Contraer" : "Editar Post"}
                </button>
                <button className="btn-deletepost" onClick={handleDeleteClick}>Delete</button>
            </section>
        )}
      </article>
      {isEditFormVisible  && (
          <EditForm
          id={id}
          postData={post.data}
          onChange={handleFormSubmit}
          onEditClick={handleEditClick}
          handleEditClick={handleEditClick}
          />
      )}
      <section className="comment-section">
        <h3>Comentarios</h3>
        <Comments post={post.data} />
        <CommentForm postId={post.data.id} />
      </section>
    </>
  );
}

export default UniquePost;