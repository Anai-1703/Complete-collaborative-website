const host = import.meta.env.VITE_API_HOST;

export async function fetchAPI(path, method = "get", body, token) {
    const requestInit = {
        method,
        headers: {},
    };

    if (token) {
        requestInit.headers["Authorization"] = `${token}`;
    }

    // añadido el caso delete
    if ((method === "get" && body) || (method === "delete" && body)) {
        const query = new URLSearchParams(body).toString();
        path += `?${query}`;
    }

    if (method !== "get" && method !== "delete" && body && !body.type) {
        requestInit.headers["Content-Type"] = "application/json";
        requestInit.body = JSON.stringify(body);
    }

    if (method !== "get" && method !== "delete" && body.type) {
        const form = new FormData();
        form.append("photo", body);
        requestInit.body = form;
    }

    const response = await fetch(host + path, requestInit);
    const result = await response.json();

    if (!result.success) {
        console.error(result.error);
        console.error(result.error.code);
        throw new Error(result.error.code);
    }

    return result;
}
