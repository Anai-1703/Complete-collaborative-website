"use strict";

const { Router } = require("express");
const { json } = require("express");

const registerUser = require("../controllers/user/registerUser.js");
const loginUser = require("../controllers/user/loginUser.js");
const sendResponse = require("../utils/sendResponse.js");
const sendError = require("../utils/sendError.js");
const authGuard = require("../middlewares/authGuard.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const validateBody = require("../middlewares/validateBody.js");
const registerPayload = require("../validators/registerPayload.js");
const { getUserById, getPostByUserId } = require("../services/dbService.js");
const { controlPanel } = require("../controllers/user/controlPanel.js");
const { invalidCredentials } = require("../services/errorService.js");

const router = Router();

router.post("/register", json(), async (req, res) => {
    const result = await registerUser(req.body);
    res.json(result);
});

router.post("/login", json(), async (req, res) => {
    try {
        const token = await loginUser(req.body);
        sendResponse(res, { token });
    } catch (error) {
        if (error.code === "INVALID_CREDENTIALS") {
            // Si el error es una credencial inválida, enviamos una respuesta negativa
            sendResponse(res, { error: "Invalid email or password" }, 400);
        } else {
            // Si el error no es una credencial inválida, enviamos una respuesta con error 500
            sendResponse(res, { error: "Internal server error" }, 500);
        }
    }
});

router.get("/users/:id", json(), async (req, res) => {
    const user = await getUserById(req.params.id);
    const posts = await getPostByUserId(req.params.id);
    const userAndPost = [{ user }, { posts }];
    sendResponse(res, userAndPost, undefined, 200);
});

// EN DESARROLLO
router.put(
    "/users/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        const userId = req.params.id;
        const userInfo = req.body;
        const info = await controlPanel(userId, userInfo);
        sendResponse(res, info, undefined, 201);
    })
);

// router.post("/users/register", json(), async (req, res) => {
//     validateBody(registerPayload);
//     handleAsyncError(async (req, res) => {
//         await registerUser(req.body);
//         sendResponse(res);
//     });
// });

router.get("/users", authGuard, (req, res) => {
    res.send("Listado usuarios");
});

router.patch("/users/:id", authGuard, json(), (req, res) => {
    res.json(req.body);
});

module.exports = router;
