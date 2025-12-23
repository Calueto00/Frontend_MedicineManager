import { useAuth } from "../auth/AuthContext";
import SideDashboard from "../components/SideDashboard";
import api from "../api/axios";
import { useEffect, useState } from "react";
import GraficosDashboard from "../components/GraficosDashboard";


export default function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientResponse, doctorResponse] = await Promise.all([
                    api.get('/patients'),
                    api.get('/doctors'),
                ]);

                setPatients(patientResponse.data || []);
                setDoctors(doctorResponse.data || []);

                setLoading(true);
            } catch (error) {
                setError(error)
            }
        }

        fetchData();
    }, []);

    const patientCount = patients.length || 0;
    const doctorCount = doctors.length || 0;
    const AppointmentCount = 0;
    const examesCount = 0;

    return (
        <main className="flex h-screen">
            <SideDashboard />
            <section className="flex-1  overflow-auto bg-slate-100">
                <div className="flex items-center justify-between mb-4 bg-white p-2">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
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

                {/**dados estatisticos de patients, doctors and appointments  */}
                <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Patients Card */}
                    <div className="bg-white shadow-md border border-slate-200 flex items-center gap-4 p-4 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 20c0-2.761 3.582-5 8-5s8 2.239 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">Pacientes</span>
                            <h2 className="font-bold text-2xl mt-1">{patientCount}</h2>
                        </div>
                    </div>

                    {/* Doctors Card */}
                    <div className="bg-white shadow-md border border-slate-200 flex items-center gap-4 p-4 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">Médicos</span>
                            <h2 className="font-bold text-2xl mt-1">{doctorCount}</h2>
                        </div>
                    </div>

                    {/* Exams Card */}
                    <div className="bg-white shadow-md border border-slate-200 flex items-center gap-4 p-4 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M9 2h6l2 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V4l2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">Exames</span>
                            <h2 className="font-bold text-2xl mt-1">{examesCount}</h2>
                        </div>
                    </div>

                    {/* Appointments Card */}
                    <div className="bg-white shadow-md border border-slate-200 flex items-center gap-4 p-4 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">Agendamentos</span>
                            <h2 className="font-bold text-2xl mt-1">{AppointmentCount}</h2>
                        </div>
                    </div>
                </div>

                {/**aqui vem os blocos de graficos e listagem */}
                <div className="border">

                </div>

            </section>

            
        </main>
    );
}