CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(50),
    text TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE administrators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE,
);

CREATE TABLE Favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_users UUID NOT NULL,
    id_posts UUID NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(id_users) 
        REFERENCES users(id),
        ON DELETE CASCADE,
    CONSTRAINT fk_post
        FOREIGN KEY(id_posts) 
        REFERENCES posts(id),
        ON DELETE CASCADE,
    CONSTRAINT unique_user_post 
        UNIQUE(id_users, id_posts)
);
