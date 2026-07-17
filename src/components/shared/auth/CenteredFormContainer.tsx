import type { ReactNode } from "react";
import BrandLogo from "../BrandLogo";
type FormContainerProps = {
    title: string;
    tip: string;
    children: ReactNode;
};

export default function CenteredFormContainer({ title, tip, children }: FormContainerProps) {
    return (
        <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3 animate-fade-in">
            <div className="w-full max-w-md space-y-5 py-24 lg:py-32">
                <div className="space-y-4 text-center">
                    <div className="lg:hidden text-primary font-black text-3xl tracking-tight">
                        <div className="w-full flex justify-center p-2 rounded-lg">
                            <BrandLogo />
                        </div>
                    </div>
                    <div className="hidden lg:block text-3xl font-black tracking-tight">
                        {title}
                    </div>
                    <div className="mx-auto max-w-xl text-muted-foreground font-medium">
                        {tip}
                    </div>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}