const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireToken = (req, res, next) => {
    //headers->se utilizan para enviar información adicional junto con las solicitudes HTTP ->
    //-> authorization -> Contiene credenciales para autenticar al cliente con el servidor

    if (req.headers.authorization){

        let token = req.headers.authorization.split(' ')[1]

        // verificar que el token sea valido
        jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message:'Not Authorized'});
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(403).json({message:'Not Authorized'});
    }
};

module.exports = {
    requireToken,
};
