"use strict";

const validateToken = require("../../middlewares/validateToken.js");
const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const { savePost } = require("../../services/dbService.js");
const sendError = require("../../utils/sendError.js");

/**
 * Crea un nuevo post utilizando los datos proporcionados.
 * @param {Object} data - Datos del post.
 * @param {string} token - Token de autenticación del usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto de respuesta.
 */
module.exports = async (data, token, res) => {
    try {
        const user = parseJWT(token);

        // Verificar si el usuario está autenticado
        if (!user) {
            throw new Error("Usuario no autenticado");
        }

        // Verificar si el token es válido
        if (!token) {
            throw new Error("INVALID TOKEN");
        }
        const { title, entradilla, description } = data;

        if (!title || !entradilla || !description) {
            throw new Error(
                "Debe proporcionar un título y una descripción para el post"
            );
        }
        console.log("Titulo: ", data.title);
        console.log("Entradilla: ", data.entradilla);
        console.log("Descripcion: ", data.description);

        const newPost = {
            id: generateUUID(),
            idUser: user.id,
            title: data.title,
            entradilla: data.entradilla,
            description: data.description,
        };
        await savePost(newPost);

        return {
            newPost,
        };
    } catch (error) {
        sendError(res, error);
    }
};
