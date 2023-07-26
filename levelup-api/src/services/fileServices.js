const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

async function saveFile(postId, photoId, photoFile) {
    const directory = path.join(__dirname, "../../public/photos", postId);

    await fs.mkdir(directory, { recursive: true });

    const filename = `${photoId}.webp`;

    const filePath = path.join(directory, filename);

    const sharpImg = sharp(photoFile.data);

    const metadata = await sharpImg.metadata();

    if (metadata.width > 1080) {
        sharpImg.resize(720);
    }

    await sharpImg.webp().toFile(filePath);

    const fileURL = `/${postId}/${filename}`;

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
