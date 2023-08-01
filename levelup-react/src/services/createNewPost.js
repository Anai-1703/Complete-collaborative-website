import { fetchAPI } from "./fetchAPI";
import { sendPhotoToPost } from "./sendPhotoToPost";
import { getToken } from "./token/getToken";

export async function createNewPost(newPostData) {
    try {
        const token = getToken();

        // Comprobar si newPostData.photo es null o no
        if (newPostData.photo === null) {
            const response = await fetchAPI(
                `/posts`,
                "post",
                newPostData,
                token
            );
            return response;
        } else {
            // Crear un nuevo objeto newPostDataWithoutPhoto sin la propiedad photo
            const { photo, ...newPostDataWithoutPhoto } = newPostData;
            console.log("el new post data");
            console.log(newPostData);
            console.log("la foto");
            console.log(photo);
            const response = await fetchAPI(
                `/posts`,
                "post",
                newPostDataWithoutPhoto,
                token
            );
            console.log("post creado....");
            console.log(response);
            // Enviar la foto al post creado
            const photoUpload = await sendPhotoToPost(photo, response.data.id);
            console.log(photoUpload);
            // Manejar el resultado del envío de la foto aquí si es necesario

            return response; // devuelve el nuevo post creado desde la api
        }
    } catch (error) {
        // Manejar errores de la solicitud aquí si es necesario
        throw new Error("Error al crear el post: " + error.message);
    }
}

/*
export async function createNewPost(newPostData) {
    try {
        const token = getToken();
        // Comprobar si hay una foto adjunta
        if (newPostData.photo) {
            // Enviar los datos del post excepto la foto para crear el post
            const { photo, ...postDataWithoutPhoto } = newPostData;
            const createdPost = await fetchAPI(
                `/posts`,
                "post",
                newPostData,
                token
            );
            console.log("Post creado:", createdPost);

            // Llamar a la función que enviará la foto al post utilizando el ID del post creado
            if (createdPost?.data?.id) {
                await sendPhotoToPost(createdPost.data.id, newPostData.photo);
                console.log("success sending photo");
            }

            return createdPost;
        } else {
            // No hay foto adjunta, enviar todos los datos para crear el post
            const createdPost = await createNewPost(newPostData);
            console.log("Post creado:", createdPost);

            return createdPost;
        }
    } catch (error) {
        // Manejar errores de la solicitud aquí si es necesario
        throw new Error("Error al crear el post: " + error.message);
    }
}

*/
