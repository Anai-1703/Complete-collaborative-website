import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken.js";

const editUser = async (userId, userData) => {
    try {
        const token = getToken();
        const response = await fetchAPI(
            `/users/${userId}`,
            "put",
            userData,
            token
        );
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export default editUser;
