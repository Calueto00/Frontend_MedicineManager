import api from "../api/axios"
import { useState, useEffect } from "react";
import PatientAdd from "../components/dashboard/patients/PatientAdd";
import PatientDetails from "../components/dashboard/patients/PatientDetails";

export default function PatientPage() {
    const [patients, setPatients] = useState([]);
    const [tabs, setTabs] = useState('list');
    const [user, setUser] = useState({ id: null, name: '' });

    const fetchData = async () => {
        try {
            const response = await api.get('/patients');
            setPatients(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const details = (id, name) => {
        try {
            if (id) {
                setTabs('profile');
                setUser({
                    id: id,
                    name: name
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    const patientList = () => {
        setUser({
            id: null,
            name: ''
        });
        setTabs('list');
        // Re-fetch patients when returning to the list
        fetchData();
    }

    const addPatient = () => {
        setUser({
            id: null,
            name: ''
        });
        setTabs('add');
    }

    const patientCount = patients.length || 0;
    return (
        <main className="bg-slate-200 h-screen">
            <div className="border-b bg-white p-4 border-slate-300 py-2 flex items-center justify-between space-x-4">
                <h1 className="font-semibold text-xl">Patients Management</h1>
                <button
                    className={tabs === 'add' ? 'bg-blue-800 text-white rounded p-2 animate-pulse' : 'bg-blue-800 text-white rounded p-2'}
                    onClick={addPatient}>
                    + New Patient
                </button>
            </div>

            {/**number of patients and filter */}
            <div className="flex justify-between items-center border border-slate-300 p-2 space-x-4">
                <div className="space-x-3 flex items-center">
                    <button
                        className={tabs === 'list' ? 'border-b-2 border-blue-700 p-2 cursor-pointer' : 'p-2 cursor-pointer hover:border hover:border-blue-700'}
                        onClick={patientList}>Patients List</button>
                    {
                        user.id ? (
                            <span className="font-semibold flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{user.name}</span>
                            </span>
                        ) : ''
                    }
                </div>



            </div>

            {/**table de patients */}
            {
                tabs === 'list' &&
                <div className="p-2 space-y-3">
                    <div className="flex items-center justify-between">
                        <form action="" className="space-x-3 border">
                            <input
                                type="text"
                                className="border p-2 bg-white focus:outline-none rounded-lg border-slate-300 shadow-md"
                                placeholder="digite nome..." />

                        </form>
                        <div className="flex gap-2">
                            <h2>Total Patients: </h2>
                            <span>{patientCount}</span>
                        </div>
                    </div>
                    <table className="min-w-full text-sm text-center">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="p-2">ID</th>
                                <th className="p-2">Nome</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Telefone</th>
                                <th className="p-2">Nascimento</th>
                                <th className="p-2">Endereço</th>
                                <th className="p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {patients.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-6 text-gray-500">Nenhum paciente encontrado.</td>
                                </tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient?.id} className="border-b-4 border-slate-200 hover:bg-slate-50">
                                        <td className="p-2">{patient?.id ?? '-'}</td>
                                        <td className="p-2 text-left">{patient?.user?.name ?? '-'}</td>
                                        <td className="p-2">{patient?.user?.email ?? '-'}</td>
                                        <td className="p-2">{patient?.phone ?? '-'}</td>
                                        <td className="p-2">{patient?.birth ? new Date(patient.birth).toLocaleDateString() : '-'}</td>
                                        <td className="p-2">{patient?.address ?? '-'}</td>
                                        <td className="p-2 flex items-center justify-center gap-2">
                                            <button title="Detalhes"
                                                className="flex items-center gap-2 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 transition"
                                                onClick={() => details(patient.id, patient.user.name)}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                
                                            </button>

                                            <button title="Excluir" className="flex items-center gap-2 bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700 transition">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M10 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            }

            {/** add a new patient */}
            {
                tabs === 'add' && <PatientAdd />
            }

            {/**details de patient */}
            {
                tabs === 'profile' && <PatientDetails id={user.id} />
            }
        </main>
    )
}