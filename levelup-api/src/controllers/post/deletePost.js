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
    const post = await getPostById(postId);
    if (post.idUser != userId) {
        return errorService.unauthorizedUser();
    } else {
        await deleteVoteByPostId(postId);
        await deleteCommentByPostId(postId);
        await deletePostCategories(postId);
        await deletePostPlatforms(postId);
        await deletePost(postId);
    }
};
