"use strict";
const {
    checkVote,
    toggleVote,
    createVote,
    deleteVote,
} = require("../../services/dbService");
const { generateUUID } = require("../../services/cryptoServices.js");

// Traer getConnection dela base de datos// PROBAR CUANDO TENGAMOS LA BBDD CON DATOS
const errorService = require("../../services/errorService");

module.exports = async (idPost, idUser, userVote) => {
    const voteExist = await checkVote(idPost);
    // console.log(voteExist[0].votes);
    // console.log(userVote);
    // console.log(voteExist[0].votes == userVote);
    console.log("¿Existe el voto?: ", voteExist);
    if (voteExist.length === 0) {
        console.log("entra en el primer if");
        const vote = {
            id: generateUUID(),
            idUser: idUser,
            idPost: idPost,
            userVote: userVote,
        };
        console.log("esto es VOTE: ", vote);
        return await createVote(vote);
    }

    if (voteExist[0].votes === (userVote ? 1 : 0)) {
        deleteVote(idPost, idUser);
    }

    if (voteExist[0].votes != (userVote ? 1 : 0)) {
        toggleVote(idPost, idUser, userVote);
    }
};
