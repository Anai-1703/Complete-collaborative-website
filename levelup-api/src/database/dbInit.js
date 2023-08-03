"use strict";

require("dotenv").config();
const { hashPassword, generateUUID } = require("../services/cryptoServices.js");
const { createPool } = require("./mysqlConnection.js");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () => {
    const pool = createPool();
    console.log("Eliminando datos previos...");
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    console.log("Limpieza de archivos completada");
    //CREO LA BASE DE DATOS
    console.log("Creando la base de datos...");
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    console.log("La base de datos ha sido creada con éxito.");
    await pool.query(`USE ${DATABASE_NAME}`);

    //CREO LA TABLA DE USUARIOS
    console.log("Creando tablas...");
    await createDatabaseTables(pool);
    console.log("Tablas creadas con éxito");

    // await insertAdminUsers(pool);

    // await generateFakeData(pool);
    console.log("Base de datos creada con éxito");
    await pool.end();
};

async function createDatabaseTables(pool) {
    const plainPassword = process.env.ADMINPASS;
    const hashedPassword = await hashPassword(plainPassword);

    const adminID = generateUUID();
    const modID = generateUUID();

    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id CHAR(36) PRIMARY KEY,
        nameMember VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        birthday TIMESTAMP NOT NULL,
        acceptedTOS BOOL NOT NULL,
        validated BOOL NOT NULL DEFAULT false,
        biography CHAR(255),
        avatarURL VARCHAR(255),
        country VARCHAR(150),
        role ENUM('Administrador', 'Moderador', 'Usuario', 'VIP') DEFAULT 'Usuario',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS posts(
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        entradilla VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        idUser CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE
    );
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS categories(
        id INT AUTO_INCREMENT PRIMARY KEY,
        category ENUM('RPG', 'MMO', 'Mundo Abierto', 'Juegos De Mesa', 'Estrategia', 'Shooter', 'Single Player', 'Deportes', 'Plataformas', 'Peleas', 'Aventura Gráfica', 'Rol', 'Puzzle'),
        description VARCHAR(50) NOT NULL
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS platforms(
        id INT AUTO_INCREMENT PRIMARY KEY,
        platform ENUM('PC', 'PS5', 'PS4', 'PS3', 'PS2', 'PSOne', 'Xbox Series', 'Xbox One', 'Xbox360', 'Xbox Classic', 'Switch', 'Wii U', 'Wii', 'N64', 'SNES', 'NES', 'Moviles', 'Otras'),
        description VARCHAR(50) NOT NULL
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS postplatforms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        postId CHAR(36),
        platformId INT,
        FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE,
        FOREIGN KEY (platformId) REFERENCES platforms (id) ON DELETE CASCADE
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS postcategories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        postId CHAR(36),
        categoryId INT,
        FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE,
        FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS postimages(
        id CHAR(36) PRIMARY KEY,
        idPost CHAR(36) NOT NULL,
        imageURL VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES posts (id) ON DELETE CASCADE
        );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS validation(
        id CHAR(36) PRIMARY KEY,
        code CHAR(6) NOT NULL,
        limitTime VARCHAR(36),
        idUser CHAR(36) NOT NULL,
        FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS postcomments(
        id CHAR(36) PRIMARY KEY,
        comments TEXT NOT NULL,
        idPost CHAR(36) NOT NULL,
        idUser CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES posts (id) ON DELETE CASCADE,
        FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS votes(
        id CHAR(36) PRIMARY KEY,
        idUser CHAR(36) NOT NULL,
        idPost CHAR(36) NOT NULL,
        votes BOOL NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idUser) REFERENCES users (id),
        FOREIGN KEY (idPost) REFERENCES posts (id)
    );`);

    /* INSERT DE DATOS */

    await pool.query(`
    INSERT INTO platforms (platform, description) VALUES
        ('PC', 'Plataforma PC'),
        ('PS5', 'PlayStation 5'),
        ('PS4', 'PlayStation 4'),
        ('PS3', 'PlayStation 3'),
        ('PS2', 'PlayStation 2'),
        ('PSOne', 'PlayStation One'),
        ('Xbox Series', 'Xbox Series'),
        ('Xbox One', 'Xbox One'),
        ('Xbox360', 'Xbox 360'),
        ('Xbox Classic', 'Xbox Classic'),
        ('Switch', 'Nintendo Switch'),
        ('Wii U', 'Nintendo Wii U'),
        ('Wii', 'Nintendo Wii'),
        ('N64', 'Nintendo 64'),
        ('SNES', 'Super Nintendo'),
        ('NES', 'Nintendo Entertainment System'),
        ('Moviles', 'Plataforma Móviles'),
        ('Otras', 'Otras Plataformas');
    `);

    await pool.query(`
    INSERT INTO categories (category, description) VALUES
        ('RPG', 'Role-playing game'),
        ('MMO', 'Massively Multiplayer Online'),
        ('Mundo Abierto', 'Mundo Abierto'),
        ('Juegos De Mesa', 'Juegos de Mesa'),
        ('Estrategia', 'Estrategia'),
        ('Shooter', 'Shooter'),
        ('Single Player', 'Un jugador'),
        ('Deportes', 'Deportes'),
        ('Plataformas', 'Plataformas'),
        ('Peleas', 'Peleas'),
        ('Aventura Gráfica', 'Aventura Gráfica'),
        ('Rol', 'Rol'),
        ('Puzzle', 'Puzzle');
    `);

    await pool.query(`
    INSERT INTO users (id, nameMember, email, password, birthday, acceptedTOS, validated, role)
    VALUES('${generateUUID()}', 'Admin', 'admin@levelup.com', '${hashedPassword}', '1990-01-01', true, true, 'Administrador')
    `);

    await pool.query(`
    INSERT INTO users (id, nameMember, email, password, birthday, acceptedTOS, validated, role)
    VALUES('${generateUUID()}', 'Mod', 'moderador@levelup.com', '${hashedPassword}', '1990-01-01', true, true, 'Moderador')
    `);
}

initDB();
