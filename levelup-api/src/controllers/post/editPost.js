"use strict";

const errorService = require("../../services/errorService.js");
const {
    getPostById,
    updatePost,
    deletePostCategories,
    deletePostPlatforms,
    savePostCategories,
    savePostPlatforms,
} = require("../../services/dbService.js");

module.exports = async (postId, userId, postPayload) => {
    // console.log(postPayload);
    const oldPost = await getPostById(postId);
    // console.log(oldPost);
    if (oldPost.idUser !== userId) {
        return errorService.unauthorizedUser();
    }

    const updatedPost = Object.assign({}, oldPost, postPayload);
    console.log("updated post");
    console.log(updatedPost);
    await updatePost(updatedPost);

    await deletePostCategories(updatedPost.id);
    await savePostCategories(updatedPost.id, updatedPost.categories);

    await deletePostPlatforms(updatedPost.id);
    await savePostPlatforms(updatedPost.id, updatedPost.platforms);
};
