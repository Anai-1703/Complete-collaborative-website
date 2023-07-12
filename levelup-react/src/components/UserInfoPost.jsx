export function UserInfoPost({ avatarURL, userName }) {
    // Componente que muestra el avatar y el nombre de usuario del POST

    //TEMPORAL
    avatarURL = "Avatar";
    userName = " Usuario";
return (
    <>
        <img className="user-avatar" src={avatarURL} alt="Avatar" />
        <span className="user-name">{userName}</span>
    </>
    );
}