"use strict";

const jwt = require("jsonwebtoken");
const { getConnection } = require("../../database/mysqlConnection.js");
const validateToken = require("../../middlewares/validateToken.js");
const {
    validatePassword,
    generateJWT,
} = require("../../services/cryptoServices.js");
const { invalidCredentials } = require("../../services/errorService.js");

async function loginUser(data) {
    const pool = getConnection();

    if (!data.email || !data.password) {
        throw invalidCredentials();
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        data.email,
    ]);

    if (rows.length === 0) {
        throw invalidCredentials();
    }

    const passwordMatch = await validatePassword(
        data.password,
        rows[0].password
    );

    if (!passwordMatch) {
        throw invalidCredentials();
    }

    const token = generateJWT(rows[0]);

    const user = {
        id: rows[0].id,
        nameMember: rows[0].nameMember,
    };

    return {
        token,
        user,
    };
}

module.exports = loginUser;
