import WelcomeBannerContainer from "@/components/shared/auth/WelcomeBannerContainer";
import CenteredFormContainer from "@/components/shared/auth/CenteredFormContainer";
import ProfileForm from "@/features/auth/components/ProfileForm";
import FileUpload03 from "@/components/shared/forms/InputImage";


export default function ProfilePage() {
  return (
    <div className="flex h-dvh">
      <WelcomeBannerContainer greeting="Profile" tip="Update your profile information" animationDirection="right" />
      <CenteredFormContainer title="Profile" tip="Update your profile information">
        <ProfileForm />
        {/* <FileUpload03 /> */}
      </CenteredFormContainer>

    </div>
  );
}
