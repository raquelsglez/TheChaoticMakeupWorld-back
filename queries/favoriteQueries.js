const client = require('../config/db.js');

const addFavorite = async(idPost, idUser) => {
    return await client.query('INSERT INTO favorites (id_posts, id_users) VALUES ($1, $2)', [idPost, idUser]);
};

const removeFavorite = async(idPost, idUser) => {
    return await client.query('DELETE FROM favorites WHERE id_posts = $1 AND id_users = $2', [idPost, idUser]);
}

const checkFavorite = async(idPost, idUser) => {
    const results = await client.query('SELECT * FROM favorites WHERE id_posts = $1 AND id_users = $2', [idPost, idUser]);
    return results.rows[0];
}


module.exports = {
    addFavorite,
    removeFavorite,
    checkFavorite
};
