import { Link } from "react-router-dom";

export function Header() {

    return (
        <header>
            <h1 >
                <Link className="main-title" to="/"> LeveL Up !</Link>
            </h1>
        </header>
    )
}