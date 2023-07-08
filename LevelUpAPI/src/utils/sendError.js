'use strict'


module.exports = (res, error) => {
    const status = error.status || 500;
    const code = error.code || "UNEXPECTED_ERROR";
    const msg = error.message || "¡Ha ocurrido un error inesperado!";

    res.status(status).json({
        success: false,
        error: {
            code: code,
            msg: msg,
        },
    });
};
