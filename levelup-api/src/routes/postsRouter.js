"use strict";

const { Router, json } = require("express");
("use strict");

const addComment = require("../controllers/post/addComment.js");
const viewComments = require("../controllers/post/viewComments.js");
const addPhoto = require("../controllers/post/addPhoto.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const deletePhoto = require("../controllers/post/deletePhoto.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../middlewares/authGuard.js");
const sendResponse = require("../utils/sendResponse.js");
const listPosts = require("../controllers/post/listPosts.js");
const lastPosts = require("../controllers/post/lastPost.js");
const { searchByCategory } = require("../controllers/post/searchCategory.js");
// const { viewPostDetails } = require("../controllers/post/viewPostDetails.js");
const viewPostDetails = require("../controllers/post/viewPostDetails.js");
const {
    updatePost,
    deletePost,
    checkVote,
} = require("../services/dbService.js");
const viewUniqueComment = require("../controllers/post/viewUniqueComment.js");
const toggleVote = require("../controllers/post/toggleVote.js");

const router = Router();

/*
 ****    POSTS   ****
 */

router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const fullPost = await lastPosts();
        // console.log("fullPost: ", fullPost);
        const posts = await listPosts();
        const allPosts = [...fullPost, ...posts];
        sendResponse(res, allPosts);
    })
);

router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetails(req); // revisar
        sendResponse(res, post);
    })
);

router.get(
    "/posts/search-post-categories",
    handleAsyncError(async (req, res) => {
        const search = await searchByCategory();
        sendResponse(res, search);
    })
);

router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        console.log("el usuario que llega al postRouter.js", req.currentUser);
        console.log("el req.body: ", req.body);
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser

        await createPost(req.body, token, res); // Pasa res como parámetro
        sendResponse(res, req.body, undefined, 201);
    })
);

router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, req.body, undefined, 201);
    })
);

router.get(
    "/posts/:id/comments",
    handleAsyncError(async (req, res) => {
        const post = await viewComments(req);
        sendResponse(res, post);
    })
);

router.get(
    "/posts/:id/comments/:id",
    handleAsyncError(async (req, res) => {
        const comment = await viewUniqueComment(req);
        sendResponse(res, comment);
    })
);

router.put(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

router.put(
    "/posts/:id/comments/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token;
        console.log("hola");
        await editComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

router.delete(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        console.log("req.params.id: ", req.params.id); // Esto es el postId
        console.log("req.currentuser: ", req.currentUser);
        console.log("req.body: ", req.body);
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser
        await deletePost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

router.delete(
    "/posts/:id/comments/:commentId",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        console.log("req.params.commentId: ", req.params.commentId);
        console.log("req.params.id: ", req.params.id); // Esto es el postId
        console.log("req.currentuser: ", req.currentUser);
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token;
        await deleteComment(req.params.commentId, req.currentUser.id);
        sendResponse(res, undefined, 200);
    })
);

/*
 **** VOTOS  ***
 */

router.post(
    "/posts/:id/votes",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        console.log("Se está ejecutando el voto...");
        const idPost = req.params.id; // ID del post
        console.log("idPost: ", idPost);
        const idUser = req.currentUser.id;
        console.log("idUser: ", idUser);
        const userVote = req.body.vote;
        console.log(userVote);
        await toggleVote(idPost, idUser, userVote);

        sendResponse(res, undefined, 200);
    })
);

module.exports = router;
