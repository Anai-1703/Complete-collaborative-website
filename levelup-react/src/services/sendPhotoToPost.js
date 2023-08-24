import { fetchAPI } from "./fetchAPI";

export async function sendPhotoToPost(photo, postId, token) {
    try {
        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "PUT",
            photo,
            token
        );
        console.log("response de send photo", response);
        return response;
    } catch (error) {
        console.log(error);
        console.log(error.message);
        throw new Error("Error al enviar la foto al post: " + error);
    }
}
