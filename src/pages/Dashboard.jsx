import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import SideDashboard from "../components/SideDashboard";

export default function Dashboard() {
    
    const {user} = useAuth();
    const [patients, setPatients] = useState([]);

    return (
        <main className="flex h-screen">
            <SideDashboard />
            <section className="flex-1 p-6 overflow-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Olá, {user.name}
                        </h1>
                        <p className="text-gray-600 text-sm mt-2">
                            Bem-vindo ao Sistema de Gerenciamento Hospitalar
                        </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <span className="text-gray-700 font-medium">
                            Permissão: <span className="text-blue-600 font-bold">{user.role}</span>
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}