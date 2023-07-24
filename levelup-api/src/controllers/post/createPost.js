"use strict";

const validateToken = require("../../middlewares/validateToken.js");
const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const {
    savePost,
    savePostPlatforms,
    savePostCategories,
} = require("../../services/dbService.js");
const sendError = require("../../utils/sendError.js");
const sendResponse = require("../../utils/sendResponse.js");

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
        const { title, entradilla, description, platforms, categories } = data;

        if (!title || !entradilla || !description) {
            throw new Error(
                "Debe proporcionar un título y una descripción para el post"
            );
        }
        console.log("Titulo: ", data.title);
        console.log("Entradilla: ", data.entradilla);
        console.log("Descripcion: ", data.description);

        if (
            !data.platforms ||
            data.platforms.length === 0 ||
            !data.categories ||
            data.categories.length === 0
        ) {
            throw new Error(
                "Debe proporcionar al menos una plataforma y una categoría para el post"
            );
        }

        const newPost = {
            id: generateUUID(),
            idUser: user.id,
            title: data.title,
            entradilla: data.entradilla,
            description: data.description,
        };
        await savePost(newPost);
        console.log("miau");
        console.log("newPost ID", newPost.id);
        console.log("plataformas: ", data.platforms);
        console.log("categorias: ", data.categories);
        await savePostPlatforms(newPost.id, data.platforms);
        await savePostCategories(newPost.id, data.categories);

        return {
            newPost,
        };
    } catch (error) {
        sendResponse(error);
        console.log("error al canto");
    }
};
