import { fetchAPI } from "./fetchAPI";

export async function sendPhotoToPost(photo, postId, token) {
    try {
        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "PUT",
            photo,
            token
        );
        return response;
    } catch (error) {
        throw new Error("Error al enviar la foto al post: " + error.message);
    }
}
