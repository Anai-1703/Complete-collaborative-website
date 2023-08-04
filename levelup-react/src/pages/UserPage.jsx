import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/getUser";
import UserInfo from "../components/UserInfo.jsx";
// import { UserPanel } from "../components/UserPanel.jsx"

const UserPage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("userToken"); // Suponiendo que has almacenado el token en el localStorage.
  const { id } = useParams();

  useEffect(() => {
    getUser(id, token)
      .then((userData) => setUser(userData))
      .catch((error) => {
        console.log(error);
        // Manejo de errores, por ejemplo, mostrar un mensaje de error o redirigir a una página de error.
      });
  }, [id, token]);

  if (!user) {
    return <div>Loading...</div>; // O podrías mostrar un spinner o lo que prefieras mientras se obtienen los datos del usuario.
  }

  const isCurrentUser = false

  return (
    <div>
      {isCurrentUser ? (
        <UserPanel user={user} />
      ) : (
        <UserInfo user={user} />
      )}
    </div>
  );
};

export default UserPage;
