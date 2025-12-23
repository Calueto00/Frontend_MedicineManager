import SideDashboard from "../components/SideDashboard";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <main className="flex h-screen">
            <SideDashboard />
            <section className="flex-1 overflow-auto bg-slate-100">
                <Outlet />
            </section>
        </main>
    );
}
