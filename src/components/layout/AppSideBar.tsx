"use client"

import * as React from "react"
import {
    Camera,
    ChartBarDecreasing,
    LayoutDashboard,
    Brain,
    File,
    FileQuestionMark,
    List,
    Settings,
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
import { APP_NAME, APP_ROUTES } from "@/lib/constants.ts"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: APP_ROUTES.HOME,
            icon: LayoutDashboard,
        },
        {
            title: "Transactions",
            url: APP_ROUTES.TRANSACTIONS,
            icon: List,
        },
        {
            title: "Budget",
            url: APP_ROUTES.BUDGET,
            icon: ChartBarDecreasing,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: Camera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: File,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: Brain,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: FileQuestionMark,
        },
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
                            <a href="/">
                                {/* <FileUp className="size-5!" /> */}
                                <span className="text-base font-semibold">{APP_NAME}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
