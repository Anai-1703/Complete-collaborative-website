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

    //autorizacion del usuario para cargar la foto
    if (post.userId !== userId) {
      errorService.throwError(403, "You don't have permission to do that");
    }

    //generar el id de la foto
    const id = generateUUID();

    //guarda la foto en el disco
    const url = await fileServices.saveFile(postId, photo, id);

    //crea una nueva post foto y la guarda en la base de datos
    await dbService.savePhoto({
      id: id,
      imageUrl: url,
      postId: postId,
    });
  } catch (error) {
    errorService.throwError(500, error.message);
    throw error;
  }
}

module.exports = addPhoto;
