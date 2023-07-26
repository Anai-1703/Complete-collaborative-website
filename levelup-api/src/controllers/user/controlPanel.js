"use strict";

const { getUserById, updateUser } = require("../../services/dbService");
const errorService = require("../../services/errorService");

module.exports = {
    controlPanel: async function (userId, userInfo) {
        const oldUserInfo = await getUserById(userId);

        if (!oldUserInfo[0]) {
            return errorService.unauthorizedUser();
        }

        const userInfoEdit = Object.assign({}, oldUserInfo[0], userInfo);

        await updateUser(userInfoEdit);
        return userInfoEdit;
    },
};
