const postQueries = require('../../queries/postQueries.js');

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

const createPost = async(req, res, next) => {
    const {title, text, image} = req.body;
    try {
        await postQueries.createPost(title, text, image);
        
        const newPost = await postQueries.getLastCreatedPost();
        return res.send(newPost);
    } catch (error){
        return res.status(500).json({message: "There was a problem trying to create a post"});
    };
};

const updatePost = async(req, res, next) => {
    const {id} = req.params;
    const {title, text, image} = req.body;

    try{
        const post = await postQueries.getOnePostById(id);
        if(!post){
            return res.status(404).json({ message: "Post not found"});
        }

        postQueries.updatePost(title, text, image, id);
        const updatedPost = await postQueries.getOnePostById(id);
        return res.send(updatedPost);

    } catch (error){
        return res.status(500).json({message: "There was a problem trying to update post"});
    };
};

const deletePost = async(req, res, next) => {
    const {id} = req.params;
    try{
        const post = await postQueries.getOnePostById(id);
        if(!post){
            return res.status(404).json({ message: "Post not found"});
        }

        await postQueries.deletePost(id);
        return res.json({message: "Post deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "There was a problem trying to delete post"});
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};