import { DefaultAvatar } from "./DefaultAvatar";
import { UserInteraction } from "./UserInteraction";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserToken } from "../services/token/getUserToken";
import UserEditForm from "../forms/UserEditForm";
import '../styles/UserInfo.css'

import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import Separador from "./Separador";
import UserCard from "./UserCard";

const host = import.meta.env.VITE_API_HOST;

const UserInfo = ({ user }) => {
  const { id: urlUserId } = useParams();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [posts, setPosts] = useState([]);
  const userToken = getUserToken();
  
  useEffect(() => {
    if (userToken) {
      const authenticatedUserId = userToken.id;
      setIsLoggedInUser(authenticatedUserId === urlUserId);
    } else {
      setIsLoggedInUser(false);
    }
  }, [userToken, urlUserId]);

  const userData = updatedUserData || user[0].user[0];
  const userPost = user[1].posts;

  const handleEditClick = () => {
    setShowControlPanel(!showControlPanel); 
    setIsExpanded(!showControlPanel); 
  };

  const handleControlPanelClose = () => {
    setShowControlPanel(false);
    setIsExpanded(false);
  };

  const handleShowCommentForm = (postId) => {
    setPosts((prevPosts) =>
    prevPosts.map((post) =>
        post.id === postId ? { ...post, showCommentForm: true } : post
    )
    );
};

  const handleHideCommentForm = (postId) => {
    setPosts((prevPosts) =>
    prevPosts.map((post) =>
        post.id === postId ? { ...post, showCommentForm: false } : post
    )
    );
  };

  async function updatePostVotes(id, upvotes, downvotes) {
    try {
        const index = posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            // Actualizar los votos del post en el estado
            const updatedPost = { ...posts[index], upvotes, downvotes };
            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts];
                updatedPosts[index] = updatedPost;
                return updatedPosts;
            });
        }
    } catch (error) {
        console.error("Error updating post votes:", error);
    }
    }
  
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

  const handleMouseEnter = (postId) => {
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
    setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index].showFullDate = true;
        return updatedPosts;
    });
    }
};

const handleMouseLeave = (postId) => {
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
    setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index].showFullDate = false;
        return updatedPosts;
    });
    }
};

let categories = null
let platforms = null

  return (
    <>
      <h2>Perfil de {userData.nameMember}</h2>
      <article className="user-panel">
        <UserCard userData={userData} />


        <section className="panel-user-detail">
          {isLoggedInUser ? (
            <button className="btn-edit" onClick={handleEditClick}>
              {isExpanded ? "Contraer" : "Editar"}
            </button>
          ) : null}
        </section>
      </article>

      {showControlPanel && <UserEditForm userData={userData} onUpdate={setUpdatedUserData} onClose={handleControlPanelClose} />}

      <section>
        <h3> Post de {userData.nameMember}</h3>
      </section>

      <section className="all-posts">
      {userPost.map(post => (
        <article key={post.id + 1} className="preview-post">
          <UserDetail post={post} userDetail="user-detail" userAvatar="user-avatar" userName="user-name" size={true}></UserDetail>
          <PostDate post={post} />
          <UserInteraction
              postId={post.id}
              initialUpvotes={post.upvotes}
              initialDownvotes={post.downvotes}
              updatePostVotes={updatePostVotes}
              showCommentForm={post.showCommentForm}
              onShowCommentForm={() => handleShowCommentForm(post.id)}
              onHideCommentForm={() => handleHideCommentForm(post.id)}
          />


          <Link className="link-to-post" to={`/posts/${post.id}`}>
            <PostImage post={post} postContent="post-content" postImages="post-images" img="img-preview" />
            <PostText post={post} postText="post-text" postTitle="post-title" postEntradilla="post-entradilla" />
          </Link>

        <section className="tags-full">
            {(() => {
                categories = post.categories.split(",");
                platforms = post.platforms.split(",");
                return null;
            })()}
            <p className="tags-cat">Categorías: {categories.map((category) => (
            <span key={category}>
                <Link to={`/searchcat/${category}`}>{category}</Link>{' '}
            </span>
            ))}</p>
            <p className="tags-plat">Plataformas: {platforms.map((platform) => (
            <span key={platform}>
                <Link to={`/searchplatform/${platform}`}>{platform}</Link>{' '}
            </span>
            ))}</p>
        </section>

        <Separador />

        <Link className="link-to-post" to={`/posts/${post.id}`}>
          <p className="p-aviso-post">Para ver los comentarios, haz click en el post</p>
        </Link>

      </article>
        ))}
        </section>
    </>
  );
};

export default UserInfo;
