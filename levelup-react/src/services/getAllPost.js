import { fetchAPI } from "./fetchAPI.js";

export async function getAllPosts() {
    console.log("esto ha llegado a GetAllPosts");
    return await fetchAPI("/posts");
}
