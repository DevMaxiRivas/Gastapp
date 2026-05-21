import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <nav className="flex justify-end gap-4 p-4">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
}   
