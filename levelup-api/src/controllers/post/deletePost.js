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
const deletePhoto = require("./deletePhoto.js");

module.exports = async (postId, userId) => {
    async function deletePhotoFromPost(postId) {
        await deletePhotoByPostId(postId);
        await deletePhoto(postId);
    }

    async function deleteFullPost(postId) {
        await deleteVoteByPostId(postId);
        await deleteCommentByPostId(postId);
        await deletePostCategories(postId);
        await deletePostPlatforms(postId);
        await deletePost(postId);
    }

    const post = await getPostById(postId);
    if (post.idUser != userId) {
        return errorService.unauthorizedUser();
    }

    if (post.imageURL !== null) {
        await deletePhotoFromPost(postId);
        await deleteFullPost(postId);
    } else {
        await deleteFullPost(postId);
    }
};
