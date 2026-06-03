import { APP_ROUTES } from "@/lib/constants";
import { Link } from "react-router-dom";

export function IndexPage() {
    return (
        <div>
            <h1>Index</h1>
            <Link to={APP_ROUTES.HOME}>Dashboard</Link>
            <Link to={APP_ROUTES.LOGIN}>Login</Link>
            <Link to={APP_ROUTES.REGISTER}>Register</Link>
        </div>
    );
}