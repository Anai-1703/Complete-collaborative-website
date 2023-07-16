const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Asignar fs.promises a una variable
const fsPromises = fs.promises;

async function saveFile(postId, photoId, photoFile) {
  const directory = path.join(__dirname, "../../public/photos", postId);
  await fsPromises.mkdir(directory, { recursive: true });

  const filename = `${photoId}.webp`;
  const filePath = path.join(directory, filename);

  const sharpProcess = sharp(photoFile);
  const metadata = await sharpProcess.metadata();

  if (metadata.width > 1080) {
    sharpProcess.resize(720);
  }

  await sharpProcess.webp().toFile(filePath);

  const fileURL = `/photos/${postId}/${filename}`;
  return fileURL;
}

async function deletePhoto(dbphoto) {
  const directory = path.join(__dirname, "../../public/photos");
  const filePath = path.join(directory, dbphoto.imageURL);
  await fsPromises.unlink(filePath);
}

module.exports = {
  saveFile,
  deletePhoto,
};
