import { CardDescription, CardTitle } from "@/components/ui/card";

type CardHeaderProps = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}
export function SectionAsCardHeader({ title, description, icon }: CardHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-xl font-semibold">
                    <div className="flex flex-row justify-start items-center gap-3">
                        {icon}
                        <b>{title}</b>
                    </div>
                </CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </div>
        </div>
    );
}