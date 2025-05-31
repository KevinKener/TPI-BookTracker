import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { validateEmail, validatePassword, validateString } from "../helpers/validations.js";

const validateUserRegister = (req) => {

    const result = {
        error: false,
        message: ""
    }

    const { username, email, password } = req.body;

    // nombre de usuario, minimo, maximo
    if(!username || !validateString(username, 3, 12)){
        result.error = true,
        result.message = "El nombre ingresado no es válido."
    }

    // email regex
    if(!email || !validateEmail(email)){
        result.error = true,
        result.message = "El email ingresado no es válido."
    }

    // contraseña, minimo, maximo, ¿mayuscula?, ¿numero?
    if(!password || !validatePassword(password, 6, 12, true, true)){
        result.error = true,
        result.message = "La contraseña ingresada no es válido."
    }

    return result;
}


const validateUserLogin = (req) => {

    const result = {
        error: false,
        message: ""
    }

    const { email, password } = req.body;

    // email regex
    if(!email || !validateEmail(email)){
        result.error = true,
        result.message = "El email ingresado no es válido."
    }

    // contraseña, minimo, maximo, ¿mayuscula?, ¿numero?
    if(!password || !validatePassword(password, 6, 12, true, true)){
        result.error = true,
        result.message = "La contraseña ingresada no es válido."
    }

    return result;
}


// Middleware para verificar el token JWT en las solicitudes
export const verifyToken = (req, res, next) => {
    // Obtiene el valor del header "Authorization" de la solicitud (si no existe, usa cadena vacía)
    const header = req.header("Authorization") || "";

    // Extrae el token desde el header
    const token = header.split(" ")[1];

    // Si no hay token, devuelve error 401 (no autorizado)
    if (!token) {
        return res.status(401).json({ message: "No posee autorización requerida" });
    }

    try {
        // Verifica que el token sea válido usando la clave secreta
        const payload = jwt.verify(token, 'programacion3-2025');

        req.user = payload;
        // Si el token es válido, se puede acceder a su contenido (payload)
        console.log(payload);

        // Llama al siguiente middleware o controlador en la cadena
        next();
    } catch (error) {
        // Si el token no es válido o ha expirado, devuelve error 403 (prohibido)
        return res.status(403).json({ message: "No posee permisos correctos" });
    }
}



export const registerUser = async (req, res) => {

    // Validaciones
    const result = validateUserRegister(req);
    
    if(result.error){
        return res.status(400).send({ message: result.message });
    }

    const { username, email, password } = req.body;

    // Busca algún usuario registrado con ese email
    const user = await User.findOne({
        where: {
            email
        }
    });

    if(user){
        return res.status(400).send({ message: "El correo ya se encuentra registrado" })
    }


    // Configura 10 rondas de salt (costo computacional)
    const saltRounds = 12;

    // Genera un salt unico
    const salt = await bcrypt.genSalt(saltRounds);

    // Hashea la contraseña con el salt
    const hashedPassword = await bcrypt.hash(password, salt);


    // Crea el usuario
    const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    res.json(newUser.id);
}


export const loginUser = async (req, res) => {
    try {
        const result = validateUserLogin(req);
        if(result.error){
            return res.status(400).send({ message: result.message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(400).send({ message: "El correo no se encuentra registrado" });
        }

        const comparison = await bcrypt.compare(password, user.password);

        if(!comparison){
            return res.status(401).send({ message: "Email y/o contraseña incorrectos" });
        }

        const secretKey = "programacion3-2025";
        const token = jwt.sign({ 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
        }, secretKey, { expiresIn: "1h" });

        console.log("user: ", user.role);

        return res.json({
            token,
            username: user.username,
            id: user.id,
            role: user.role,
            img: user.profilePictureUrl
        });

    } catch (error) {
        console.error("Error interno en loginUser:", error);
        return res.status(500).send({ message: "Error interno del servidor" });
    }
};
