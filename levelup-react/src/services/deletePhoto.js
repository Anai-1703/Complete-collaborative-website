import { fetchAPI } from "./fetchAPI";

export async function deletePhoto(postId, token) {
    try {
        console.log(postId);

        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "DELETE",
            {},
            token
        );
        console.log(response);
        return response;
    } catch (error) {
        throw new Error("Error al eliminar la foto: " + error.message);
    }
}
