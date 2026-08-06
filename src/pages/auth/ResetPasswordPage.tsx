import { Link, Navigate, useSearchParams } from "react-router-dom";

import CenteredFormContainer from "@/components/shared/auth/CenteredFormContainer";
import WelcomeBannerContainer from "@/components/shared/auth/WelcomeBannerContainer";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { APP_ROUTES } from "@/lib/constants";


export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (token === null) return <Navigate to={APP_ROUTES.LOGIN} replace={true} />;

  return (
    <div className="flex h-dvh">
      <WelcomeBannerContainer
        greeting="Let&apos;s reset your password"
        tip="Enter your new password and confirm it to complete the reset process."
        animationDirection="right"
      />
      <CenteredFormContainer
        title="Create new password"
        tip="Enter your new password and confirm it below."
      >
        <ResetPasswordForm token={token} />
        <>
          <p className="text-center text-muted-foreground text-xs">
            Remembered your password?{" "}
            <Link to={APP_ROUTES.LOGIN} className="text-primary">
              Login
            </Link>
          </p>
        </>
      </CenteredFormContainer>
    </div>
  );
}
