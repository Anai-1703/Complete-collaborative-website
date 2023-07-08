"use strict";

const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const { saveComment } = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");
const sendError = require("../../utils/sendError.js");
const dbService = require("../../services/dbService.js");

module.exports = async (postId, currentUserId, res) => {
    console.log("postId", postId);
    console.log("currentUserId", currentUserId);
    console.log("res.comment", res.comment);
    const post = await dbService.getPostById(postId);
    if (!post) {
        errorService.notFound();
    }

    const newComment = {
        id: generateUUID(),
        userId: currentUserId,
        postId,
        comment: res.comment,
    };
    console.log(newComment);

    await saveComment(newComment);
    return {
        newComment,
    };
};
