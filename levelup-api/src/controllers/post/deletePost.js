"use strict";

const errorService = require("../../services/errorService.js");
const {
    getPostById,
    deletePost,
    deletePostCategories,
    deletePostPlatforms,
    deleteCommentByPostId,
    deleteVoteByPostId,
    deletePhotoByPostId,
} = require("../../services/dbService.js");

module.exports = async (postId, userId) => {
    const post = await getPostById(postId);
    if (post.idUser != userId) {
        return errorService.unauthorizedUser();
    } else {
        await deleteVoteByPostId(postId);
        await deleteCommentByPostId(postId);
        await deletePostCategories(postId);
        await deletePostPlatforms(postId);
        await deletePhotoByPostId(postId);
        await deletePost(postId);
    }
};
