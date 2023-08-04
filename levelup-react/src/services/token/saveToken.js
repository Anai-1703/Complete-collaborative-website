// import { getTokenInfo } from "./getTokenInfo.js";

export function saveToken(tokenResponse) {
    const token = tokenResponse.token;
    const userData = tokenResponse.user;
    console.log(token);
    console.log("userData: ", userData);
    localStorage.setItem("USER_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(userData));
}
