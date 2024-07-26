const favoriteQueries = require('../../queries/favoriteQueries');
const postQueries = require('../../queries/postQueries.js');
const authQueries = require('../../queries/authQueries.js');


const doFavorite = async (req, res, next) => {
    try {
        const {id} = req.params;
        const idUser = req.user.id;
        
        //verificacion de si el user existe
        const user = await authQueries.getUserById(idUser);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        //verificacion de si el post existe
        const post = await postQueries.getOnePostById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        //verificacion de si el post ya está marcado como fav por el user
        const isFavorite = await favoriteQueries.checkFavorite(id, idUser);
        if(isFavorite){
            return res.status(400).json({ message: "Post is already favorited"});
        }
        await favoriteQueries.addFavorite(id, idUser); //marcar post como fav para el user
       
        return res.json({message: "Favorite done successfully"});
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to do favorite"});
    };
};

const doUnfavorite = async (req, res, next) => {
    try {
        const {id} = req.params;
        const idUser = req.user.id;

        const user = await authQueries.getUserById(idUser);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const post = await postQueries.getOnePostById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        //verificacion de si el post está marcado como fav por el user
        const isFavorite = await favoriteQueries.checkFavorite(id, idUser);
        if(!isFavorite){//si no está maracado, error
            return res.status(400).json({ message: "Post is not favorited"});
        }
        await favoriteQueries.removeFavorite(id, idUser); //desmarca el post como favorito para el user
      
        return res.json({message: "Unfavorite done successfully"});
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to do unfavorite"});
    };
};

module.exports = {
    doFavorite,
    doUnfavorite
};
