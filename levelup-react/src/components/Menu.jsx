import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../services/token/getToken";
import { getUserToken } from "../services/token/getUserToken";
import { deleteToken } from "../services/token/deleteToken";
import { notifyAuthChange } from "../services/auth";


export function Menu({ isMenuOpen }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const token = getToken();
    const userToken = getUserToken();

    if (token && userToken) {
        const tokenInfo = getUserToken();
        if (tokenInfo) {
        setIsLoggedIn(true);
        }
    } else {
        setIsLoggedIn(false);
    }
    }, []);
    
    
    const handleLogout = () => {
        deleteToken();
        setIsLoggedIn(false);
        notifyAuthChange(false);
        navigate("/");
    };

    return (
        <section className={`${isMenuOpen ? "open" : ""} full-menu`}>
            {isMenuOpen && (
                <>
                {!isLoggedIn && (
                    <ul className="menu-dropdown">
                        <li className={window.location.pathname === "/login" ? "menu-active" : ""}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={window.location.pathname === "/register" ? "menu-active" : ""}>
                            <Link to="/register">Registro</Link>
                        </li>
                    </ul>
                )}
                {isLoggedIn && (
                    <ul className="menu-dropdown">
                        <li>
                        <button onClick={handleLogout}>Logout</button>
                        </li>
                        <li>
                            <Link to="/new-post">New Post</Link>
                        </li>
                    </ul>
                )}
                </>
            )}
        </section>
    )
    
}