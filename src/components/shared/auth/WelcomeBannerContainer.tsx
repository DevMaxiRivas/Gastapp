import { APP_NAME } from "@/lib/constants";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type WelcomeBannerContainerProps = {
    greeting: string;
    tip: string;
    animationDirection: "left" | "right";
}

export default function WelcomeBannerContainer({ greeting, tip, animationDirection }: WelcomeBannerContainerProps) {
    const animationClass = useMemo(() => {
        if (animationDirection === "left") {
            return "animate-fade-in-left";
        }
        return "animate-fade-in-right";
    }, [animationDirection]);

    return (
        <div className={`hidden bg-primary lg:block lg:w-1/3`}>
            <div className="flex h-full flex-col items-center justify-center p-12 text-center">
                <div className={`space-y-2 ${animationClass}`}>
                    <Link to={"/"}>
                        <div className="text-white text-3xl font-black tracking-tight">
                            <b>
                                {APP_NAME}
                            </b>
                        </div>
                    </Link>
                    <div className="space-y-2">
                        <h1 className="font-light text-5xl text-primary-foreground">{greeting}</h1>
                        <p className="text-primary-foreground/80 text-xl">{tip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}