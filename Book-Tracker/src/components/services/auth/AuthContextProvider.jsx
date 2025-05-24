import { useState } from "react";
import { AuthenticationContext } from "../auth.context";

const tokenValue = localStorage.getItem("book-tracker-token");
const usernameValue = localStorage.getItem("book-tracker-username");
const idValue = localStorage.getItem("book-tracker-id");

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);
    const [username, setUsername] = useState(usernameValue);
    const [id, setId] = useState(idValue);

    const handleUserLogin = (token, username, id) => {
        localStorage.setItem("book-tracker-token", token);
        setToken(token);
        localStorage.setItem("book-tracker-username", username);
        setUsername(username);
        localStorage.setItem("book-tracker-id", id);
        setId(id);
        console.log(id);
    }

    const handleUserLogout = () => {
        localStorage.removeItem("book-tracker-token");
        setToken(null);
        localStorage.removeItem("book-tracker-username");
        setUsername(null);
        localStorage.removeItem("book-tracker-id");
        setId(null);
    }


    return (
        <AuthenticationContext.Provider value={{ token, username, id, handleUserLogin, handleUserLogout }}  >
            { children }
        </AuthenticationContext.Provider>
    );
};
