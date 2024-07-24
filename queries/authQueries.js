//consultas en la base de datos de user

const client = require('../config/db.js');

const createUser = async (firstName, lastName, email, username) => {
    return await client.query('INSERT INTO users (first_name, last_name, email, username) VALUES ($1, $2, $3, $4)',[firstName, lastName, email, username]);
};

const getUserByEmail = async(email) => {
    const results = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return results.rows[0];
}

const getUserByUsername = async(username) => {
    const results = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return results.rows[0];
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserByUsername,
}
