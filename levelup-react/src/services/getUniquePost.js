import { fetchAPI } from "./fetchAPI.js";

export async function getUniquePost(postId) {
    console.log("Peticion de post especifico");
    return await fetchAPI(`/posts/${postId}`);
}
