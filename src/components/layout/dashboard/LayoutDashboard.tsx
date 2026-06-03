import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import { SiteHeader } from "./SiteHeader";
import { FloatingButton } from "../../../features/transactions/components/FloattingButton";

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
                <SiteHeader />
                <FloatingButton />
                <main className="p-4 space-y-2">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}