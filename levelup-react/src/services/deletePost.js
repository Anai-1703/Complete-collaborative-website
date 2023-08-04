import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken";

const deleteUser = async (postId) => {
    try {
        const token = getToken();
        const response = await fetchAPI(
            `/posts/${postId}`,
            "delete",
            {},
            token
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default deleteUser;
