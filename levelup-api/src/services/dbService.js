"use strict";

const { getConnection } = require("../database/mysqlConnection.js");
const sendResponse = require("../utils/sendResponse.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
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
    },

    async getUserById(userId) {
        const statement = `
      SELECT id, nameMember, biography, avatarURL, country, role
      FROM users
      WHERE id = ?`;
        const [rows] = await db.execute(statement, [userId]);
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
          posts p
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
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'comment', pc.comments,
              'avatarURL', uc.avatarURL,
              'nameMember', uc.nameMember,
              'idUser', pc.idUser
            )
          ) AS comments,
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
          postcomments pc ON p.id = pc.idPost
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
        const [rows] = await db.execute(statement, [postId]);
        console.log(rows);
        return rows[0];
    },

    async getPostByUserId(userId) {
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
        return rows;
    },

    async savePost(post) {
        const statement = `
        INSERT INTO posts(id, idUser, title, entradilla, description)
        VALUES(?, ?, ?, ?, ?);
      `;
        const rows = await db.execute(statement, [
            post.id,
            post.idUser,
            post.title,
            post.entradilla,
            post.description,
        ]);
        return rows;
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
        } catch (error) {
            console.error("Error en savePostCategories:", error);
            throw error;
        }
    },

    // Update Posts

    async updatePost(post) {
        try {
            const statement = `
              UPDATE posts
              SET title = ?, description = ?, entradilla = ?
              WHERE id = ?
          `;
            await db.execute(statement, [
                post.title,
                post.description,
                post.entradilla,
                post.id,
            ]);
        } catch (error) {
            console.error("Error en updatePostBasicInfo:", error);
            throw error;
        }
    },

    // Delete Categories
    async deletePostCategories(postId) {
        try {
            const deleteStatement = `
              DELETE FROM postcategories WHERE postId = ?
          `;
            await db.execute(deleteStatement, [postId]);
        } catch (error) {
            console.error("Error en deletePostCategories:", error);
            throw error;
        }
    },

    // Delete Platform
    async deletePostPlatforms(postId) {
        try {
            const deleteStatement = `
              DELETE FROM postplatforms WHERE postId = ?
          `;
            await db.execute(deleteStatement, [postId]);
        } catch (error) {
            console.error("Error en deletePostPlatforms:", error);
            throw error;
        }
    },

    async getCommentsByPostId(postId) {
        const statement = `
          SELECT *
          FROM postcomments
          WHERE idPost = ?
        `;
        const [rows] = await db.execute(statement, [postId]);

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
        return rows;
    },

    async deleteVote(idPost, idUser) {
        const statement = `
      DELETE FROM votes 
      WHERE idpost = ? AND iduser = ?;
      `;

        const [rows] = await db.execute(statement, [idPost, idUser]);
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

    async deleteVoteByPostId(idPost) {
        const statement = `
    DELETE FROM votes
    WHERE idPost = ?;
    `;
        const [rows] = await db.execute(statement, [idPost]);
        return rows;
    },

    async countVotes(postId) {
        const statement = `
      SELECT 
        SUM(votes = 1) AS upvotes,
        SUM(votes = 0) AS downvotes
      FROM 
        votes
      WHERE 
        idPost = ?;
    `;
        const [rows] = await db.execute(statement, [postId]);
        console.log("Respuesta de countVotes: ", rows);

        return rows[0];
    },

    async countCommentsByPostId(postId) {
        const statement = `
        SELECT COUNT(*) as comments FROM postcomments
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].comments;
    },

    async deletePost(postId) {
        await db.execute("DELETE FROM posts WHERE id = ?", [postId]);
    },

    async updateComment(post) {
        const statement = ` 
        UPDATE postcomments
        SET comments = ?
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [
            post["comment"],
            post["0"]["id"],
        ]);
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

    async deleteCommentByPostId(postId) {
        const statement = `
      DELETE FROM postcomments
      WHERE idPost = ?
      `;
        await db.execute(statement, [postId]);
    },

    async savePhoto(photo) {
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
        DELETE FROM postimages
        WHERE id = ?
      `;
        await db.execute(statement, [photoId]);
    },

    async deletePhotoByPostId(postId) {
        const statement = `
      DELETE FROM postimages WHERE idPost = ?
      `;
        await db.execute(statement, [postId]);
    },

    async getPhotosByPostId(postId) {
        const statement = `
        SELECT *
        FROM postimages as pp
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

    async searchCategory(cat) {
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
          GROUP_CONCAT(DISTINCT c.category) AS categories,
          GROUP_CONCAT(DISTINCT plt.platform) AS platforms
        FROM 
          posts p
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
          postcategories pcats ON p.id = pcats.postId
        LEFT JOIN
          categories c ON pcats.categoryId = c.id
        LEFT JOIN
          postplatforms pplat ON p.id = pplat.postId
        LEFT JOIN
          platforms plt ON pplat.platformId = plt.id
        WHERE
          p.id IN (SELECT pcats.postId FROM postcategories pcats JOIN categories c ON pcats.categoryId = c.id WHERE c.category = ?)
        GROUP BY 
          p.id, 
          p.title, 
          p.entradilla, 
          p.idUser, 
          p.createdAt, 
          u.nameMember, 
          u.avatarURL,
          pc.comments,
          pc.idUser,
          uc.avatarURL,
          uc.nameMember,
          pi.imageURL,
          v.upvotes,
          v.downvotes
        ORDER BY 
          createdAt DESC;
        `;
        const [rows] = await db.execute(statement, [cat]);
        return rows;
    },

    async searchPlatform(plat) {
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
          posts p
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
          p.id IN (
              SELECT 
                pplat2.postId
              FROM
                postplatforms pplat2
              JOIN
                platforms plt2 ON pplat2.platformId = plt2.id
              WHERE
                plt2.platform = ?
          )
        ORDER BY 
          createdAt DESC;
      `;
        const [rows] = await db.execute(statement, [plat]);
        return rows;
    },
};

/*
        SELECT pplat.postId
        FROM postplatforms pplat
        JOIN platforms p ON pplat.platformId = p.id
        WHERE p.platform = ?;    
*/
