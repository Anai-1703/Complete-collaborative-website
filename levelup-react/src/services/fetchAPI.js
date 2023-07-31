const host = import.meta.env.VITE_API_HOST;

export async function fetchAPI(path, method = "get", payload, token) {
    const requestInit = {
        method: method,
        headers: {},
    };

    if (token) {
        requestInit.headers["Authorization"] = `${token}`;
    }

    if (method === "get" && payload) {
        const query = new URLSearchParams(payload).toString();
        path += `?${query}`;
    }

    if (method !== "get" && method !== "delete" && payload) {
        requestInit.headers["Content-Type"] = "application/json";
        requestInit.body = JSON.stringify(payload);
    }
    console.log(method);
    console.log(host + path, requestInit);
    const response = await fetch(host + path, requestInit);
    const result = await response.json();

    if (!result.success) {
        console.log(result.error);
        console.log(result.error.code);
        throw new Error(result.error.code);
    }

    return result;
}
