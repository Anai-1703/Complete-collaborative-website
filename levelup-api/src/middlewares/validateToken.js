"use strict";

const parseJWT = require("../services/cryptoServices.js").parseJWT;

/**
 * Validador de TOKENS
 * Revisa el campo de Authorization que hay en el Header de la petición
 * Si existe, validamos el token con la función de parseJWT
 * Sino, declaramos que el user no tiene acceso.
 */
module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const user = parseJWT(token);
        if (user) {
            req.currentUser = user;
        } else {
            req.currentUser = null;
        }
    } else {
        req.currentUser = null;
    }
    next();
};
