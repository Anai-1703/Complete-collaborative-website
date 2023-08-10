import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken";

const deletePost = async (postId) => {
    try {
        const token = getToken();
        const response = await fetchAPI(
            `/posts/${postId}`,
            "delete",
            {},
            token
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default deletePost;
