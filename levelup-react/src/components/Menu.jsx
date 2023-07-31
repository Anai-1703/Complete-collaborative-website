import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import menuIcon from "../assets/svg/menu.svg";
import { getToken } from "../services/token/getToken";
import { getUserToken } from "../services/token/getUserToken";
import { getTokenInfo } from "../services/token/getTokenInfo";
import { deleteToken } from "../services/token/deleteToken";

export function Menu() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const token = getToken();
    const userToken = getUserToken();

    if (token && userToken) {
        const tokenInfo = getTokenInfo(token);
        if (tokenInfo) {
        setIsLoggedIn(true);
        }
    } else {
        setIsLoggedIn(false);
    }
    }, []);
    
    const handleMenuClick = (e) => {
        e.stopPropagation(); // Evita que el evento se propague al elemento li
        setIsMenuOpen(!isMenuOpen);
    };
    
    
    const handleLogout = () => {
        deleteToken();
        setIsLoggedIn(false);
        navigate("/"); // Redirige a la página de login después de hacer logout
    };
    


    return (
        <>
            <li className="menu-navbar" onClick={handleMenuClick}>
                <img className="menu-icon" src={menuIcon} alt="Menu" />
                {isMenuOpen && (
                    <ul className="menu-dropdown">
                    {!isLoggedIn && (
                        <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Registro</Link>
                        </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <li>
                        <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    <li>
                        <Link to="/new-post">New Post</Link>
                    </li>
                    </ul>
                )}
            </li>

        </>
    )
}