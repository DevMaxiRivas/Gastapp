import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import UpdateProfileForm from "@/features/profile/UpdateProfileForm";
import { ChevronDownIcon, User } from "lucide-react";

export default function ProfileSection() {
    return (
        <Card>
            <CardContent>
                <Collapsible>
                    <CollapsibleTrigger className="w-full cursor-pointer outline-none">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <User />
                                    <b>Profile Information</b>
                                </CardTitle>
                                <CardDescription>Update your personal information</CardDescription>
                            </div>
                            <ChevronDownIcon />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                        <UpdateProfileForm />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}