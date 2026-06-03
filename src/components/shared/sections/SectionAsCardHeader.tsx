import { CardDescription, CardTitle } from "@/components/ui/card";

type CardHeaderProps = {
    title: string;
    description: string;
}
export function SectionAsCardHeader({ title, description }: CardHeaderProps) {
    return (
        <>
            <CardTitle className="text-xl font-semibold">
                <b>
                    {title}
                </b>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
        </>
    );
} 1