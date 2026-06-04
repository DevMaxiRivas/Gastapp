import { APP_NAME } from "@/lib/constants";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
type FormContainerProps = {
    title: string;
    tip: string;
    children: ReactNode;
};

export function CenteredFormContainer({ title, tip, children }: FormContainerProps) {
    return (
        <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
            <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
                <div className="space-y-4 text-center">
                    <div className="lg:hidden text-primary font-black text-3xl tracking-tight">
                        <Link to={"/"}>
                            <b>
                                {APP_NAME}
                            </b>
                        </Link>
                    </div>
                    <div className="hidden lg:block text-3xl font-black tracking-tight">
                        <b>
                            {title}
                        </b>
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