import { fetchAPI } from "./fetchAPI";

export async function deletePhoto(postId, token) {
    try {
        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "DELETE",
            {},
            token
        );
        return response;
    } catch (error) {
        throw new Error("Error al eliminar la foto: " + error.message);
    }
}
