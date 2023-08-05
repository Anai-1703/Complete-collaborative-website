const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

async function saveFile(postId, photoId, photoFile) {
    console.log("foto en fileservices");
    console.log(photoFile);
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

async function deleteFile(postId, photoId) {
    const directory = path.join(__dirname, "../../public/photos", postId);
    const filename = `${photoId}.webp`;
    const filePath = path.join(directory, filename);

    try {
        await fs.unlink(filePath); // Elimina el archivo de la carpeta public
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}

module.exports = {
    saveFile,
    deleteFile,
};
