'use strict'

const mailjet = require("node-mailjet").apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);


module.exports = {
    async sendEmail(to, toName, subject, message) {
        await mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAIL_SENDER_FROM,
                        Name: process.env.MAIL_SENDER_NAME,
                    },
                    To: [
                        {
                            Email: to,
                            Name: toName,
                        },
                    ],
                    Subject: subject,
                    HTMLPart: message,
                },
            ],
        });
    },

    async sendValidationEmail(email, nameMember, validationCode) {
        await module.exports.sendEmail(
            email,
            nameMember,
            "Colaborative Website - Código de validación",
            `<h1>Bienvenido a Colaborative Website</h1>
            Querido ${nameMember}, para poder utilizar todos los servicios de Colaborative Website debe validar su email con el siguiente código:
            </br>
            <h2>${validationCode}</h2>
            </br>
            Un cordial saludo.
            Colaborative Website
            `
        );
    },
};
