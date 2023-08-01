import { DefaultAvatar } from "./DefaultAvatar";
import { UserInteraction } from "./UserInteraction";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserToken } from "../services/token/getUserToken";
import { getTokenInfo } from "../services/token/getTokenInfo";
import { getToken } from "../services/token/getToken";
import UserEditForm from "../forms/UserEditForm";
import '../styles/UserInfo.css'


const host = import.meta.env.VITE_API_HOST;


const UserInfo = ({ user }) => {
  const { id: urlUserId } = useParams();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Nuevo estado para controlar si UserControlPanel está expandido o contraído

  const token = getToken();
  const userToken = getUserToken();
  const tokenInfo = getTokenInfo(token);

  useEffect(() => {
    if (tokenInfo && userToken) {
      const authenticatedUserId = tokenInfo.id;
      setIsLoggedInUser(authenticatedUserId === urlUserId);
    } else {
      setIsLoggedInUser(false);
    }
  }, [tokenInfo, userToken, urlUserId]);

  const userData = user[0].user[0];
  const userPost = user[1].posts;

  const handleEditClick = () => {
    // Mostrar el componente de control cuando se haga clic en "Editar"
    setShowControlPanel(!showControlPanel); // Cambiar el estado de showControlPanel al contrario del valor actual
    setIsExpanded(!showControlPanel); // Cambiar el estado de isExpanded al contrario del valor actual
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

      {showControlPanel && <UserEditForm userData={userData} />}

      <section>
        <h3> Post de {userData.nameMember}</h3>
      </section>

      {userPost.map(post => (
        <article key={post.id + 1} className="user-post-list">
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


    </>
  );
};

export default UserInfo;
