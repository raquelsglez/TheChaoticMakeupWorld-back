const authQueries = require('../../queries/authQueries.js');
const firebase = require('../../config/firebase/firebase.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async(req, res, next) => { //controlador para crear usuario
    const {first_name, last_name, email, password, username} = req.body;

    try {
        let user = await authQueries.getUserByEmail(email)
        if(user){ //verificación para correo ya registrd
            return res.status(400).json({message: "Email already exists"})
        }

        user = await authQueries.getUserByUsername(username)
        if(user){ //verificacion username ya registrado
            return res.status(400).json({message: "Username already exists"})
        }      

        await authQueries.createUser(first_name, last_name, email, username); //crea usuario en la base de daotos
        await firebase.registerUser(email, password); //registra usuario en firebase

        return res.json({message: "User created succesfully"});
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to register a user"});
    };
};

const getUser = async(req, res, next) => { //controlador para obtener usuario, inciiar sesion
    const {email, password} = req.body;
    try{
        const islogin = await firebase.loginUser(email, password); //inicio ses en firebase
        if (!islogin){
            return res.status(400).json({ message: "Invalid credentials"});
        }

        const user = await authQueries.getUserByEmail(email); //obtengo usuario de la base de dats
        if (!user){
            return res.status(404).json({ message: "User not found"});
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET); //genero token

        user.token  = token; //le añado el token al objeto user
        return res.send(user);

    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to get the user"});
    };
};


module.exports = {
    createUser,
    getUser
}
