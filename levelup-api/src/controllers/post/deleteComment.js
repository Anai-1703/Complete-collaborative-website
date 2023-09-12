"use strict";
const {
    getCommentByCommentId,
    deleteComment,
} = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");

module.exports = async (commentId, userId) => {
    const comment = await getCommentByCommentId(commentId);
    if (comment[0].idUser != userId) {
        return errorService.unauthorizedUser();
    }
    await deleteComment(commentId);
};
