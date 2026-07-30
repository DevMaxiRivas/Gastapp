import { profileService } from "@/services/profileService";
import { toast } from "sonner";
import ProfileForm from "@/features/profile/ProfileForm";
import { formProfileInitialState } from "@/forms/schemas/ProfileSchema";
import { useAuth } from "@/context/AuthContext";

export default function CreateProfileForm() {
    const { refresh } = useAuth();
    const onSuccess = async () => {
        await refresh();
        toast.success("Profile created successfully");
    };

    return <ProfileForm
        mode="create"
        defaultValues={formProfileInitialState}
        onSubmitAction={(values) => profileService.createProfile(values)}
        onSuccess={onSuccess}
        submitLabel="Save" />
}