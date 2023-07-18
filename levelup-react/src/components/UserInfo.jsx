import React from "react";

function UserInfo({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <p>{user.bio}</p>
      {/* Aquí puedes mostrar otros detalles del usuario, como su foto, información adicional, etc. */}
    </div>
  );
}

export default UserInfo;
