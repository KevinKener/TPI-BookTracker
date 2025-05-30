import { useState, useEffect } from "react";
import { AuthenticationContext } from "../auth.context";
import { isTokenValid } from "./auth.helpers";
import { warningToast } from "../../notifications/notifications";

const tokenValue = localStorage.getItem("book-tracker-token");
const usernameValue = localStorage.getItem("book-tracker-username");
const idValue = localStorage.getItem("book-tracker-id");
const userRole = localStorage.getItem("book-tracker-role");
const profilePic = localStorage.getItem("book-tracker-profile-picture");

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);
    const [username, setUsername] = useState(usernameValue);
    const [id, setId] = useState(idValue);
    const [role, setRole] = useState(userRole);
    const [profilePictureUrl, setProfilePictureUrl] = useState(profilePic);
    

    const handleUserLogin = (token, username, id, role, profilePictureUrl) => {
        localStorage.setItem("book-tracker-token", token);
        setToken(token);
        localStorage.setItem("book-tracker-username", username);
        setUsername(username);
        localStorage.setItem("book-tracker-id", id);
        setId(id);
        localStorage.setItem("book-tracker-role", role);
        setRole(role);
        localStorage.setItem("book-tracker-profile-picture", profilePictureUrl);
        setProfilePictureUrl(profilePictureUrl);
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
        localStorage.removeItem("book-tracker-profile-picture", profilePictureUrl);
        setProfilePictureUrl(null);
    };

    const updateUsername = (newUsername) => {
        localStorage.setItem("book-tracker-username", newUsername);
        setUsername(newUsername);
    };

    const updateProfilePicture = (newProfilePictureUrl) => {
        localStorage.setItem("book-tracker-profile-picture", newProfilePictureUrl);
        setProfilePictureUrl(newProfilePictureUrl);
    };

    const updateRole = (newRole) => {
        localStorage.setItem("book-tracker-role", newRole);
        setRole(newRole);
    };

    useEffect(() => {
        const interval = setInterval(() => {
        
            if (token && !isTokenValid(token)) {
            warningToast("Tu sesión ha expirado.");
            handleUserLogout();
        }
    }, 5000);

    return () => clearInterval(interval);
}, [token]);

    return (
        <AuthenticationContext.Provider value={{ token, username, id, role, profilePictureUrl, handleUserLogin, handleUserLogout, updateUsername, updateRole, updateProfilePicture }}  >
            { children }
        </AuthenticationContext.Provider>
    );
};
