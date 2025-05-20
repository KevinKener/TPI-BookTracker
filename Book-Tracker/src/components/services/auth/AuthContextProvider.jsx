import { useState } from "react";
import { AuthenticationContext } from "../auth.context";

const tokenValue = localStorage.getItem("book-tracker-token");
const usernameValue = localStorage.getItem("book-tracker-username");

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);
    const [username, setUsername] = useState(usernameValue);

    const handleUserLogin = (token, username) => {
        localStorage.setItem("book-tracker-token", token);
        setToken(token);
        localStorage.setItem("book-tracker-username", username);
        setUsername(username);
    }

    const handleUserLogout = () => {
        localStorage.removeItem("book-tracker-token");
        setToken(null);
        localStorage.removeItem("book-tracker-username");
        setUsername(null);
    }


    return (
        <AuthenticationContext.Provider value={{ token, username, handleUserLogin, handleUserLogout }}  >
            { children }
        </AuthenticationContext.Provider>
    );
};
