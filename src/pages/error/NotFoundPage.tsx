import { Section } from "@/components/layout/dashboard/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <Section>
            <div className="h-[80vh] w-full">
                <div className="h-full flex flex-col items-center justify-center text-sm max-md:px-4">
                    <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
                    <div className="h-1 w-16 rounded bg-primary my-5 md:my-7"></div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</p>
                    <p className="text-sm md:text-base mt-4 text-gray-500 dark:text-gray-400 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                    <div className="flex items-center gap-4 mt-6">
                        <Link to="/">
                            <Button>Return Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}