import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/token/getUser.js";
import { getToken } from "../services/token/getToken.js";
import { deleteToken } from "../services/token/deleteToken.js";
import { saveToken } from "../services/token/saveToken.js";

export const AuthContext = createContext({
currentUser: null,
token: null,
});

export const LogoutContext = createContext(null);
export const LoginContext = createContext(null);

export function AuthProvider({ children }) {
const [currentContext, setCurrentContext] = useState({
    currentUser: null,
    token: null,
});

function logout() {
    deleteToken();
    setCurrentContext({ currentUser: null, token: null });
}

function login(token) {
    saveToken(token);
    const user = getUser();
    setCurrentContext({
    token,
    currentUser: user,
    });
}

useEffect(() => {
    const token = getToken();
    if (token) {
    const user = getUser();
    setCurrentContext({
        token,
        currentUser: user,
    });
    }
}, []);

return (
    <AuthContext.Provider value={currentContext}>
    <LogoutContext.Provider value={logout}>
        <LoginContext.Provider value={login}>{children}</LoginContext.Provider>
    </LogoutContext.Provider>
    </AuthContext.Provider>
);
}