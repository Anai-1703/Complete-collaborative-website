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
        throw error;
    }
};

export default editUser;
