"use strict";

/**
 * Envío de respuesta de status OK.
 * Si recibes este objeto, es que tu petición ha sido completada con éxito.
 */

// Data es el cuerpo de la respuesta en formato de datos
const sendResponse = (res, data, status = 200) => {
    res.status(status).json({
        success: true,
        data,
        message: res.status ?? null,
    });
};

module.exports = sendResponse;
