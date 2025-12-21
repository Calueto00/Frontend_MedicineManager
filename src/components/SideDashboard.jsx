import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SideDashboard() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: "📊", label: "Dashboard", path: "/dashboard" },
        { icon: "👥", label: "Pacientes", path: "/patients" },
        { icon: "👨‍⚕️", label: "Médicos", path: "/doctors" },
        { icon: "📋", label: "Agendamentos", path: "/appointments" },
        { icon: "🏥", label: "Departamentos", path: "/departments" },
        { icon: "⚙️", label: "Configurações", path: "/settings" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className={`${isOpen ? "w-64" : "w-20"
            } h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 text-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col`}>

            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-blue-500/30">
                {isOpen && (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-xl font-bold">
                            🏥
                        </div>
                        <h1 className="text-xl font-bold">MedSystem</h1>
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-blue-500/30 rounded-lg transition-colors duration-200"
                    title={isOpen ? "Fechar" : "Abrir"}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-3 py-6 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-500/40 transition-colors duration-200 group"
                    >
                        <span className="text-2xl">{item.icon}</span>
                        {isOpen && (
                            <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                                {item.label}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-6 border-t border-blue-500/30 space-y-4">
                
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/40 transition-colors duration-200 group text-red-300 hover:text-red-200"
                >
                    <span className="text-2xl">🚪</span>
                    {isOpen && (
                        <span className="text-sm font-medium">Sair</span>
                    )}
                </button>
            </div>
        </aside>
    );
}