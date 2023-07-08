"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 10);
    },

    async validatePassword(plainPassword, hash) {
        console.log("validando....");
        console.log(plainPassword);
        console.log(hash);
        return await bcrypt.compare(plainPassword, hash);
    },

    generaterandomvalidationcode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    },

    generateUUID() {
        return crypto.randomUUID();
    },

    generateJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
    },

    parseJWT(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return { ...payload, token };
        } catch {
            return null;
        }
    },
};
