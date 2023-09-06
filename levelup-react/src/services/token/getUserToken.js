export function getUserToken() {
    return JSON.parse(localStorage.getItem("LU_USER"));
}
