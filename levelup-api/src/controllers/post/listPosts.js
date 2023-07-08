"use strict";

const { getAllPosts } = require("../../services/dbService.js");

module.exports = async () => {
    return await getAllPosts();
};
