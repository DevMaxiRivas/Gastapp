import { profileService } from "@/services/profileService";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import type { ProfileUpdatePayloadType } from "@/types/backend/profile/payload";
import { toast } from "sonner";
import ProfileForm from "@/features/profile/ProfileForm";
import { formProfileInitialState } from "@/forms/schemas/ProfileSchema";

export default function CreateProfileForm() {
    const { user, refresh } = useAuth();

    if (!user || !user.profile) {
        return <Navigate to="/login" replace={true} />;
    }

    return <ProfileForm
        mode="create"
        defaultValues={formProfileInitialState}
        onSubmitAction={(values: ProfileUpdatePayloadType) => profileService.updateProfile(values)}
        onSuccess={async () => {
            toast.success("Profile created successfully");
            await refresh();
        }}
        submitLabel="Save" />
}