'use strict'

const { generateUUID } = require("../../services/cryptoServices");
const dbService = require("../../services/dbService.js");
const fileService = require("../../services/fileServices.js");
const errorService = require("../../services/errorService.js");

module.exports = async (postId, userId, photo) => {
    const id = generateUUID();

    const url = await fileService.processUploadedPostPhoto(postId, id, photo);

    const photoData = {
        id: id,
        imageURL: url,
        postId: postId,
    };

    await dbService.savePhoto(photoData);
};
