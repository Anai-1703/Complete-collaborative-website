const { deletePhotoByPostId } = require("../../services/dbService");
const fileService = require("../../services/fileServices");

async function deletePhoto(postId, photoId, dbphoto) {
    try {
        await fileService.deleteFile(postId, photoId); // Elimina la foto del sistema de archivos
        await deletePhotoByPostId(postId);
        console.log("Deleted photo:", dbphoto.imageURL);
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
}

module.exports = deletePhoto;
