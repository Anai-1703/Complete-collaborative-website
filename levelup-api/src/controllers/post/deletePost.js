"use strict";

const errorService = require("../../services/errorService.js");
const {
    getPostById,
    deletePost,
    deletePostCategories,
    deletePostPlatforms,
    deleteCommentByPostId,
    deleteVoteByPostId,
} = require("../../services/dbService.js");

module.exports = async (postId, userId) => {
    if ((await getPostById(postId)).userId != userId) {
        return errorService.unauthorizedUser();
    }
    console.log("hola");
    await deleteVoteByPostId(postId);
    await deleteCommentByPostId(postId);
    await deletePostCategories(postId);
    await deletePostPlatforms(postId);
    await deletePost(postId);
};
