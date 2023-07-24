import { fetchAPI } from "./fetchAPI.js";

export async function sendVote(postId, vote) {
    const response = await fetchAPI(`/posts/${postId}/votes`, "post", {
        vote: vote,
    });
    return response;
}
