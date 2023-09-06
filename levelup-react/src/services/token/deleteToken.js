export function deleteToken() {
    localStorage.removeItem("LU_USER_TOKEN");
    localStorage.removeItem("LU_USER");
}
