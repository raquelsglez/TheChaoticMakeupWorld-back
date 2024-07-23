const pool = require('../config/db.js');

const getAllPosts = async (orderBy, title) => {
    let query = 'SELECT * FROM post'
    
    if (title) {
        query += ` WHERE LOWER(title) LIKE "%${title.toLowerCase()}%"`;
    }

    if (orderBy){
        query += (` ORDER BY ${orderBy}`)
    }
    
    const [results] = await pool.query(query);
    return results;
}

const getOnePostById = async (id) => {
    const [results] = await pool.query('SELECT * FROM post WHERE id = ?', [id]);
    return results[0];
}

module.exports = {
    getAllPosts,
    getOnePostById
}
