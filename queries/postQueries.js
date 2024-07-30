//consultas en la base de datos de post

const client = require('../config/db.js');

const getAllPosts = async (orderBy, title) => {
    let query = 'SELECT * FROM posts'
    
    if (title) { //opcion de obtner los posts con filtrado por title
        query += ` WHERE title ILIKE '%${title}%'`;
    }

    if (orderBy){ //opcion de obtener los posts por orden asc o desc
        query += (` ORDER BY ${orderBy}`)
    }
    const results = await client.query(query);
    return results.rows;
};

const getOnePostById = async (id) => {
    const results = await client.query('SELECT * FROM posts WHERE id = $1', [id]);
    return results.rows[0];
};

const createPost = async (title, text, image) => {
    return await client.query('INSERT INTO posts (title, text, image) VALUES ($1, $2, $3)', [title, text, image]);
};

const updatePost = async (title, text, image, id) => {
    return await client.query('UPDATE posts SET title = $1, text = $2, image = $3 WHERE id = $4', [title, text, image, id]);
};

const deletePost = async (id) => {
    return await client.query('DELETE FROM posts WHERE id = $1', [id]);
};

const getLastCreatedPost = async () => {
    const results = await client.query('SELECT * FROM posts ORDER BY created_at DESC');
    return results.rows[0];
};

module.exports = {
    getAllPosts,
    getOnePostById,
    createPost,
    updatePost,
    deletePost,
    getLastCreatedPost
}
