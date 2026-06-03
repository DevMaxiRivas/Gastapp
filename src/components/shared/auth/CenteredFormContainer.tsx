import { APP_NAME } from "@/lib/constants";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
type FormContainerProps = {
    title: string;
    children: ReactNode;
};

export function CenteredFormContainer({ title, children }: FormContainerProps) {
    return (
        <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
                <h1 className="font-bold text-center text-3xl">
                    <Link to="/">
                        {APP_NAME}
                    </Link>
                </h1>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight ">{title}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {children}
            </div>
        </section >
    );
}