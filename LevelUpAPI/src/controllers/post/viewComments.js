"use strict";

const handleAsyncError = require("../../services/handleAsyncError");
const { getCommentsByPostId } = require("../../services/dbService.js");

module.exports = async (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    return await getCommentsByPostId(req.params.id);
};
