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
}

const getOnePostById = async (id) => {
    const results = await client.query('SELECT * FROM posts WHERE id = $1', [id]);
    return results.rows[0];
}

module.exports = {
    getAllPosts,
    getOnePostById
}
