import { DefaultAvatar } from "./DefaultAvatar";
import PropTypes from 'prop-types';
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_API_HOST;




const UserInfo = ({ user }) => {

  const userData =  user[0].user[0];
  const userPost = user[1].posts;
  
  return (
    <>
      <h2>Perfil de {userData.nameMember}</h2>
      <article>
        <section className="user-id">
        <p>{userData.nameMember}</p>

        {userData.avatarURL ? (
            <img className="user-avatar-full" src={userData.avatarURL} alt="Avatar" />
          ) : (
            <DefaultAvatar className="full-avatar"/>
          )}

        <p>Role:</p>
        <p>{userData.role}</p>
        </section>
        <p>Biografía: {userData.biography || "No Definido"}</p>

        <p>Pais: {userData.country || "No Definido"}</p>

      </article>
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

UserInfo.propTypes = {
  user: PropTypes,
};


