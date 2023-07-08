"use strict";

const { Router } = require("express");

const postsRouter = require("./postsRouter.js");
const userRouter = require("./userRouter.js");


const router = Router();
router.use(userRouter);
router.use(postsRouter);


module.exports = router;
