const postQueries = require('../../queries/postQueries.js');

const getPosts = async (req, res, next) => {
    const order = req.query.order;
    let orderBy = 'created_at DESC' //orden de los posts descendiente de fecha de creacion por defecto
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
    try {
        const { id } = req.params;
        const response = await postQueries.getOnePostById(id) //obtengo un post de la base de dat por su id
        if (!response){
            return res.status(404).json({ message: "Post not found"});
        }
        return res.send(response)
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to get post"});
    };
};

module.exports = {
    getPosts,
    getPost
};
