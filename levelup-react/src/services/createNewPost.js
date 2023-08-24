import { getToken } from "./token/getToken";

const host = import.meta.env.VITE_API_HOST;

export async function createNewPost(newPostData) {
    try {
        const token = getToken();

        const response = await fetch(`${host}/posts`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(newPostData),
        });

        const body = await response.json();

        if (!response.ok) {
            // Hacemos algo con el error.
        }

        return body;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el post: " + error.message);
    }
}
