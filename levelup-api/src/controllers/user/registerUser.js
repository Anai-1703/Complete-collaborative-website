"use strict";
const timeService = require("../../services/timeService.js");
const errorService = require("../../services/errorService.js");
const {
    hashPassword,
    generaterandomvalidationcode,
    generateUUID,
} = require("../../services/cryptoServices.js");
const {
    saveUser,
    saveValidationCode,
    getUserByEmail,
} = require("../../services/dbService.js");
const {
    setSenderCredentials,
    sendValidationEmail,
} = require("../../services/emailService.js");
const { isValid, parseISO, differenceInYears } = require("date-fns");

module.exports = async (userData) => {
    if (!userData.acceptedTOS) {
        return {
            success: false,
            error: "Did not accepte TOS",
        };
    }

    if (await getUserByEmail(userData.email)) {
        return errorService.emailAlreadyRegistered;
    }

    const { birthday } = userData;
    const parsedBirthday = parseISO(birthday);
    if (!isValid(parsedBirthday)) {
        return {
            success: false,
            error: "Invalid birthday",
        };
    }
    const currentDate = new Date();
    const age = differenceInYears(currentDate, parsedBirthday);
    if (age < 18) {
        return {
            success: false,
            error: "User must be at least 18 years old",
        };
    }
    const hashedPassword = await hashPassword(userData.password);
    const randomCode = generaterandomvalidationcode();
    const newUserId = generateUUID();

    const user = {
        ...userData,
        password: hashedPassword,
        id: newUserId,
        validated: false,
        role: "Usuario",
    };
    await saveUser(user);

    const expiraTimestamp = timeService.getTimestampMinutesFromNow(6);
    const validationCode = {
        id: generateUUID(),
        idUser: user.id,
        code: randomCode,
        expiraTimestamp,
    };
    await saveValidationCode(validationCode);
    console.log("email: ", user.email);
    await sendValidationEmail(user.email, user.nameMember, validationCode.code);

    return {
        success: true,
        message: "User registered",
    };
};
