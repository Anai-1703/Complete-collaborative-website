"use strict";

const { getLastPost } = require("../../services/dbService.js");

module.exports = async () => {
    return await getLastPost();
};
