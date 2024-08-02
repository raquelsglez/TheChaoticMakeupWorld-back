# The Chaotic Makeup World - Backend

Este es un proyecto backend de una **aplicación web** de un blog de maquillaje.


## Prerequisitsos
 - Node.js (v18.16.1)
 - npm (v9.5.1)
 - postgres(v16)

 ## Tecnologías usadas
 - Node.js
 - Express
 - Base de datos:
    - Postgres
 - Authentication:
    - Firebase
    - JWT

## Funcionamiento

### Environment Variables
Se necesita crear un archivo ``.env`` con las siguientes variables:

- ``PORT`` = Puerto en el que se desea desplegar
- Base de datos:
    - ``DB_USER`` = Usuario
    - ``DB_HOST`` = Host
    - ``DB_DATABASE`` = Nombre
    - ``DB_PASSWORD`` = Contraseña

- Firebase:  
Se usa firebase para guardar la contraseña de los usuarios y administradores. Se necesitan dos configuraciones diferentes para cada uno de ellos:
    - Usuario:
        - ``FIREBASE_API_KEY`` = ApiKey
        - ``FIREBASE_DOMAIN`` = Dominio
        - ``FIREBASE_PROJECT_ID`` = Id del proyecto
        - ``FIREBASE_BUCKET`` = Nombre del Bucket
        - ``FIREBASE_SENDER_ID``= Id del Sender
        - ``FIREBASE_APP_ID`` = Id de la App
        - ``FIREBASE_MEASUREMENT_ID`` = Id del Measurement
    - Administrador:
        - ``ADMIN_FIREBASE_API_KEY`` = ApiKey
        - ``ADMIN_FIREBASE_DOMAIN`` = Dominio 
        - ``ADMIN_FIREBASE_PROJECT_ID`` = Id del proyecto
        - ``ADMIN_FIREBASE_BUCKET`` = Nombre del Bucket
        - ``ADMIN_FIREBASE_SENDER_ID`` = Id del Sender
        - ``ADMIN_FIREBASE_APP_ID`` = Id de la App
        - ``ADMIN_FIREBASE_MEASUREMENT_ID`` = Id del Measurement

- JWT:  
Para JWT también se necesitan dos configuraciones, una para los usuarios y otra para los administradores:
    - Usuario:
        - ``JWT_SECRET`` = Secreto para generar y decodificar el token del usuario.
    - Administrador:
        - ``ADMIN_JWT_SECRET`` = Secreto para generar y decodificar el token del adminisrtador.

### Iniciar app
Para arrancar el proyecto es necesario ejecutar los siguientes comandos

```
git clone https://github.com/raquelsglez/TheChaoticMakeupWorld-back.git
cd TheChaoticMakeupWorld-back
npm install
npm start
```

### Modelo
Se ha creado la siguiente estructura de modelos.

- UUID: Generar los ids de forma automática.
    ```sql
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```

- administrators: Administradores de la web.
    ```sql
    CREATE TABLE administrators (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(50) UNIQUE
    );
    ```

- posts: Publicaciones del blog.
    ```sql
    CREATE TABLE posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(50),
        text TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        id_administrators UUID,
        CONSTRAINT fk_administrator
            FOREIGN KEY(id_administrators)
            REFERENCES administrators(id)
            ON DELETE SET NULL
    );
    ```

- users: Usuarios que van a hacer uso de la aplicación.
    ```sql
    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(50) UNIQUE,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

- Favorites: Aquí se guarda la relación entre un usuario y el post al que ha hecho favorito.
    ```sql
    CREATE TABLE Favorites (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        id_users UUID NOT NULL,
        id_posts UUID NOT NULL,
        CONSTRAINT fk_user
            FOREIGN KEY(id_users) 
            REFERENCES users(id)
            ON DELETE CASCADE
        CONSTRAINT fk_post
            FOREIGN KEY(id_posts) 
            REFERENCES posts(id)
            ON DELETE CASCADE
        CONSTRAINT unique_user_post 
            UNIQUE(id_users, id_posts)
    );
    ```

### Rutas
- Usuario:
    - No autenticado:
        - POST /auth/register - Registro
        - POST /auth/login - Login
        - GET /posts - Listado de posts con filtros
        - GET /post/{id} - Detalle del post

    -  Autenticado:
        - POST /posts/{id}/favorites - Hacer favorito un post
        - POST /posts/{id}/unfavorites - Deshacer favorito un post
        - GET /post/{id} - Detalle del post, en este caso si el post es favorito lo indicará
        - GET /me/favorites - Lista los posts favoritos del usuario

- Administrador:
    -  Autenticado:
        - POST /admin/auth/login - Login
        - POST /admin/auth/register - Registrar nuevo administrador
        - POST /posts - Crear producto
        - GET /posts - Listado de posts con filtros
        - GET /post/{id} - Detalle del post
        - PUT /post/{id} - Modificar post
        - DELETE /post/{id} - Borrar post

### Middlewares Autenticación
- Usuario:
    - **verifyToken**: Comprueba si tiene token, si lo tiene lo verifica, si no lo tiene deja pasar al usuario. Se usa en el detalle del post, así solo en caso de que el usuario esté logueado se comprueba si ese post es favorito.
    - **requireToken**: Comprueba si tiene token y lo verifica, si no lo tiene no deja pasar al usuario. Se usa en apis en las que el usuario solo puede acceder cuando esté logueado, como hacer y deshacer favoritos o en el listado de favoritos.

- Administrador:
    - **requireToken**: Comprueba si tiene token y lo verifica, si no lo tiene no deja pasar al administrador. Se usa en todas las apis de administrador.

## Código
### Controladores
- Usuario:
    - authController
        - createUser: Registra el usuario comprobando que no exista ya un usuario con ese email o username, si ya estan en uso devuelve un error especificandolo. Además guarda en firebase el email y password.
        - getUser: Es el login, devuelve al usuario con un token generado con JWT.
    - postController
        - getPosts: Lista los posts con posibilidad de filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.
        - getPost: Obtiene un post, en caso de estar logueado indica si ese el usuario ha hecho favorito el post.
    - userController
        - doFavorite: Comprueba si el usuario y el post existen, tambien comprueba no hayas hecho favorito el post, si todo esta correcto se hace favorito.
        - doUnfavorite: Comprueba si el usuario y el post existen, tambien comprueba que tenga favorito el post, si todo esta correcto se deshace el favorito.
        - getMyFavoritePosts: Comprueba que el usuario exista, si es así, lista sus posts favoritos con posibilidad de filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.

- Administrador:
    - authController
        - createAdmin: Registra el adminsitrador comprobando que no exista ya un adminsitrador con ese email, si ya estan en uso devuelve un error especificandolo. Además guarda en firebase el email y password.
        - getAdmin: Es el login, devuelve al adminsitrador con un token generado con JWT.
    - postController
        - getPosts: Lista los posts con posibilidad de filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.
        - getPost: Obtiene un post.
        - createPost: Crea un post guardando además el administrador que lo ha creado.
        - upadtePost: Modifica un post.
        - deletePost: Borra un post.

### Queries
- authQueries
    - createUser: Crea un usuario.
    - getUserByEmail: Obtiene un usuario por email.
    - getUserByUsername: Obtiene un usuario por username.
    - getUserById: Obtiene un usuario por id.
    - getAdminByEmail: Obtiene un administrador por email.
    - createAdmin: Crea un administrador.
- favoriteQueries
    - addFavorite: Crea un registro de favorito.
    - removeFavorite: Borra un registro de favorito.
    - checkFavorite: Comprueba si el usuario ha hecho favorito el post.
- postQueries
    - getAllPostsUser: Obtiene todos los post para el user solo con determinados datos.
    - getOnePostByIdUser: Obtiene un post para el user solo con determinados datos.
    - getAllPosts: Obtiene todos los posts.
    - getOnePostById: Obtiene un post.
    - createPost: Crea un post.
    - updatePost: Modifica un post.
    - deletePost: Borra un post.
    - getLastCreatedPost: Obtiene el ultimo post creado.
    - getMyFavorites: Obtiene los post favoritos de un usuario, pero los posts solo tienen unos determinados datos.
