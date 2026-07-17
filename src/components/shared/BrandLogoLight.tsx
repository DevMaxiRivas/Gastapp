import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandLogoLight() {
    return (
        <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xl tracking-tight font-bold text-white">
                GastApp
            </span>
        </Link>
    );
}