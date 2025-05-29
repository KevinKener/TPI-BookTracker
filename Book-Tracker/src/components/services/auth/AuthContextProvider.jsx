import { useState } from "react";
import { AuthenticationContext } from "../auth.context";

const tokenValue = localStorage.getItem("book-tracker-token");
const usernameValue = localStorage.getItem("book-tracker-username");
const idValue = localStorage.getItem("book-tracker-id");
const userRole = localStorage.getItem("book-tracker-role")

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);
    const [username, setUsername] = useState(usernameValue);
    const [id, setId] = useState(idValue);
    const [role, setRole] = useState(userRole);

    const handleUserLogin = (token, username, id, role) => {
        localStorage.setItem("book-tracker-token", token);
        setToken(token);
        localStorage.setItem("book-tracker-username", username);
        setUsername(username);
        localStorage.setItem("book-tracker-id", id);
        setId(id);
        localStorage.setItem("book-tracker-role", role);
        setRole(role);
        console.log(`context: `, role);
    }

    const handleUserLogout = () => {
        localStorage.removeItem("book-tracker-token");
        setToken(null);
        localStorage.removeItem("book-tracker-username");
        setUsername(null);
        localStorage.removeItem("book-tracker-id");
        setId(null);
        localStorage.removeItem("book-tracker-role");
        setRole(null);
    }


    return (
        <AuthenticationContext.Provider value={{ token, username, id, role, handleUserLogin, handleUserLogout }}  >
            { children }
        </AuthenticationContext.Provider>
    );
};
