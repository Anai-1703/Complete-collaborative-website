import { Link } from 'react-router-dom';

export function NotFoundPage() {

    return (
        <>
        <h2>Not Found - LeveL Down!</h2>
        <Link to={'/'}>Volver Al Inicio</Link>
        </>
    )
}