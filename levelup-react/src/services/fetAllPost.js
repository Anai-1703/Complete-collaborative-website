<<<<<<< HEAD:levelup-react/src/services/fetAllPost.js
import { fetchAPI } from "./fetchAPI.js";

export async function getAllPosts() {
    const result = await fetchAPI("/posts");
    return result.data;
}
=======
import { fetchAPI } from "./fetchAPI.js";

export async function getAllPosts() {
    const result = await fetchAPI("/posts");
    return result.data;
}

// comentario
>>>>>>> origin:levelup-react/src/services/getAllPost.js
