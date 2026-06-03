import { Section } from "@/components/layout/dashboard/Section";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { type ReactNode } from "react";

type CardInSectionParams = {
    header: ReactNode;
    content: ReactNode;
    footer?: ReactNode;
}

export function SectionAsCard({ header, footer, content }: CardInSectionParams) {
    return (
        <Section>
            <Card>
                <CardHeader>
                    {header}
                </CardHeader>
                <CardContent>
                    {content}
                </CardContent>
                {
                    footer &&
                    <CardFooter>
                        {footer}
                    </CardFooter>
                }
            </Card>
        </Section>
    );
}   