import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/getUser";
import UserInfo from "../components/UserInfo.jsx";
import Loading from "../components/Loading";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("userToken");
  const { id } = useParams();

  useEffect(() => {
    getUser(id, token)
      .then((userData) => setUser(userData))
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  if (!user) {
    return <Loading />;
  }


  return (
    <main>
      <UserInfo user={user} />
    </main>
  );
};

export default UserPage;
