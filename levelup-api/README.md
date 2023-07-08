# collaborative-website

Este proyecto busca crear una plataforma de noticias colaborativas, dónde los usuarios puedan compartir y participar en la difusión de información sobre diversos temas. Los usuarios anónimos tienen acceso limitado a las funcionalidades, mientras que los usuarios registrados pueden contribuir con noticias y gestionar su perfil de usuario.

-   [Objetivo del Proyecto](#objetivo-del-proyecto)
-   [Objetivos adicionales](#bjetivos-adicionales)

-   [Diseño](#dise%C3%B1o) pendiente
-   [Diagrama de la DB](#diagrama-de-la-db) pendiente

-   [Instalación](#instalaci%C3%B3n)
-   [Ejecución](#ejecuci%C3%B3n)

## Objetivo del Proyecto:

-   [ ] Los usuarios anónimos se pueden registrar
-   [ ] Los usuarios anónimos se pueden loguear
-   [ ] Los usuarios anónimos pueden visualilzar la lista de las últimas noticias listado con título, tema, entradilla y foto
-   [ ] Los usuarios anónimos pueden visualizar una única noticia completa

-   [ ] Los usuarios registrados se pueden registrar
-   [ ] Los usuarios registrados se pueden loguear
-   [ ] Los usuarios registrados pueden visualilzar todo el contenido de la api

-   [ ] Los usuarios registrados pueden publicar una nueva noticia:

              [ ] Título
              [ ] Entradilla
              [ ] Texto de la noticia
              [ ] Tema

-   [ ] Los usuarios registrados pueden editar una noticia publicada por el propio usuario
-   [ ] Los usuarios pueden eliminar una noticia publicada por el propio usuario

## Objetivos adicionales:

-   [ ] Los usuarios anónimos pueden filtrar las noticias por tema
        Los usuarios registrados pueden

          [ ] publicar fotos en cada noticia que hayan publicado
          [ ] gestionar su perfil de usuario
          [ ] votar positiva o negativamente noticias de otros usuarios

---

O ASÍ: --------------

### - Características de los usuarios anónimos:

Los usuarios anónimos tienen las siguientes funcionalidades:

. Visuallizar la lista de las últimas noticias, mostrando un listado con el título, tema, entradilla y foto.

. Visualizar una noticia completa.

. Filtrar las noticias por tema.

. Iniciar sesión utilizando su dirección de correo electrónico y contraseña.

.Registrarse en el sistema, proporcionando nombre, dirección de correo electrónico y contraseña.

### - Características de los usuarios registrados:

Los usuarios registrados tienen todas las funcionalidades de los usuarios anónimos, además de las siguientes:

. Publicar una nueva noticia, incluyendo título, foto (opcional), entradilla, texto de la noticia y tema.

. Editar una noticia que hayan publicado.

---

. Opcionalmente, gestionar su perfil de usuario, incluyendo nombre, dirección de correo electrónico, biografía, foto, etc.

---

---

## Diseño

![Collaborative Website](
RUTA DEL ARCHIVO)

## Diagrama de la DB

![Collaborative Website DB](
RUTA DEL ARCHIVO)

---

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

## Explicaciones

Facilitan la división del proyecto en partes más pequeñas y manejables, permitiéndonos trabajar de forma simultánea en diferentes módulos sin interferir entre nosotros.

Mejoran la organización del código y facilitan el mantenimiento y también permiten la reutilización de código en diferentes partes de la aplicación, así evitamos tener que volver a escribir la misma lógica repetidamente. Además pueden combinarse y facilitan la construcción de sistemas más completos, según las necesidades del proyecto.

Permiten definir interfaces claras mediante el encapsulamiento u ocultamiento de información, que ayuda a reducir complejidad y nos facilitarán los cambios futuros en el código.

Se pueden realizar modificaciones en partes específicas de la aplicación sin afectar a otras áreas.

## Detalles de nuestro código

```js
module.exports = (res, error) => {
    const status = error.status  500;
    const code = error.code  "UNEXPECTED_ERROR";
    const msg = error.message || "¡Ha ocurrido un error inesperado!";

    res.status(status).json({
        success: false,
        error: {
            code: code,
            msg: msg,
        },
    });
};
```

## Detalles técnicos de la implementación:

La API de nuestra web de noticias colaborativas está construida utilizando las siguientes tecnologías y enfoques:

-   Lenguaje de programación: Utilizamos JavaScript para desarrollar la API, aprovechando el entorno de ejecución Node.js.

-   Framework de desarrollo: Hemos optado por Express.js como framework de servidor web para manejar las rutas, la lógica de negocio y las solicitudes HTTP.

-   Sistema de autenticación basado en tokens JWT (JSON Web Tokens) para permitir que los usuarios inicien sesión y accedan a las funcionalidades exclusivas de los usuarios registrados.

-   Middlewares de autorización para restringir el acceso a ciertas rutas y acciones según el rol del usuario.

-   Base de datos: Utilizamos como base de datos relacional MySQL para almacenar la información de los usuarios, noticias y temas.

-   Pruebas con Insomnia: Hemos realizado pruebas manuales y exploratorias, en lugar de escribir pruebas automatizadas. Así hemos podido probar la API de forma interactiva, enviando solicitudes HTTP y verificando manualmente las respuestas.
    .

## Detalles de nuestro código

Listado de archivos:

### Controllers:

**addComment.js**: Controlador que maneja la lógica para agregar comentarios a los posts.

**addPhoto.js**: Controlador para agregar fotos a los posts.

**createPost.js**: Controlador esencial para crear nuevos posts.

### Services:

**cryptoServices.js**: Servicio para operaciones de cifrado.

**dbService.js**: Servicio para interactuar con la base de datos.

**emailService.js**: Servicio para enviar correos electrónicos.

------------- Sigo detallando?
.

-   Plataforma de alojamiento Netlify: **https://c011a80rati83-w38sit3.netlify.app/**

------------- LO DEJO O LO QUITO:

Nuestra aplicación web estática se despliega y aloja en Netlify, una plataforma especializada en el alojaminento y despliegue de aplicaciones web estáticas y JAMstack (JavaScript, API y Markup).

Se integra con servicios de control de versiones (como Git).

Algunas características y ventajas de Netlify incluyen:

1. Despliegue rápido y sencillo (conectas el repositorio de código y Netlify se encarga de construir y desplegar automáticamente los cambios).
2. Escalabilidad y rendimiento ( utiliza una red global de distribución de contenido (CDN) para garantizar la entrega rápida de tus aplicaciones en todo el mundo).
3.

Puede proporcionar funcionalidades de integración continua y despliegue continuo (CI/CD) para automatizar el proceso de construcción y despliegue de la aplicación.

Estos son solo algunos de los detalles técnicos clave de la implementación de nuestra API de noticias colaborativas. Hemos diseñado la arquitectura y elegido las tecnologías para garantizar un rendimiento óptimo, seguridad y escalabilidad en nuestra plataforma.

## Autores:

     Juan León Medina,
     Gonzalo Rodriguez Aquino,
     Asier Bikandi Escuza y
     Ana Isabel Navarro Gómez.
