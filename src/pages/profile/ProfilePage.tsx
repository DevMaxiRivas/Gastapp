import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import ProfileSection from "./components/ProfileSection";

export default function ProfilePage() {
    return (
        <>
            <TitlePageSection
                title="Settings"
                subtitle="Manage your profile and preferences"
            />

            <ProfileSection />
        </>
    )
}