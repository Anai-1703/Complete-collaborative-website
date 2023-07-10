export function UserInfo({ avatarURL, userName }) {
      // Componente que muestra el avatar y el nombre de usuario
    
return (
    <>
        <img className="user-avatar" src={avatarURL} alt="Avatar" />
        <span className="user-name">{userName}</span>
    </>
    );
}



