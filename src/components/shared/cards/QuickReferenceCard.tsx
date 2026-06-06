import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { COLORS_TEXT } from "@/lib/constantsFront";
import { type LucideIcon } from "lucide-react";

type QuickReferenceCardParams = {
    title: string;
    value: string;
    footer?: string;
    type: "success" | "danger" | "neutral";
    iconCard?: LucideIcon;
}

export function QuickReferenceCard({ title, value, footer, type, iconCard: IconCard }: QuickReferenceCardParams) {
    return (
        <Card className="@container/card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {IconCard && <IconCard className={`h-4 w-4 ${COLORS_TEXT[type]}`} />}
            </CardHeader>
            <CardContent className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${COLORS_TEXT[type]}`}>
                {value}
            </CardContent>
            {
                footer && <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {footer}
                    </div>
                </CardFooter>
            }
        </Card>
    )
}