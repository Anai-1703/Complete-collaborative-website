# LEVEL UP

Este proyecto es la continuación del anterior, en él nos pidieron desarrollar una plataforma de noticias colaborativas, en la que los usuarios pudieran compartir y participar en la difusión de información sobre diversos temas y es cuando iniciamos el back end para la implementación de la API.
Ahora nos enfrentamos al último proyecto, con la creación del front end de la misma, para que esté totalmente operativa, pero no sin antes mejorar la parte del back end, para tener la mayor funcionalidad posible.

## Indice:

-   [Preámbulo](#Preámbulo)
-   [Resumen del proyecto](#Resumen-del-proyecto)
-   [Objetivos del proyecto](#Objetivos-del-proyecto)
-   [Consideraciones generales](#Consideraciones-generales)
-   [Criterios para llevar adelante el proyecto](#Criterios-para-llevar-adelante-el-proyecto)
    -   [Definición del producto](#Definición-del-producto)
    -   [Funcionalidades para el usuario](#funcionalidades-para-el-usuario)
    -   [Criterios de aceptación](#criterios-de-aceptación)
    -   [Creación de cuenta de usuario](#creación-de-cuenta-de-usuario)
    -   [Muro/Timeline](#muro/timeline)
-   [Diseño](#dise%C3%B1o)

-   [Instalación](#instalaci%C3%B3n)
-   [Ejecución](#ejecuci%C3%B3n)
-   [Explicaciones](#)
-   [Detalles de nuestro código](#detalles-de-nuestro-c%C3%B3digo)
-   [Detalles técnicos de la implementación](#detalles-t cnicos-de-la-implementaci%3%B3n)
-   [Listado de archivos](#listado-de-archivos)
-   [URL del repositorio](#url-del-repositorio)
-   [Futuras implementaciones](#futuras-iomplementaciones)
-   [Logotipo](#logotipo)
-   [Autores](#autores)
-   [ ](#)

### Preámbulo

La redes sociales (y tambien las webs de noticias colaborativas), es innegable, forman parte de nuestras vidas en mayor o menor medida.
Cada una de ellas (y no hace falta mencionarlas) tiene una finalidad, un tipo de público y una manera de comunicar.
Pueden ser de: entretenimiento, información, contactos personales, contactos profesionales, ... y más.

### Remen del proyecto

La idea que nos dieron era que fuera estilo Reddit o Menéame, y tras darle unas cuántas vueltas decidimos enfocarla al mundo de los videojuegos por el gran número de adeptos que tiene y sin embargo, no existe ninguna plataforma específica para ellos, y aquí nace LEVEL UP, dónde los usuarios van a poder compartir y participar en la difusión de información, experiencias, en este caso en relación a los videojuegos, plataformas, categorías, ...

### Objetivos del proyecto

-   [ ] Los usuarios anónimos pueden visualilzar la lista de las últimas noticias listado con título, tema, entradilla y foto
-   [ ] Los usuarios anónimos pueden visualizar una única noticia completa
-   [ ] Los usuarios anónimos se pueden registrar
-   [ ] Los usuarios anónimos se pueden loguear

-   [ ] Los usuarios registrados ya se habrán registrado
-   [ ] Los usuarios registrados se pueden loguear
-   [ ] Los usuarios registrados pueden visualilzar todo el contenido de la API

-   [ ] Los usuarios registrados pueden publicar una nueva noticia:

              [ ] Título
              [ ] Entradilla (resumen)
              [ ] Texto de la noticia
              [ ] Tema

-   [ ] Los usuarios registrados pueden editar una noticia publicada por el propio usuario
-   [ ] Los usuarios pueden eliminar una noticia publicada por el propio usuario

Crear una API que cumpla los requisitos pedidos y en la que los usuarios puedan subir posts y fotos de videojuegos de diferentes plataformas y que también puedan ser comentados; así como el propietario del post podrá eliminar el mismo si lo considera oportuno.

### Objetivos adicionales añadidos

    Los usuarios registrados pueden:

-   [ ] publicar una foto en cada noticia que haya publicado
-   [ ] borrar una noticia publicada si es su autor
-   [ ] comentar noticias de otros autores
-   [ ] editar su perfil de usuario
-   [ ] votar positiva o negativamente noticias

### Consideraciones generales

Lo fundamental del proyecto además de aplicar lo aprendido, es el trabajo en equipo.
La lógica del proyecto está implementada en JavaScript, HTML y CSS y Node, en la parte del back end y con
JavaScript, HTML y CSS y Vite, en la parte del front end.
La división y organización del trabajo ha sido en equipo, tras reunirnos y estudiar lo que requería el proyecto hemos ido asumiendo tareas según iba avanzando el proyecto y poniéndolas en comun, para poder completarlo.

### Criterios para llevar adelante el proyecto:

#### Definición del producto

El producto no resuelve un problema como tal, que no haya una plataforma de videojuegos no resulta un problema, pero es muy posible, que tenga una gran acogida, precisamente porque no tienen un sitio específico en el que charlar, cambiar impresiones, compartir,
pero sí que va a tener muchos adeptos, por que echan en falta que haya algo así.
Y aquí está "LEVEL UP", la primera API dedicada a ese apasionante mundo.

#### Funcionalidades para el usuario

-   Cualquier usuario, sin registrarse, tiene acceso a:

    -   Ver el listado de posts que haya
    -   Ver LOS posts completos **\*\***\*\*\*\***\*\*** debería ser sólo 1 **\*\*\***
    -   Registrarse para hacer uso de todas las funcionalidades de la API

-   Como nuevo usuario, al registrme puedo:
    -   Crear una cuenta con: nombre, email, password y birthday, para poder iniciar sesión, además de aceptar los términos y condiciones TOS.
    -   Loguearme, y si el email o el password no es válido, veré un mensaje de error para volver a introducir las credenciales.
    -   Una vez logueado puedo:
        -   Editar mi perfil
        -   Crear un post
        -   Editar un post (si lo he creado yo)
        -   Borrar un post (si lo he creado yo)
        -   Añadir comentarios
        -   Dar Like o Dislike a un post
-   El diseño debe ser responsive para poder utilizarla en distintos dispositivos de diferentes tamaños.
-   Se hicieron tests de cada nueva implementación.
-   Testeo manual buscando errores e imperfecciones.
-   Se hicieron pruebas de usabilidad.

#### Criterios de aceptación:

-   La API es pública, para que pueda ser probada.
-   El diseño debe ser resposive, para dispositivos de hasta 700px, y dispositivos mayores de 700px.

##### Creación de cuenta de usuario

-   Login:

    -   Creación de cuenta de acceso y autenticación con cuenta de correo y contraseña, para posteriormente poder loguearse.

-   Validaciones:
    -   No puede haber usuarios repetidos.
    -   La cuenta de un usuario debe ser un correo electrónico válido. - La contraseña (introducida en el input) debe ser secreta.
-   Comportamiento:
    -   Al enviarse el formulario de registro o inicio de sesión, debe validarse.
    *   Si hay errores, se mostrarán mensajes descriptivos para ayudar al usuario a corregirlos.

##### Muro/Timeline

-   Validaciones:
    -   Al publicar, se validará que exista contenido en cada "input o textarea" que lo requiera.
-   Comportamiento:
    -   Al recargar la aplicación, si el usuario/a no está registrado/a, sólo podrá:
        -   Ver la lista de post
        -   Leer sólo un post que elija
    -   Al recargar la aplicación, el usuario/a puede loguearse porque está registrado/a y podrá:
        -   Publicar Post
        -   Dar y quitar like a una publicación (1)
        -   Tener conteo de los likes a sus posts
        -   Eliminar cualquier post publicado por el/ella
        -   Al dar click para editar un post, será dirigido a la página para hacerlo y se guardarán los cambios
        -   Al recargar la página se verán los post y/o comentarios creados o modificados

### Diseño

### Instalación

```bash
npm install (tanto en back como en front)
```

### Ejecución

iniciar DB:

```bash (levelup-api)
node o npm             src/database/dbInit.js
```

iniciar servidores:

```bash
npm start (o en su defecto node app.js), en back
npm run dev, en front
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

Listado de archivos:

**app.js**:

### Controllers:

#### Post

**addComment.js**: Controlador que maneja la lógica para agregar comentarios a los posts.

**addPhoto.js**: Controlador para agregar fotos a los posts.

**createPost.js**: Controlador esencial para crear nuevos posts.

#### Services:

## URL del repositorio público en GitHub:

**git@github.com:Anai-1703/complete-collaborative-website.git**

#### Futuras implementaciones

-   [ ] Validación por email
-   [ ] Restablecer contraseña
-   [ ] Recarga automática de comentarios
-   [ ] Creador post no se puede autovotar
-   [ ] Sustituir alerts por modals en la gestión de todos los errores
-   [ ] Implementar error al hacer "comment" en su propio post
-   [ ] Hacer funcional SearchBar
        Esperamos acabarlas antes de la presentación del proyecto.

## Autores:

     Juan León Medina,
     Gonzalo Rodriguez Aquino y
     Ana Isabel Navarro Gómez.
