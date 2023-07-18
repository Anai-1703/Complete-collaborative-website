import React, { useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import UserPosts from "../components/UniquePost";
import UniquePost from "../components/UniquePost";

export function UserPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una llamada a la API o cargar la información del usuario y las publicaciones
    // Puedes actualizar el estado de 'user' y 'posts' con los datos obtenidos
    const fetchUserData = async () => {
      try {
        // Lógica para obtener los datos del usuario desde la API
        const userData = await fetchUserDataFromAPI();

        // Lógica para obtener las publicaciones del usuario desde la API
        const userPosts = await fetchUserPostsFromAPI();

        setUser(userData);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>User Profile</h1>
      <UserInfo user={user} />
      <UniquePost posts={posts} />
    </div>
  );
}
