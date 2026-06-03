import { Outlet } from "react-router-dom";
export default function LayoutPublic() {
    return (
        <main className="p-4 space-y-2">
            <Outlet />
        </main>
    );
}