export function getTokenInfo(token) {
    let payloadString;
    try {
        if (typeof token === "string") {
            const tokenParts = token.split(".");
            const payloadBase64 = tokenParts[1];
            payloadString = atob(payloadBase64);
        } else {
            throw new Error("Token is not a valid string.");
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
    return JSON.parse(payloadString);
}
