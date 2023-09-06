// import { getTokenInfo } from "./getTokenInfo.js";

export function saveToken(tokenResponse) {
    const token = tokenResponse.token;
    const userData = tokenResponse.user;
    localStorage.setItem("LU_USER_TOKEN", token);
    localStorage.setItem("LU_USER", JSON.stringify(userData));
}
