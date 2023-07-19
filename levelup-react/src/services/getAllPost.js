import { fetchAPI } from "./fetchAPI.js";

export async function getAllPosts() {
    const result = await fetchAPI("/posts");
    return result.data;
}
