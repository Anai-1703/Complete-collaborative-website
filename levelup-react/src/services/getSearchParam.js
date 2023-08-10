import { fetchAPI } from "./fetchAPI.js";

export async function getSearchParam(search, param) {
    const result = await fetchAPI(`/${search}/${param}`, "get", null);
    return result.data;
}
