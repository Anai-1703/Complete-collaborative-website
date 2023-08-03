export function getTokenInfo(token) {
    if (!token || typeof token !== "string") {
        return null;
    }
    let payloadString;
    try {
        if (typeof token === "string") {
            const tokenParts = token.split(".");
            const payloadBase64 = tokenParts[1];
            payloadString = atob(payloadBase64);
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
    return JSON.parse(payloadString);
}
