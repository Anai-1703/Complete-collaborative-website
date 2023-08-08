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
@@ -26,51 +24,41 @@ export function Menu() {
    }
    }, []);


    const handleLogout = () => {
        deleteToken();
        setIsLoggedIn(false);
        notifyAuthChange(false);
        navigate("/"); // Redirige a la página de login después de hacer logout
    };

    return (
        <section className={`${isMenuOpen ? "open" : ""} full-menu`}>
            {isMenuOpen && (
                <>
                {!isLoggedIn && (
                    <ul className="menu-dropdown menu-large">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Registro</Link>
                        </li>
                        </ul>
                )}
                {isLoggedIn && (
                    <ul className="menu-dropdown menu-large">
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