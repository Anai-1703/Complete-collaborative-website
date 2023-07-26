"use strict";

const handleAsyncError = require("../../services/handleAsyncError");
const { getCommentsByPostId } = require("../../services/dbService.js");

module.exports = async (req, res) => {
    return await getCommentsByPostId(req.params.id);
};
