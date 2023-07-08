'use strict'

const { searchByCategory } = require("../../services/dbService.js");


module.exports = async () => {
    return await searchByCategory();
};
