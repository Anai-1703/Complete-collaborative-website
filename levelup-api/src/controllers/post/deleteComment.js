"use strict";
const {
    getCommentByCommentId,
    deleteComment,
} = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");

module.exports = async (commentId, userId) => {
    console.log("// commentId: ", commentId);
    console.log("// userId: ", userId);

    const comment = await getCommentByCommentId(commentId);
    console.log("esto es el comment de DeleteComment: ", comment);
    console.log(userId);
    console.log(comment[0].iDUser);

    //
    if (comment[0].iDUser != userId) {
        return errorService.unauthorizedUser();
    }
    //
    console.log("Esto lo ha pasado");
    await deleteComment(commentId);
};
