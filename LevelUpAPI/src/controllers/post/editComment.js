"use strict";

const {
    getCommentByCommentId,
    updateComment,
} = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");

module.exports = async (commentId, userId, commentPayload) => {
    const oldComment = await getCommentByCommentId(commentId);

    if (oldComment[0].iDUser !== userId) {
        return errorService.unauthorizedUser();
    }

    const newPost = Object.assign({}, oldComment, commentPayload);

    await updateComment(newPost);
};
