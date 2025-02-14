const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword} = require("firebase/auth");
require('dotenv').config();

const firebaseConfig = { //configuracion firebase
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig, 'appUser'); //inicializa la aplicacion de firebase (crea conexion)
const auth = getAuth(app); //obtiene las credenciales para la conexion (comprueba que los datos son correctos)

//registrar usuario en firebase
const registerUser = async (email, password) =>{
    try{
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error){
        throw error;
    }
};

//iniciar sesión en firebase
const loginUser = async (email, password) =>{  
    try{
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    }catch (error){
        return false;
    }
};

module.exports = {
    registerUser,
    loginUser
}
