import { fetchAPI } from "./fetchAPI";

const editUser = async (postId, userData, token) => {
    try {
        console.log(userData);
        console.log(postId);
        console.log(token);
        const response = await fetchAPI(
            `/posts/${postId}`,
            "put",
            userData,
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
