import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("access_token");

    history.push("/");
  }, [history]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;
