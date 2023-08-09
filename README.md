# LEVEL UP

Creando una red social, de noticias colaborativas, en este caso relacionada con los videojuegos.

## Indice:

### 1. Preámbulo

La redes sociales, es innegable, forman parte de nuestras vidas en mayor o menor medida.
Cada una de ellas (y no hace falta mencionarlas) tiene una finalidad, un tipo de público y una manera de comunicar.
Pueden ser de: entretenimiento, información, contactos personales, contactos profesionales, ... y más.

### 2. Resúmen del proyecto

Se nos pidió implementar una API, estilo "Reddit" o "Menéame" que permitiera gestionar noticias colaborativas, que proporcionan un entorno virtual al que varias personas pueden conectarse y trabajar simultáneamente en la misma tarea, donde los usuarios puedan registrarse y publicar una noticia en una serie de categorías o temáticas, en función de si el usuario está o no registrado.
Esta API "LEVEL UP" está dedicada al mundo de los videojuegos y sus plataformas, que hasta la fecha no hay ninguna.

### 3. Objetivos

Crear una API que cumpla los requisitos pedidos y en la que los usuarios puedan subir posts y fotos de videojuegos de diferentes plataformas y que también puedan ser comentados; así como el propietario del post podrá eliminar el mismo si lo considera oportuno.

### 4. Consideraciones generales

Lo fundamental del proyecto además de aplicar lo aprendido, es el trabajo en equipo.
La lógica del proyecto está implementada en JavaScript, HTML y CSS y Node, en la parte del back end y con
JavaScript, HTML y CSS y Vite, en la parte del front end.
La división y organización del trabajo ha sido en equipo, tras reunirnos y estudiar lo que requería el proyecto hemos ido asumiendo tareas según iba avanzando el proyecto y poniéndolas en comun, para poder complerlo.

### 5. Criterios para llevar adelante el proyecto

#### 5.1 Definición del producto

Es verdad que hay bastantes redes sociales, pero ninguna dedicada al mundo de los videojuegos y sus plataformas, y se nos ocurrió la idea de crear una para los amantes de los videojuegos (que son muchos), en la que puedan poner en común sus gustos, experiencias, ...
No resuelve un problema como tal, pero sí que va a tener muchos adeptos, por que echan en falta que haya algo así.
Y aquí está "LEVEL UP", la primera API dedicada a ese apasionante mundo.

#### 5.2. """necesidades""" del usuario

-   Debe ser responsive y verse en distintos dispositivos de varios tamaños.
-   Se hicieron test de cada nueva implementación.
-   Testeo manual buscando errores e imperfecciones.
-   Se hicieron pruebas de usabilidad.
-   Como usuario nuevo debo poder crear una cuenta con: nombre, email, password y birthday, para poder iniciar sesión.
-   En el momento de loguearme, si el email o el password no es válido, veré un mensaje de error para volver a introducir las credenciales.

#### 5.3 Criterios de aceptación:

-   La API es pública, para ser probada.
-   El diseño debe ser resposive, para móviles de hasta 480px, tablets de hasta 1024px y portatil de hasta 1280px.

#### 5.4 Comportamiento de la interfaz:

##### Creación de cuenta de usuario

-   Login:

    -   Creación de cuenta de acceso y autenticación con cuenta de correo y contraseña.

-   Validaciones:
    -   No puede haber usuarios repetidos.
    -   La cuenta de un usuario debe ser un correo electrónico válido. - La contraseña (introducida en el input) debe ser secreta.
-   Comportamiento:
    -   Al enviarse el formulario de registro o inicio de sesión, debe validarse.
    *   Si hay errores, se mostrarán mensajes descriptivos para ayudar al usuario a corregirlos.

##### Muro/timeline

-   Validaciones:
    -   Al publicar, se validará que exista contenido en cada "input o textarea" que lo requiera.
-   Comportamiento:
    -   Al recargar la aplicación, si el usuario/a no está registrado/a, sólo podrá:
        -   Ver la lista de post
        -   Leer sólo un post que elija
    -   Si al recargar la aplicación, el usuario/a puede loguearse porque está registrado/a, podrá:
        -   Publicar Post
        -   Dar y quitar like a una publicación (1)
        -   Tener conteo de los likes a sus posts
        -   Eliminar cualquier post publicado por el/ella
        -   Al dar click para editar un post, será dirigido a la página para hacerlo y se guardarán los cambios
        -   Al recargar la página se verán los post y/o comentarios creados o modificados

### 7.

### 8.

### 9.

Proyecto completo para Hackaboss, que incluye backend y frontend.
El back end se desarrolló en el segundo proyecto, aunque se han hecho modificaciones para un mejor funcionamiento de la API.
El front end, constituye el proyecto final.
