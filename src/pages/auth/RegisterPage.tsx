import { Link } from "react-router-dom";

import CenteredFormContainer from "@/components/shared/auth/CenteredFormContainer";
import WelcomeBannerContainer from "@/components/shared/auth/WelcomeBannerContainer";
import RegisterForm from "@/features/auth/components/RegisterForm";


export default function RegisterPage() {
  return (
    <div className="flex h-dvh">
      <CenteredFormContainer title="Register" tip="Fill in your details below. We promise not to quiz you about your first pet&apos;s name (this time).">
        <>
          <RegisterForm />
          <p className="text-center text-muted-foreground text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </>
      </CenteredFormContainer>
      <WelcomeBannerContainer greeting="Welcome!" tip="You&apos;re in the right place." animationDirection="left" />
    </div>
  );
}
