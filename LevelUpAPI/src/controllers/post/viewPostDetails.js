"use strict";

const handleAsyncError = require("../../services/handleAsyncError");
const sendResponse = require("../../utils/sendResponse");
const { getPostById } = require("../../services/dbService.js");

module.exports = async (req, res) => {
    return await getPostById(req.params.id);
};
