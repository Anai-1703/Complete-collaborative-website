import { fetchAPI } from "./fetchAPI.js";

export async function getAllPosts() {
    return await fetchAPI("/posts");
}
