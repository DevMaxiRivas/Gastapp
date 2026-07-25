import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
    label: string;
    isSubmitting: boolean;
}

export default function SubmitButton({ label, isSubmitting }: SubmitButtonProps) {
    return (
        <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
        </Button>
    )
}