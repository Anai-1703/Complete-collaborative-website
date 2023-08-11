import { fetchAPI } from "./fetchAPI";
import { sendPhotoToPost } from "./sendPhotoToPost";
import { getToken } from "./token/getToken";

export async function createNewPost(newPostData) {
    try {
        const token = getToken();
        console.log("hola");
        // Comprobar si newPostData.photo es null o no
        if (newPostData.photo === null) {
            console.log("foto es null");
            console.log(newPostData);
            const response = await fetchAPI(
                `/posts`,
                "post",
                newPostData,
                token
            );
            console.log(response);
            return response;
        } else {
            // Crear un nuevo objeto newPostDataWithoutPhoto sin la propiedad photo
            const { photo, ...newPostDataWithoutPhoto } = newPostData;
            const response = await fetchAPI(
                `/posts`,
                "post",
                newPostDataWithoutPhoto,
                token
            );
            // Enviar la foto al post creado
            const photoUpload = await sendPhotoToPost(
                photo,
                response.data.id,
                token
            );
            return response;
        }
    } catch (error) {
        throw new Error("Error al crear el post: " + error.message);
    }
}
