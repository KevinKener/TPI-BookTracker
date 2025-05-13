import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { validateEmail, validatePassword, validateString } from "../helpers/validations.js";
// IMPORTAR SERVICIOS DE LECTURE


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


    // LUEGO DE LA CREACION, PASAR ID.USER PARA LECTURE.CREATE
    // LLAMAR LA CREACION DE LA LISTA



    res.json(newUser.id);
}


export const loginUser = async (req, res) => {
    
    // Validaciones de input
    const result = validateUserLogin(req);

    if(result.error){
        return res.status(400).send({ message: result.message });
    }
    
    const { email, password } = req.body;

    // Busca algún usuario registrado con ese email
    const user = await User.findOne({
        where: {
            email
        }
    })

    if(!user){
        return res.status(400).send({ message: "El correo no se encuentra registrado" });
    }


    // Compara la contraseña
    const comparison = await bcrypt.compare(password, user.password);

    // Si no coincide, devuelve error 401
    if(!comparison){
        return res.status(401).send({ message: "Email y/o contraseña incorrectos" });
    }

    // Genera una clave secreta para firmar el token
    const secretKey = "programacion3-2025";

    // Devuelve un token JWT que expira en 1 hora 
    const token = jwt.sign({ username: user.username, email }, secretKey, { expiresIn: "1h" });

    // Devuelve el token al cliente
    res.json(token);

}