import { fetchAPI } from "./fetchAPI";

const editUser = async (postId, editPostData, token) => {
    try {
        console.log(editPostData);
        console.log(postId);
        const response = await fetchAPI(
            `/posts/${postId}`,
            "put",
            editPostData,
            token
        );
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export default editUser;
