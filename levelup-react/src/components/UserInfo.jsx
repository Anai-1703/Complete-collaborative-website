import { DefaultAvatar } from "./DefaultAvatar";
import PropTypes from 'prop-types';



const UserInfo = ({ user }) => {

  const userData =  user[0].user[0];
  console.log(userData);
  console.log(userData.nameMember);
  
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


    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  user: PropTypes,
};


