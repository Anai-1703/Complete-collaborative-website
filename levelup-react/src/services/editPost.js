import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken.js";

const editUser = async (userId, userData) => {
    try {
        console.log(userData);
        console.log(userId);
        const token = getToken();
        const response = await fetchAPI(
            `/users/${userId}`,
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
