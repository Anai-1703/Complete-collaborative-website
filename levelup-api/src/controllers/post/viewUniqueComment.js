"use strict";
const { getCommentByCommentId } = require("../../services/dbService");

module.exports = async (req, res) => {
    return await getCommentByCommentId(req.params.id);
};
