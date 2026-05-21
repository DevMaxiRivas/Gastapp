import { CenteredFormContainer } from "@/components/shared/auth/CenteredFormContainer";
import LoginForm from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <CenteredFormContainer title="Sign in to your account">
            <>
                <LoginForm />
                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Don&apos;t have an account{" "}
                    <br />
                    <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Click here to register
                    </Link>
                </p>
            </>
        </CenteredFormContainer>
    );
}