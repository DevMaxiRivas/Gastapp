import { Link } from "react-router-dom";

import WelcomeBannerContainer from "@/components/shared/auth/WelcomeBannerContainer";
import CenteredFormContainer from "@/components/shared/auth/CenteredFormContainer";
import LoginForm from "@/features/auth/components/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex h-dvh">
      <WelcomeBannerContainer greeting="Hello again" tip="Login to continue" animationDirection="right" />
      <CenteredFormContainer title="Login" tip="Welcome back. Enter your email and password, let&apos;s hope you remember them this time.">
        <>
          <LoginForm />
          <p className="text-center text-muted-foreground text-xs">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </>
      </CenteredFormContainer>

    </div>
  );
}
