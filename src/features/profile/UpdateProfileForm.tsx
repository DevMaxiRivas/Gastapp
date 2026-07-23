import { profileService } from "@/services/profileService";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import type { ProfileUpdatePayloadType } from "@/types/backend/profile/payload";
import { toast } from "sonner";
import ProfileForm from "@/features/profile/ProfileForm";

export default function UpdateProfileForm() {
    const { user, refresh } = useAuth();

    if (!user || !user.profile) {
        return <Navigate to="/login" replace={true} />;
    }

    return <ProfileForm
        mode="update"
        defaultValues={{
            avatar: [],
            currency: user.profile.currency,
            budget: user.profile.currentBudget,
        }}
        onSubmitAction={(values: ProfileUpdatePayloadType) => profileService.updateProfile(values)}
        onSuccess={async () => {
            toast.success("Profile updated successfully");
            await refresh();
        }}
        submitLabel="Save Changes" />
}