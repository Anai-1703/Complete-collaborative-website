// "use strict";

// const path = require("path");
// const fs = require("fs/promises");
// const sharp = require("sharp");

// module.exports = {
//     async processUploadedPostPhoto(postId, photoId, photoFile) {
//         const directory = path.join(__dirname, "../../public/photos", postId);
//         await fs.mkdir(directory, { recursive: true });

//         const fileName = `${photoId}.webp`;
//         const filePath = path.join(directory, fileName);

//         const processedImage = sharp(photoFile.data).resize({width: 720}).webp();
//         await processedImage.toFile(filePath);

//         const fileURL = `/photos/${postId}/${fileName}`;
//         return fileURL;
//     },

//     async deletePhoto(dbPhoto) {
//         const filePath = path.join(__dirname, "../../public", dbPhoto.imageURL);
//         await fs.unlink(filePath);
//     },

//     async deletePostPhotos(postId) {
//         const directory = path.join(__dirname, "../../public/photos", postId);
//         await fs.rm(directory, { recursive: true, force: true });
//     },
// };
