const { initializeApp, getApps } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword} = require("firebase/auth");
require('dotenv').config();

const firebaseConfig = { //configuracion firebase
    apiKey: process.env.ADMIN_FIREBASE_API_KEY,
    authDomain: process.env.ADMIN_FIREBASE_DOMAIN,
    projectId: process.env.ADMIN_FIREBASE_PROJECT_ID,
    storageBucket: process.env.ADMIN_FIREBASE_BUCKET,
    messagingSenderId: process.env.ADMIN_FIREBASE_SENDER_ID,
    appId: process.env.ADMIN_FIREBASE_APP_ID,
    measurementId: process.env.ADMIN_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig, 'adminApp'); //inicializa la aplicacion de firebase (crea conexion)
const auth = getAuth(app); //obtiene las credenciales para la conexion (comprueba que los datos son correctos)

//registrar usuario en firebase
const registerAdmin = async (email, password) =>{
    try{
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error){
        throw error;
    }
};

//iniciar sesión en firebase
const loginAdmin = async (email, password) =>{  
    try{
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    }catch (error){
        return false;
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
}
