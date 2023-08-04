import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken";

export async function sendPhotoToPost(photo, postId) {
    try {
        const token = getToken();
        console.log(photo);

        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "PUT",
            photo,
            token
        );
        // objeto con metodo, body y header
        console.log(response);
        return response;
    } catch (error) {
        // Manejar errores del envío de la foto aquí si es necesario
        throw new Error("Error al enviar la foto al post: " + error.message);
    }
}
