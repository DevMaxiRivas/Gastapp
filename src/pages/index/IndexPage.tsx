import { useAuth } from "@/context/AuthContext";
import { APP_ROUTES } from "@/lib/constants";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <h1>Index</h1>
            {
                !isAuthenticated ?
                    <>
                        <Link to={APP_ROUTES.LOGIN}>Login</Link>
                        <Link to={APP_ROUTES.REGISTER}>Register</Link>
                    </> :
                    <>
                        <Link to={APP_ROUTES.DASHBOARD}>Dashboard</Link>
                    </>
            }
        </div>
    );
}