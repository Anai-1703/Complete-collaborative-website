import { getTokenInfo } from "./getTokenInfo.js";

export function saveToken(tokenResponse) {
    console.log("Token recibido:", tokenResponse.token); // Agrega esta línea para depurar
    const token = tokenResponse.token;
    const userData = getTokenInfo(token);
    localStorage.setItem("USER_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(userData));
}
