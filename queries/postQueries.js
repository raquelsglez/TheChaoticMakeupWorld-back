const pool = require('../db.js');

const getAllPosts = async (orderBy) => {
    const [results] = await pool.query(`SELECT * FROM post ORDER BY ${orderBy}`);
    return results;
}

const getOnePostById = async (id) => {
    const [results] = await pool.query('SELECT * FROM post WHERE id = ?', [id]); // Corrige la tabla y el placeholder
    return results[0];
}

module.exports = {
    getAllPosts,
    getOnePostById
}