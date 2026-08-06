import { Link } from "react-router-dom";

import CenteredFormContainer from "@/components/shared/auth/CenteredFormContainer";
import WelcomeBannerContainer from "@/components/shared/auth/WelcomeBannerContainer";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";


export default function ForgotPasswordPage() {
  return (
    <div className="flex h-dvh">
      <CenteredFormContainer title="Forgot Password" tip="Fill in your email address. We&apos;ll send you a reset link.">
        <ForgotPasswordForm />
        <>
          <p className="text-center text-muted-foreground text-xs">
            Remembered your password?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </>
      </CenteredFormContainer>
      <WelcomeBannerContainer greeting="Forgot Your Password?" tip="No worries, we&apos;ll help you reset it." animationDirection="left" />
    </div>
  );
}
