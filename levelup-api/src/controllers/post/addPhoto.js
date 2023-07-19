const { generateUUID } = require("../../services/cryptoServices");
const dbService = require("../../services/dbService");
const errorService = require("../../services/errorService");
const fileServices = require("../../services/fileServices");

async function addPhoto(postId, userId, photo) {
    try {
        const post = await dbService.getPostById(postId);

        //verificar si el post existe
        if (!post) {
            errorService.throwError(404, "Post not found");
        }

        // Si el usuario no es propietario del post lanzamos un error.
        if (post.idUser !== userId) {
            errorService.unauthorizedUser();
        }

        //generar el id de la foto
        const photoId = generateUUID();

        // Guarda la foto en el disco y obtenemos la URL de la misma.
        const fileURL = await fileServices.saveFile(postId, photoId, photo);

        // Guardar la foto en la base de datos
        await dbService.savePhoto({
            id: photoId,
            imageURL: fileURL,
            postId: postId,
        });
    } catch (error) {
        throw error;
    }
}

module.exports = addPhoto;
