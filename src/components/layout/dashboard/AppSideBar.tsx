"use client"

import * as React from "react"
import {
    ChartBarDecreasing,
    LayoutDashboard,
    List,
} from "lucide-react"

import { NavMain } from "./NavMain.tsx"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./NavSecondary.tsx"
import { NavUser } from "./NavUser.tsx"
import BrandLogo from "@/components/shared/BrandLogo.tsx"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Transactions",
            url: "/dashboard/transactions",
            icon: List,
        },
        {
            title: "Budget",
            url: "/dashboard/budget",
            icon: ChartBarDecreasing,
        },
    ],
    navSecondary: [
        // {
        //     title: "Get Help",
        //     url: "#",
        //     icon: FileQuestionMark,
        // },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <BrandLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
