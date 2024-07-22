const postQueries = require('../../queries/postQueries.js');

const getPosts = async (req, res, next) => {
    const order = req.query.order;
    let orderBy = 'created_at DESC'

    if (order === 'created_at') {
        orderBy = 'created_at ASC';
    }

    try {
        const response = await postQueries.getAllPosts(orderBy)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: "There was a problem trying to get posts"});
    };
};

const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await postQueries.getOnePostById(id)
        if (!response){
            res.status(404).json({ message: "Post not found"});
        }
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: "There was a problem trying to get post"});
    };
};

module.exports = {
    getPosts,
    getPost
};
