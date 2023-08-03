// import { useState, useEffect } from "react";
// import UserInfo from "../components/UserInfo";
// import UniquePost from "../components/UniquePost";


export function UserPanel() {

    return (
        <>
        <h2>User Profile</h2>
        <article>
            
        </article>

        </>
    );
}



/*

export function UserPan() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Función ficticia para simular una llamada a la API y obtener los datos del usuario
        const fetchUserDataFromAPI = async () => {
        // Supongamos que la API devuelve los datos del usuario en formato JSON
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        return data; // Retorna los datos del usuario
        };

        // Función ficticia para simular una llamada a la API y obtener las publicaciones del usuario
        const fetchUserPostsFromAPI = async () => {
        // Supongamos que la API devuelve las publicaciones en formato JSON
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        return data; // Retorna las publicaciones del usuario
        };

        const fetchData = async () => {
        try {
            // Llamada a la función ficticia para obtener los datos del usuario
            const userData = await fetchUserDataFromAPI();

            // Llamada a la función ficticia para obtener las publicaciones del usuario
            const userPosts = await fetchUserPostsFromAPI();

            setUser(userData);
            setPosts(userPosts);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };

        fetchData();
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






*/