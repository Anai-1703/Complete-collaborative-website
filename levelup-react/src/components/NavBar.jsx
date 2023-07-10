import { Link } from 'react-router-dom';

export function NavBar() {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Registro</Link>
                </li>
            </ul>
        </nav>
        );
    }

