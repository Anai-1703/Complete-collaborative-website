import { fetchAPI } from "./fetchAPI";

export async function createNewPost(newPostData) {
    try {
        const response = await fetchAPI("/posts", "post", mewPostData);
        // Manejar la respuesta de la creación del post aquí si es necesario
        return response.data; // devuelve el nuevo post creado desde la api
    } catch (error) {
        // Manejar errores de la solicitud aquí si es necesario
        throw new Error("Error al crear el post: " + error.message);
    }
}
