import { fetchAPI } from "./fetchAPI";
import { getToken } from "./token/getToken";

export async function sendPhotoToPost(photo, postId) {
    try {
        const token = getToken();
        console.log(photo);
        // Crear un objeto formData para enviar la foto
        // const formData = new FormData();
        // formData.append("photo", photo);
        // console.log("¿Imprime el formData?");
        // console.log(formData);
        // console.log("¿No?");
        const response = await fetchAPI(
            `/posts/${postId}/photos`,
            "post",
            { foto: photo },
            token
        );
        console.log(response);
        return response;
    } catch (error) {
        // Manejar errores del envío de la foto aquí si es necesario
        throw new Error("Error al enviar la foto al post: " + error.message);
    }
}
