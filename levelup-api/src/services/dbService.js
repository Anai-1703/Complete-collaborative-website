"use strict";

const { getConnection } = require("../database/mysqlConnection.js");
const sendResponse = require("../utils/sendResponse.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
        console.log("LLegamos a la BBDD");
        const statement = `
        INSERT INTO users(id, nameMember, email, password, birthday, acceptedTOS, validated)
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
        await db.execute(statement, [
            user.id,
            user.nameMember,
            user.email,
            user.password,
            user.birthday,
            user.acceptedTOS,
            user.validated,
        ]);
        console.log("Consulta completa");
    },

    async getUserById(userId) {
        const statement = `
      SELECT id, nameMember, biography, avatarURL, country, role
      FROM users
      WHERE id = ?`;
        const [rows] = await db.execute(statement, [userId]);
        console.log(rows);
        return rows;
    },

    //EN DESARROLLO
    async updateUser(edit) {
        const statement = `
        UPDATE users
        SET biography = ?, avatarURL = ?, country = ?
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [
            edit.biography ?? null,
            edit.avatarURL ?? null,
            edit.country ?? null,
            edit.id,
        ]);
        return rows;
    },

    // unsafe???
    async getUserByEmail(email) {
        const statement = `
        SELECT *
        FROM users
        WHERE users.email = ?
      `;
        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    async getEnabledUsers() {
        const statement = `
        SELECT *
        FROM users
        WHERE emailValidated = true
      `;
        const [rows] = await db.execute(statement);

        return rows;
    },

    async saveValidationCode(code) {
        console.log(code);
        const statement = `
        INSERT INTO validation(id, idUser, code)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, [code.id, code.idUser, code.code]);
    },

    async getAllUsers() {
        try {
            const db = getConnection();
            const query = "SELECT * FROM users";
            const [rows] = await db.query(query);
            db.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async getAllPosts() {
        console.log("peticion de todos los posts");
        const statement = `
        SELECT 
          p.id, 
          p.title, 
          p.entradilla, 
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL,
          pc.comments AS lastComment,
          pc.idUser AS commentUserId,
          uc.avatarURL AS commentUserAvatarURL,
          uc.nameMember AS commentUserNameMember,
          pi.imageURL,
          v.upvotes,
          v.downvotes,
          c.categories,
          plt.platforms
        FROM 
          POSTS p
        JOIN 
          users u ON p.idUser = u.id
        LEFT JOIN 
          (SELECT 
            idPost, MAX(createdAt) AS ultimoComentarioFecha
          FROM 
            postcomments
          GROUP BY 
            idPost) AS subquery ON p.id = subquery.idPost
        LEFT JOIN 
          postcomments pc ON subquery.idPost = pc.idPost AND subquery.ultimoComentarioFecha = pc.createdAt
        LEFT JOIN
          users uc ON pc.idUser = uc.id
        LEFT JOIN
          postimages pi ON p.id = pi.idPost
        LEFT JOIN
          (SELECT 
            idPost,
            SUM(votes = 1) AS upvotes,
            SUM(votes = 0) AS downvotes
          FROM
            votes
          GROUP BY
            idPost) AS v ON p.id = v.idPost
        LEFT JOIN
          (SELECT 
            pcats.postId,
            GROUP_CONCAT(DISTINCT c.category) AS categories
          FROM
            postcategories pcats
          JOIN
            categories c ON pcats.categoryId = c.id
          GROUP BY
            pcats.postId) AS c ON p.id = c.postId
        LEFT JOIN
          (SELECT 
            pplat.postId,
            GROUP_CONCAT(DISTINCT plt.platform) AS platforms
          FROM
            postplatforms pplat
          JOIN
            platforms plt ON pplat.platformId = plt.id
          GROUP BY
            pplat.postId) AS plt ON p.id = plt.postId
        ORDER BY 
          createdAt DESC;
      `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async getLastPost() {
        const statement = `
      SELECT * FROM posts
      ORDER BY createdAt DESC
      LIMIT 1
    `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async getPostById(postId) {
        const statement = `
        SELECT 
          p.id, 
          p.title, 
          p.entradilla, 
          p.description,
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL,
          JSON_ARRAYAGG(JSON_OBJECT(
            'comment', pc.comments,
            'avatarURL', uc.avatarURL,
            'nameMember', uc.nameMember,
            'idUser', pc.idUser
          )) AS comments,
          pc.idUser AS commentUserId,
          uc.avatarURL AS commentUserAvatarURL,
          uc.nameMember AS commentUserNameMember,
          pi.imageURL,
          v.upvotes,
          v.downvotes,
          c.categories,
          plt.platforms
        FROM 
          POSTS p
        JOIN 
          users u ON p.idUser = u.id
        LEFT JOIN 
          (SELECT 
            idPost, MAX(createdAt) AS ultimoComentarioFecha
          FROM 
            postcomments
          GROUP BY 
            idPost) AS subquery ON p.id = subquery.idPost
        LEFT JOIN 
          postcomments pc ON subquery.idPost = pc.idPost AND subquery.ultimoComentarioFecha = pc.createdAt
        LEFT JOIN
          users uc ON pc.idUser = uc.id
        LEFT JOIN
          postimages pi ON p.id = pi.idPost
        LEFT JOIN
          (SELECT 
            idPost,
            SUM(votes = 1) AS upvotes,
            SUM(votes = 0) AS downvotes
          FROM
            votes
          GROUP BY
            idPost) AS v ON p.id = v.idPost
        LEFT JOIN
          (SELECT 
            pcats.postId,
            GROUP_CONCAT(DISTINCT c.category) AS categories
          FROM
            postcategories pcats
          JOIN
            categories c ON pcats.categoryId = c.id
          GROUP BY
            pcats.postId) AS c ON p.id = c.postId
        LEFT JOIN
          (SELECT 
            pplat.postId,
            GROUP_CONCAT(DISTINCT plt.platform) AS platforms
          FROM
            postplatforms pplat
          JOIN
            platforms plt ON pplat.platformId = plt.id
          GROUP BY
            pplat.postId) AS plt ON p.id = plt.postId
        WHERE 
          p.id = ? 
        GROUP BY 
          p.id, 
          p.title, 
          p.entradilla, 
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL,
          pc.idUser,
          uc.avatarURL,
          uc.nameMember,
          pi.imageURL,
          v.upvotes,
          v.downvotes,
          c.categories,
          plt.platforms
        ORDER BY 
          createdAt DESC;
    `;
        const [rows] = await db.execute(statement, [postId]);
        console.log(rows);
        return rows[0];
    },

    async getPostByUserId(userId) {
        console.log("conseguir post por user id");
        console.log(userId);
        const statement = `
        SELECT 
          p.id, 
          p.title, 
          p.entradilla, 
          p.description,
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL, 
          pi.imageURL,
          v.upvotes,
          v.downvotes,
          c.categories,
          plt.platforms
        FROM 
          posts p
        JOIN 
          users u ON p.idUser = u.id
        LEFT JOIN 
          (SELECT 
            idPost,
            SUM(votes = 1) AS upvotes,
            SUM(votes = 0) AS downvotes
          FROM
            votes
          GROUP BY
            idPost) AS v ON p.id = v.idPost
        LEFT JOIN
          (SELECT 
            pcats.postId,
            GROUP_CONCAT(DISTINCT c.category) AS categories
          FROM
            postcategories pcats
          JOIN
            categories c ON pcats.categoryId = c.id
          GROUP BY
            pcats.postId) AS c ON p.id = c.postId
        LEFT JOIN
          (SELECT 
            pplat.postId,
            GROUP_CONCAT(DISTINCT plt.platform) AS platforms
          FROM
            postplatforms pplat
          JOIN
            platforms plt ON pplat.platformId = plt.id
          GROUP BY
            pplat.postId) AS plt ON p.id = plt.postId
        LEFT JOIN 
          postimages pi ON p.id = pi.idPost
        WHERE 
          p.idUser = ?
        GROUP BY 
          p.id, 
          p.title, 
          p.entradilla, 
          p.description,
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL, 
          pi.imageURL,
          v.upvotes,
          v.downvotes,
          c.categories,
          plt.platforms
        ORDER BY 
          createdAt DESC;
      
      `;
        const [rows] = await db.execute(statement, [userId]);
        console.log(rows);
        return rows;
    },

    async savePost(post) {
        const statement = `
        INSERT INTO posts(id, idUser, title, entradilla, description)
        VALUES(?, ?, ?, ?, ?);
      `;
        await db.execute(statement, [
            post.id,
            post.idUser,
            post.title,
            post.entradilla,
            post.description,
        ]);
    },

    async savePostPlatforms(postId, platforms) {
        try {
            const platformIds = await Promise.all(
                platforms.map(async (platform) => {
                    const [rows] = await db.execute(
                        "SELECT id FROM platforms WHERE platform = ?",
                        [platform]
                    );
                    if (rows.length === 0) {
                        throw new Error(
                            `La plataforma '${platform}' no existe en la tabla platforms.`
                        );
                    }
                    return rows[0].id;
                })
            );

            // Construir la consulta manualmente con los valores que deseamos insertar
            let values = "";
            platformIds.forEach((platformId, index) => {
                values += `(${db.escape(postId)}, ${db.escape(platformId)})`;
                if (index < platformIds.length - 1) {
                    values += ", ";
                }
            });

            const statement = `
          INSERT INTO postplatforms(postId, platformId)
          VALUES ${values};
        `;

            await db.execute(statement);
            console.log("savePostPlatforms ha finalizado");
        } catch (error) {
            console.error("Error en savePostPlatforms:", error);
            throw error;
        }
    },

    async savePostCategories(postId, categories) {
        try {
            const categoryIds = await Promise.all(
                categories.map(async (category) => {
                    const [rows] = await db.execute(
                        "SELECT id FROM categories WHERE category = ?",
                        [category]
                    );
                    if (rows.length === 0) {
                        throw new Error(
                            `La categoría '${category}' no existe en la tabla categories.`
                        );
                    }
                    return rows[0].id;
                })
            );

            // Construir la consulta manualmente con los valores que deseamos insertar
            let values = "";
            categoryIds.forEach((categoryId, index) => {
                values += `(${db.escape(postId)}, ${db.escape(categoryId)})`;
                if (index < categoryIds.length - 1) {
                    values += ", ";
                }
            });

            const statement = `
          INSERT INTO postcategories(postId, categoryId)
          VALUES ${values};
        `;

            await db.execute(statement);
            console.log("savePostCategories ha finalizado");
        } catch (error) {
            console.error("Error en savePostCategories:", error);
            throw error;
        }
    },

    async updatePost(post) {
        const statement = `
        UPDATE posts
        SET title = ?, description = ?
        WHERE id = ?
      `;
        await db.execute(statement, [post.title, post.description, post.id]);
    },

    async getCommentsByPostId(postId) {
        const statement = `
          SELECT *
          FROM postcomments
          WHERE idPost = ?
        `;
        const [rows] = await db.execute(statement, [postId]);
        console.log("rows: ", rows);

        return rows;
    },

    async getCommentByCommentId(commentId) {
        const statement = `
      SELECT * FROM postcomments
      WHERE id = ?
      `;

        const [rows] = await db.execute(statement, [commentId]);
        return rows;
    },

    // REVISAR PORQUE NO TIENE RETURN ????
    async saveComment(newComment) {
        const statement = `
        INSERT INTO postcomments(id, iDUser, idPost, comments)
        VALUES(?, ?, ?, ?)
      `;
        console.log(newComment);
        await db.execute(statement, [
            newComment.id,
            newComment.userId,
            newComment.postId,
            newComment.comment,
        ]);
    },

    async searchByCategory(searchTerm, categoryNameArray) {
        try {
            const likeTerm = `%${searchTerm}%`;
            let statement = `
          SELECT * FROM tems
          WHERE ?
          `;
            for (let i = 0; i < categoryNameArray.length; i++) {
                statement += "OR c.name = ?";
            }

            await db.execute(statement, categoryNameArray);
            const [rows, fields] = await db.execute(
                statement,
                categoryNameArray
            );
            return rows;
        } catch (err) {
            searchError(err);
        }
    },

    async checkVote(postId, userId) {
        const statement = `
        SELECT *
        FROM votes
        WHERE idPost = ? AND idUser = ?
      `;
        const [rows] = await db.execute(statement, [postId, userId]);
        return rows;
    },

    async createVote(vote) {
        const statement = `
      INSERT INTO votes (id, idUser, idPost, votes)
      VALUES (?, ?, ?, ?);
      `;
        const [rows] = await db.execute(statement, [
            vote.id,
            vote.idUser,
            vote.idPost,
            vote.userVote,
        ]);
        console.log(rows);
        return rows;
    },

    async deleteVote(idPost, idUser) {
        const statement = `
      DELETE FROM votes 
      WHERE idpost = ? AND iduser = ?;
      `;

        const [rows] = await db.execute(statement, [idPost, idUser]);
        console.log("Rows DeleteVote: ", rows);
        return rows;
    },

    async toggleVote(idPost, idUser, userVote) {
        const statement = `
      UPDATE votes
      SET votes = ?
      WHERE iduser = ? AND idpost = ?
      `;
        const [rows] = await db.execute(statement, [userVote, idUser, idPost]);
    },

    async countVotes(postId) {
        const statement = `
        SELECT COUNT(*) as votes FROM votes
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].votes;
    }, // Actualizado para contar los VOTOS, no likes. Posiblemente tengamos que darle una vuelta por el tema de sumar/restar el boolean.

    async countCommentsByPostId(postId) {
        const statement = `
        SELECT COUNT(*) as comments FROM postcomments
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].comments;
    },

    async deletePost(postId) {
        const statement = `
        DELETE FROM posts
        WHERE id = ?
      `;
        await db.execute(statement, [postId]);
    },

    async updateComment(post) {
        console.log("post: ", post);
        const statement = ` 
        UPDATE postcomments
        SET comments = ?
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [
            post["comment"],
            post["0"]["id"],
        ]);
        console.log(rows);
        return rows;
    },

    async deleteComment(commentId) {
        console.log("dbService: commentId: ", commentId);
        const statement = `
        DELETE FROM postcomments
        WHERE id = ?
      `;
        await db.execute(statement, [commentId]);
    },

    // cambiar
    async savePhoto(photo) {
        console.log("llega al savephoto de dbservice");
        console.log(photo);
        const statement = `
        INSERT INTO postimages(id, idPost, imageURL)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, [photo.id, photo.postId, photo.imageURL]);
    },

    async getPhotoById(photoId) {
        const statement = `
        SELECT * FROM post_photos
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [photoId]);
        return rows[0];
    },

    async deletePhoto(photoId) {
        const statement = `
        DELETE FROM post_photos
        WHERE id = ?
      `;
        await db.execute(statement, [photoId]);
    },

    async getPhotosByPostId(postId) {
        const statement = `
        SELECT *
        FROM post_photos as pp
        WHERE pp.postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);

        return rows;
    },

    async checkUserPermission(postId, userId) {
        const statement = `
        SELECT *
        FROM postcomments
        WHERE idPost = ? AND idUser = ?
      `;
        const [rows] = await db.execute(statement, [postId, userId]);

        return rows.length > 0;
    },
};
