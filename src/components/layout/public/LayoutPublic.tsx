import { Outlet } from "react-router-dom";
export default function LayoutPublic() {
    return (
        <main className="">
            <Outlet />
        </main>
    );
}