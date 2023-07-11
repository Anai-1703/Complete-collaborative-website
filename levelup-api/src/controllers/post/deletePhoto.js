const fileService = require("../../services/fileServices");

async function deletePhoto(dbphoto) {
  try {
    await fileService.deletePhoto(dbphoto);
    console.log("deleted photo:", dbphoto.imageURL);
  } catch (error) {
    console.error("error deleting photo:", error);
    throw error;
  }
}

module.exports = deletePhoto;
