import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken";

const host = import.meta.env.VITE_API_HOST;
console.log(host);

export async function createComment(postId, comment) {
    try {
        console.log(comment);
        console.log(postId);

        const token = getToken();
        console.log(token);
        // Llamar a la función fetchAPI con el método 'post' y enviar el nuevo comentario al servidor
        const response = await fetchAPI(
            `/posts/${postId}/comments`,
            "post",
            { comment },
            token
        ); // Usar postId para formar la ruta correcta

        return response;
    } catch (error) {
        // Manejar errores en caso de que la solicitud falle
        console.error("Error al crear el comentario:", error);
        throw error;
    }
}
