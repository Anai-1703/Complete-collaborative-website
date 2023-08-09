"use strict";

// Importamos las dependencias.
const { Router, json } = require("express");
const fileUpload = require("express-fileupload");
// Configuramos límite de tamaño en archivos y otras.
// ¿Límite de cantidad de archivos también? revisar
const router = Router();

// Importamos las funciones controladoras intermedias.
const authGuard = require("../middlewares/authGuard.js");

// Importamos las funciones controladoras finales.
const addComment = require("../controllers/post/addComment.js");
const viewComments = require("../controllers/post/viewComments.js");
const addPhoto = require("../controllers/post/addPhoto.js");
const deletePhoto = require("../controllers/post/deletePhoto.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const listPosts = require("../controllers/post/listPosts.js");
const lastPosts = require("../controllers/post/lastPost.js");
const { searchByCategory } = require("../controllers/post/searchCategory.js");
// const { viewPostDetails } = require("../controllers/post/viewPostDetails.js");
const viewPostDetails = require("../controllers/post/viewPostDetails.js");
const viewUniqueComment = require("../controllers/post/viewUniqueComment.js");
const toggleVote = require("../controllers/post/toggleVote.js");

// Importamos las funciones que interactúan con la base de datos.
const { countVotes } = require("../services/dbService.js");

// Importamos los servicios necesarios.
const fileService = require("../services/fileServices.js");
const handleAsyncError = require("../services/handleAsyncError.js");

// Importamos la función que envía una respuesta al cliente.
const sendResponse = require("../utils/sendResponse.js");
const deletePost = require("../controllers/post/deletePost.js");

// Obtener un listado de posts.
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const posts = await listPosts();
        sendResponse(res, posts);
    })
);

// Obtener info de un post concreto.
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetails(req); // revisar
        sendResponse(res, post);
    })
);

// Este endpoint no debería ser necesario. El propio endpoint que permite listar todos los posts debería
// permitir filtrar.
router.get(
    "/posts/search-post-categories",
    handleAsyncError(async (req, res) => {
        const search = await searchByCategory();
        sendResponse(res, search);
    })
);

// Crear un nuevo post.
router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser
        const post = await createPost(req.body, token, res); // Pasa res como parámetro
        const fullPost = { ...req.body, ...post.newPost };
        sendResponse(res, fullPost, undefined, 201);
    })
);

// Agregar una foto a un post.
router.put(
    "/posts/:id/photos",
    authGuard,
    handleAsyncError(async (req, res) => {
        const photo = req.files.photo;
        console.log(photo);
        await addPhoto(req.params.id, req.currentUser.id, photo);
        sendResponse(res);
    })
);

router.delete(
    "/posts/:id/photos",
    authGuard,
    handleAsyncError(async (req, res) => {
        console.log(req.params.id);
        await deletePhoto(req.params.id);
        sendResponse(res);
    })
);

// Agregar un comentario a un post.
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, req.body, undefined, 201);
    })
);

// Cuando obtengo información detallada de un post "GET - /posts/:id" se debería incluír el listado de post
// como una propiedad del post (un array de posts).
router.get(
    "/posts/:id/comments",
    handleAsyncError(async (req, res) => {
        const post = await viewComments(req);
        sendResponse(res, post);
    })
);

// Este endpoint tampoco es necesario.
router.get(
    "/posts/:id/comments/:id",
    handleAsyncError(async (req, res) => {
        const comment = await viewUniqueComment(req);
        sendResponse(res, comment);
    })
);

// Editar un post.
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

// Editar un comentario.
router.put(
    "/posts/:id/comments/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token;
        await editComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

// Eliminar un post.
router.delete(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token;
        await deletePost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

// Eliminar un comentario.
router.delete(
    "/posts/:id/comments/:commentId",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const token = req.currentUser.token;
        await deleteComment(req.params.commentId, req.currentUser.id);
        sendResponse(res, undefined, 200);
    })
);

// Agregar un voto a un post.
router.post(
    "/posts/:id/votes",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await toggleVote(req.params.id, req.currentUser.id, req.body.vote);
        const votes = await countVotes(req.params.id);
        console.log(votes);
        sendResponse(res, votes, undefined, 200);
    })
);

module.exports = router;
