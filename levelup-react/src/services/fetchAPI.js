const host = import.meta.env.VITE_API_HOST;

export async function fetchAPI(path, method = "get", payload, token) {
    const requestInit = {
        method: method,
        headers: {},
    };

    if (token) {
        requestInit.headers["Authorization"] = `${token}`;
    }

    // añadido el caso delete
    if ((method === "get" && payload) || (method === "delete" && payload)) {
        const query = new URLSearchParams(payload).toString();
        path += `?${query}`;
    }

    if (method !== "get" && method !== "delete" && payload && !payload.type) {
        requestInit.headers["Content-Type"] = "application/json";
        requestInit.body = JSON.stringify(payload);
    }

    if (method !== "get" && method !== "delete" && payload.type) {
        const form = new FormData();
        form.append("photo", payload);
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
