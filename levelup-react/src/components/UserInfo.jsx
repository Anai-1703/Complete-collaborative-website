import { DefaultAvatar } from "./DefaultAvatar";
import { UserInteraction } from "./UserInteraction";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserToken } from "../services/token/getUserToken";
import UserEditForm from "../forms/UserEditForm";
import '../styles/UserInfo.css'

const host = import.meta.env.VITE_API_HOST;

const UserInfo = ({ user }) => {
  const { id: urlUserId } = useParams();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 

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
  

  return (
    <>
      <h2>Perfil de {userData.nameMember}</h2>
      
      <article className="user-panel">
        <section className="user-id">
          {userData.avatarURL ? (
            <img className="user-avatar-full" src={userData.avatarURL} alt="Avatar" />
          ) : (
            <DefaultAvatar post={false} className="userinfo-avatar" />
          )}
          <p className="panel-username">{userData.nameMember}</p>
          <p className="panel-role">{userData.role}</p>
        </section>

        <section className="panel-user-detail">
          <p className="panel-bio-title">Biografía:</p>
          <p className="panel-bio">{userData.biography || "No Definido"}</p>

          <p className="panel-country-title">Pais:</p>
          <p className="panel-country">{userData.country || "No Definido"}</p>
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
          <section className="user-detail">
              {post.avatarURL ? (
              <img className="user-avatar" src={post.avatarURL} alt="Avatar" />
              ) : (
              <DefaultAvatar post={true} />
              )}
              <span className="user-name">{post.nameMember}</span>
          </section>

        <section className="user-interaction">
            <UserInteraction postId={post.id} initialUpvotes={post.upvotes} initialDownvotes={post.downvotes} />
        </section>

        <Link className="link-to-post" to={`/posts/${post.id}`}>
        {post.imageURL ? (
        <section className="post-content">
            <figure className="post-images">
                <img src={`${host}${post.imageURL}`} alt={`Photo about ${post.title}`} />
            </figure>
        </section>
        ) : null}
        <section className="post-text">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-entradilla">{post.entradilla}</p>
            <p className="post-date">{post.createdAt}</p>
        </section>
        </Link>
      </article>
        ))}
        </section>
    </>
  );
};

export default UserInfo;
