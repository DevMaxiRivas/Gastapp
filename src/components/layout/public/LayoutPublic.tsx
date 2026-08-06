import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
export default function LayoutPublic() {
    return (
        <main className="">
            <Outlet />
            <Toaster />
        </main>
    );
}