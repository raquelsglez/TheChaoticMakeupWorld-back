const pool = require('../config/db.js');

const createUser = async (firstName, lastName, email, username) => {
    return await pool.query('INSERT INTO user (first_name, last_name, email, username) VALUES (?, ?, ?, ?)',[firstName, lastName, email, username]);
};

const getUserByEmail = async(email) => {
    const [results] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    return results[0];
}

const getUserByUsername = async(username) => {
    const [results] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
    return results[0];
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserByUsername,
}
