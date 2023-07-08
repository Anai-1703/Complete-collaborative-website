"use strict";

const registerUser = require("./registerUser.js");
const dbService = require("../../services/dbService.js");


(async () => {
    const result = await registerUser({
        email: "anai@test.com",
        password: "nomelose22",
        birthdate: new Date(1967, 2, 17),
        country: "Spain",
        acceptedTOS: true,
    });

    if (result) {
        return dbService.errorService.invalidCredentials;
    }
})();
