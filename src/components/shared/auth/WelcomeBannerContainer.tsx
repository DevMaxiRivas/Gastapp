import { useMemo } from "react";
import BrandLogoLight from "../BrandLogoLight";

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
                    <div className="w-full flex justify-center p-2 rounded-lg">
                        <BrandLogoLight />
                    </div>
                    <div className="space-y-2">
                        <h1 className="font-light text-5xl text-primary-foreground">{greeting}</h1>
                        <p className="text-primary-foreground/80 text-xl">{tip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}