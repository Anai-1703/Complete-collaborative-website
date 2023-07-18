import { fetchAPI } from "./fetchAPI.js";

export async function sendLogin(payload) {
    return await fetchAPI("/login", "post", payload);
}
