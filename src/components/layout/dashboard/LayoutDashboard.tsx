import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSideBar";
import { SiteHeader } from "@/components/layout/dashboard/SiteHeader";
import { FloatingButton } from "@/features/transactions/components/FloattingButton";
import { Toaster } from "sonner";
import { DashboardSSEProvider } from "@/context/DashboardSSEProvider";

export default function LayoutDashboard() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <DashboardSSEProvider>
                    <SiteHeader />
                    <FloatingButton />
                    <main className="p-4 space-y-4">
                        <Outlet />
                    </main>
                </DashboardSSEProvider>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}