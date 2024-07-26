const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    //headers->se utilizan para enviar información adicional junto con las solicitudes HTTP ->
    //-> authorization -> Contiene credenciales para autenticar al cliente con el servidor

    if (req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1]

        // verificar que el token sea valido
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message:'Not Authorized'});
            }
            req.user = user;
        })
    }
    next();
};


const requireToken = (req, res, next) => {
    //headers->se utilizan para enviar información adicional junto con las solicitudes HTTP ->
    //-> authorization -> Contiene credenciales para autenticar al cliente con el servidor

    console.log(req.headers.authorization)
    if (req.headers.authorization){

        let token = req.headers.authorization.split(' ')[1]

        // verificar que el token sea valido
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message:'Not Authorized'});
            }
            req.user = user;
        })
    }else{
        return res.status(403).json({message:'Not Authorized'});
    }
    next();
};

module.exports = {
    verifyToken,
    requireToken,
};
