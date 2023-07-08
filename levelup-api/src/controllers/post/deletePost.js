"use strict";

const errorService = require("../../services/errorService.js");
const { getPostById, deletePost } = require("../../services/dbService.js");

module.exports = async (postId, userId) => {
    console.log("//deletePost: postId: ", postId);
    console.log("//deletePost: userId: ", userId);
    if ((await getPostById(postId)).userId != userId) {
        return errorService.unauthorizedUser();
    }

    await deletePost(postId);
};
