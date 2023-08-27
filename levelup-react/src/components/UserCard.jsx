import { DefaultAvatar } from "./DefaultAvatar";

function UserCard({userData}) {

    return (
        <>
            <section className="user-id">
                {userData.avatarURL ? (
                <img className="user-avatar-full" src={userData.avatarURL} alt="Avatar" />
                ) : (
                <DefaultAvatar size={false} className="userinfo-avatar" />
                )}
                <p className="panel-username">{userData.nameMember}</p>
                <p className="user-rank">Rango</p>
                <p className="panel-role">{userData.role}</p>
            </section>
        
            <section className="panel-user-detail">
                <span className="panel-bio-title">Biografía:</span>
                <p className="panel-bio">{userData.biography || "No Definido"}</p>

                <span className="panel-country-title">Pais:</span>
                <p className="panel-country">{userData.country || "No Definido"}</p>
            </section>
        </>
    );
}

export default UserCard;