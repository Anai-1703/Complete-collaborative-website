import { fetchAPI } from "./fetchAPI.js";

export async function getUniquePost(postId) {
    return await fetchAPI(`/posts/${postId}`);
}
