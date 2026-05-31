import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

type QuickReferenceCardParams = {
    title: string;
    value: string;
    footer: string;
    type: "success" | "danger" | "neutral";
}

const getClassNameByType = (type: "success" | "danger" | "neutral") => {
    switch (type) {
        case "success":
            return "text-green-600";
        case "danger":
            return "text-red-600";
        case "neutral":
            return "text-blue-600";
    }
}

export function QuickReferenceCard({ title, value, footer, type }: QuickReferenceCardParams) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${getClassNameByType(type)}`}>
                    {value}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {footer}
                </div>
            </CardFooter>
        </Card>
    )
}