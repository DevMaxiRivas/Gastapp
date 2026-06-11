import {
    BadgeCheckIcon,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import type { AuthUserType } from "@/types/backend/auth/user"

export function NavUser() {
    const { user, logout } = useAuth()

    const authUser = user as AuthUserType

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger className={"w-full cursor-pointer"}>
                        <div className="flex gap-2 rounded-full">
                            <Avatar>
                                <AvatarImage src={`${authUser.profile?.avatarUrl}`} alt="shadcn" />
                                <AvatarFallback>{authUser.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{authUser.username}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {authUser.email}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="p-0">
                                <Link to="/profile" className="w-full px-2 py-1.5 flex gap-2 items-center cursor-pointer">
                                    <BadgeCheckIcon />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className={"text-red-600 cursor-pointer"}>
                            <LogOutIcon />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu >
    )
}
