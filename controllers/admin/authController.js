const authQueries = require('../../queries/authQueries.js');
const firebase = require('../../config/firebase/adminFirebase.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createAdmin = async(req, res, next) => { //controlador para crear usuario
    const {email, password} = req.body;

    try {
        let admin = await authQueries.getAdminByEmail(email)
        if(admin){ //verificación para correo ya registrd
            return res.status(400).json({message: "Email already exists"})
        }

        await authQueries.createAdmin(email); //crea usuario en la base de daotos
        await firebase.registerAdmin(email, password); //registra usuario en firebase

        return res.json({message: "Admin created succesfully"});
    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to register an admin"});
    };
};

const getAdmin = async(req, res, next) => { //controlador para obtener usuario, inciiar sesion
    const {email, password} = req.body;
    try{
        const islogin = await firebase.loginAdmin(email, password); //inicio ses en firebase
        if (!islogin){
            return res.status(400).json({ message: "Invalid credentials"});
        }

        const admin = await authQueries.getAdminByEmail(email); //obtengo usuario de la base de dats
        if (!admin){
            return res.status(404).json({ message: "Admin not found"});
        }

        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.ADMIN_JWT_SECRET); //genero token

        admin.token  = token; //le añado el token al objeto admin
        return res.send(admin);

    } catch (error) {
        return res.status(500).json({ message: "There was a problem trying to get the admin"});
    };
};


module.exports = {
    createAdmin,
    getAdmin,
}
