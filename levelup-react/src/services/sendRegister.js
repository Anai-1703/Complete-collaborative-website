import { fetchAPI } from "./fetchAPI.js";

export async function sendRegister(payload) {
    try {
        const response = await fetchAPI("/register", "post", payload);
        return response; // Retornar la respuesta recibida
    } catch (error) {
        console.error("Error en sendRegister:", error);
        throw error; // Relanzar el error para que sea capturado en el componente RegisterForm
    }
}
