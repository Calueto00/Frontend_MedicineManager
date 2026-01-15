import api from "../../api/axios"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";


export default function PatientPage() {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get('/patients');
            setPatients(response.data.patients || []);
            setAppointments(response?.data?.appointments || []);
        } catch (error) {
            console.error(error);
        }
    };


    //method to delete patient
    const handleDelete = async (id) => {

        if (!confirm('Do you really want to delete ?')) return;
        try {
            await api.delete(`/patient/${id}`);
            toast.success('Patient deleted successfully !');
            await fetchData();
        } catch (error) {
            toast.error(error);
        }
    }

    //take all the datas when the page reload
    useEffect(() => {
        fetchData();
    }, []);

    
    const patientCount = patients.length || 0;
    const appointmentCount = appointments.length || 0;
    return (
        <main className="bg-blue-50 h-screen">
            <div className="border-b bg-white p-4 border-slate-300 py-2 flex items-center justify-between space-x-4">
                <h1 className="font-semibold ">Patients Management</h1>
                <Link 
                    className="bg-blue-700 text-white px-6 py-2 rounded"
                    to={'/dashboard/patient/novo'}>+ Add Patient</Link>
            </div>

            {/**main content */}
            <div className="flex p-3 gap-4">
                {/**patient list and search */}
                <div className="flex-1 space-y-3">
                    <div className="bg-white flex items-center justify-between p-2 rounded-md shadow-md">
                        <h3 className="font-semibold">Patient List</h3>
                        <span className="">Total ({patientCount})</span>
                    </div>

                    {/**form search for patients */}
                    <form action="" className="text-center space-x-2">
                        <input 
                        placeholder="Digit name..."
                        className="bg-white p-2 outline-none border border-slate-300 shadow-sm rounded-md" type="text" />
                        <button className="px-6 py-2 bg-blue-600 rounded text-white">Search</button>
                    </form>

                    {/**list patients */}
                    <div className="p-2 space-y-3">
                        <table className="min-w-full text-sm text-center">
                            <thead>
                                <tr className="text-gray-500">

                                    <th className="p-2">Nome</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Telefone</th>

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
                                        <tr key={patient?.id} className="border-b-4 border-slate-200 hover:bg-slate-50 text-center">

                                            <td className="p-2">{patient?.user?.name ?? '-'}</td>
                                            <td className="p-2">{patient?.user?.email ?? '-'}</td>
                                            <td className="p-2">{patient?.phone ?? '-'}</td>
                                            <td className="p-2 flex items-center justify-center gap-2">
                                                <Link title="Detalhes"
                                                    to={`/dashboard/patient/${patient.id}`}
                                                    className="flex items-center gap-2 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 transition"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </Link>

                                                <button title="Excluir"
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="flex items-center gap-2 bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700 transition">
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
                </div>

                {/**appointment side list */}
                
                  <div className="w-100 space-y-2 h-[560px] grid grid-rows-3 gap-1">

                    {/**pending appointments */}
                    <div className="bg-white rounded-md shadow-sm px-2 py-1 space-y-1 h-full ">
                        <div className="flex items-center justify-between text-sm border-b border-blue-100 pb-2">
                            <h3 className="font-semibold">Scheduled Patients</h3>
                            <span>Total - { appointments?.filter(a => a.status === 'pending').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-35"> 
                            {
                                appointments?.length === 0 ? (
                                    <div className="text-sm text-center p-2 text-gray-600">No schedules done</div>
                                ) : (appointments.filter(ap => ap.status === 'pending').map(ap => (
                                    <div key={ap.id}
                                        className="flex items-center justify-between bg-blue-50 p-1 rounded-md">
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Patient</h3>
                                            <span className="text-sm">{ap?.patient?.user?.name}</span>
                                        </label>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Status</h3>
                                            <span className="text-sm bg-orange-600 text-white rounded-md p-1">Pending</span>
                                        </label>
                                      
                                    </div>
                                )))
                            }
                        </div>
                    </div>

                    {/** confirmed appointments */}
                    <div className="bg-white rounded-md shadow-sm px-2 py-1 space-y-1 h-full">
                       <div className="text-sm flex items-center justify-between">
                            <h3 className="font-semibold">Patients schedule confirmed</h3>
                            <span>Total - { appointments?.filter(a => a.status === 'confirmed').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-35">
                            {
                                appointments?.filter(a => a.status === 'confirmed').map(a => (
                                    <div className="flex items-center justify-between bg-blue-50 p-1 rounded-md" key={a.id}>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Patient</h3>
                                            <span className="text-sm">{a?.patient?.user?.name}</span>
                                        </label>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Data</h3>
                                            <span className="text-sm">{a.data}</span>
                                        </label>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Status</h3>
                                            <span className="text-sm bg-blue-600 text-white rounded-md p-1">Confirmed</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/** concluded appointments */}
                    <div className="bg-white rounded-md shadow-sm px-2 py-1 space-y-1 h-full overflow-hidden">
                        <div className="text-sm flex items-center justify-between">
                            <h3 className="font-semibold">Patients Appointment done</h3>
                            <span>Total - { appointments?.filter(a => a.status === 'concluded').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-35"> 
                            {
                                appointments?.filter(a => a.status === 'concluded').map(a => (
                                    <div className="flex items-center justify-between bg-blue-50 p-1 rounded-md" key={a.id}>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Patient</h3>
                                            <span className="text-sm">{a?.patient?.user?.name}</span>
                                        </label>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Data</h3>
                                            <span className="text-sm">{a.data}</span>
                                        </label>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600">Status</h3>
                                            <span className="text-sm bg-green-600 text-white rounded-md p-1">Concluded</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>     
                </div>  
                 
            </div>
            

           
               
                
            

           
            

            
        </main>
    )
}