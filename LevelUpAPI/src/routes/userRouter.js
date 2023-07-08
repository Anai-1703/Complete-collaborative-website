"use strict";

const { Router } = require("express");
const { json } = require("express");

const registerUser = require("../controllers/user/registerUser.js");
const loginUser = require("../controllers/user/loginUser.js");
const sendResponse = require("../utils/sendResponse.js");
const sendError = require("../utils/sendError.js");
const authGuard = require("./../middlewares/authGuard.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const validateBody = require("../middlewares/validateBody.js");
const registerPayload = require("../validators/registerPayload.js");
const { getUserById } = require("../services/dbService.js");
const { controlPanel } = require("../controllers/user/controlPanel.js");
const router = Router();

router.get("/news", (req, res) => {
    console.log("Hola");
    sendResponse(res);
});

router.post("/users/register", json(), async (req, res) => {
    const result = await registerUser(req.body);
    res.json(result);
});

router.get("/users/:id", json(), async (req, res) => {
    const user = await getUserById(req.params.id);
    sendResponse(res, user, undefined, 201);
});

// EN DESARROLLO
router.put(
    "/users/:id/controlpanel",
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

router.post("/users/login", json(), async (req, res) => {
    const token = await loginUser(req.body);
    sendResponse(res, { token });
});

router.get("/users/:id", authGuard, (req, res) => {
    res.send("Detalle usuario");
});

router.get("/users", authGuard, (req, res) => {
    res.send("Listado usuarios");
});

router.patch("/users/:id", authGuard, json(), (req, res) => {
    res.json(req.body);
});

module.exports = router;
