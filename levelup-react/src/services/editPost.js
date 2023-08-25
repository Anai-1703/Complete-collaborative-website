import { fetchAPI } from "./fetchAPI";

const editUser = async (postId, editPostData, token) => {
    try {
        const response = await fetchAPI(
            `/posts/${postId}`,
            "put",
            editPostData,
            token
        );
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Error al editar el post: " + error.message);
    }
};

export default editUser;
