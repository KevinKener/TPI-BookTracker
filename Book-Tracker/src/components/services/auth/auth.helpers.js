import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    if(!token) return false;

    try {
        const decodedToken = jwtDecode(token);

        // Convertir Date.now de milisegundos a segundos
        const currentTime = Date.now() / 1000;

        return currentTime < decodedToken.exp;
        
    } catch (error) {
        console.log("Error decoding token: ", error);
        return false;
    }
}