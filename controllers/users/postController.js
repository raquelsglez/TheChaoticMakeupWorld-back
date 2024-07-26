const postQueries = require('../../queries/postQueries.js');
const favoriteQueries = require('../../queries/favoriteQueries');
require('dotenv').config();

const getPosts = async (req, res, next) => {
    const order = req.query.order; //obtener parametro de orden de la query
    let orderBy = 'created_at DESC' //orden de los posts descendiente por fecha de creacion por defecto
    const title = req.query.title;

    if (order === 'created_at') {
        orderBy = 'created_at ASC';
    }

    try {
        const response = await postQueries.getAllPosts(orderBy, title) //obtengo todos los post con un orden concreto y con filtro por título
        return res.send(response)
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to get posts"});
    };
};

const getPost = async (req, res, next) => {

    let isFavorite = false;
    try {
        const { id } = req.params;
        //headers->se utilizan para enviar información adicional junto con las solicitudes HTTP ->
        //-> authorization -> Contiene credenciales para autenticar al cliente con el servidor
        
        if(req.headers.authorization){//si la solicitud tiene autorizacion:->
            const favorite = await favoriteQueries.checkFavorite(id, req.headers.authorization);//->verificar si el post es fav para el user autorizado
            if(favorite){ //si es favorito:
                isFavorite = true;
            }
        }

        const response = await postQueries.getOnePostById(id) //obtengo un post de la base de dat por su id
        if (!response){
            return res.status(404).json({ message: "Post not found"});
        }
        response.is_favorite = isFavorite //añado la propiedad is_favorite al post con su valor(isFavorite)
        return res.send(response)
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to get post"});
    };
};

module.exports = {
    getPosts,
    getPost
};
