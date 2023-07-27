import { fetchAPI } from "./fetchAPI.js";
import { getToken } from "./token/getToken.js";

export async function sendVote(postId, vote) {
    const token = getToken();
    const response = await fetchAPI(
        `/posts/${postId}/votes`,
        "post",
        { vote: vote },
        token
    );

    return response;
}
