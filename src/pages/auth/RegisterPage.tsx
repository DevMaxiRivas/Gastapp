import { CenteredFormContainer } from "@/components/shared/auth/CenteredFormContainer";
import RegisterForm from "@/features/auth/components/RegisterForm";

export function RegisterPage() {
    return (
        <CenteredFormContainer title="Create an account">
            <RegisterForm />
        </CenteredFormContainer>
    );
}