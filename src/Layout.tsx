import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSideBar";
import { SiteHeader } from "./components/layout/SiteHeader";
import { FloatingButton } from "./features/transactions/components/FloattingButton";

export default function Layout() {
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
                <main className="flex flex-1 flex-col">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}