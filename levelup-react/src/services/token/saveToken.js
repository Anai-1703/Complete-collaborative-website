import { getTokenInfo } from "./getTokenInfo.js";

export function saveToken(tokenResponse) {
    const token = tokenResponse.token;
    const userData = getTokenInfo(token);
    localStorage.setItem("USER_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(userData));
}
