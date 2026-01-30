import api from "../../api/axios"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

const Icons = {
    menu: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    search: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
};

export default function PatientPage() {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [name, setName] = useState('');

    //call data from database
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
    },[]);

    //search patient by name
    useEffect(() => {
        if(name.length == 0){
            fetchData();
            return;
        }
        const search = async () => {
            await api.get(`/patient/name/${name}`)
            .then((res) => setPatients(res.data));
        };
        search();
    },[name]);

    
    const patientCount = patients.length || 0;
    
    return (
        <main className="bg-blue-50 h-screen">
            <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-slate-300 py-3 flex items-center justify-between space-x-4">
                <h1 className="font-bold text-lg text-blue-900">Patients Management</h1>
                <Link 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    to={'/dashboard/patient/novo'}>+ Add Patient</Link>
            </div>

            {/**main content */}
            <div className="flex p-3 gap-4">
                {/**patient list and search */}
                <div className="flex-1 space-y-3">
                    <div className="bg-white flex items-center justify-between p-3 rounded-lg shadow-md border-l-4 border-blue-600">
                        <h3 className="font-semibold text-gray-800">Patient List</h3>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Total: {patientCount}</span>
                    </div>

                    {/* Search Bar */}
                        <div className=" flex items-center justify-center">
                            <form className="flex w-1/2 bg-white p-1 rounded-lg shadow-sm border border-gray-300 focus-within:border-blue-500 focus-within:shadow-md transition"
                                       >
                                    <input type="text"
                                        value={name} 
                                        onChange={(e)=> setName(e.target.value)}
                                        placeholder="Search patient name..."
                                        className="flex-1 p-1 outline-none text-gray-700 placeholder-gray-500"/>
                                        <button type="button" className="text-gray-600 hover:text-blue-600 p-2 transition">
                                            {Icons.search}
                                        </button>
                                </form>
                        </div>
                    {/**list patients */}
                    <div className="p-2 space-y-3">
                        <table className="min-w-full text-sm text-center">
                            <thead>
                                <tr className="text-gray-600 bg-blue-50 border-b-2 border-blue-200">
                                    <th className="p-2 text-left font-semibold">Name</th>
                                    <th className="p-2 text-left font-semibold">Email</th>
                                    <th className="p-2 text-left font-semibold">Phone</th>
                                    <th className="p-2 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {patients.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-gray-500 text-center text-sm">No patients found</td>
                                    </tr>
                                ) : (
                                    patients.map((patient) => (
                                        <tr key={patient?.id} className="border-b border-slate-100 hover:bg-slate-50 transition text-center">
                                            <td className="p-2 text-sm">{patient?.user?.name ?? '-'}</td>
                                            <td className="p-2 text-sm text-slate-600">{patient?.user?.email ?? '-'}</td>
                                            <td className="p-2 text-sm text-slate-600">{patient?.phone ?? '-'}</td>
                                            <td className="p-2 flex items-center justify-center gap-2">
                                                <Link title="View Details"
                                                    to={`/dashboard/patient/${patient.id}`}
                                                    className="flex items-center gap-2 bg-blue-600 text-white rounded px-3 py-1.5 hover:bg-blue-700 transition text-xs"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </Link>

                                                <button title="Delete"
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="flex items-center gap-2 bg-red-600 text-white rounded px-3 py-1.5 hover:bg-red-700 transition text-xs">
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
                
                  <div className="w-100 space-y-3 h-[560px] grid grid-rows-3 gap-2">

                    {/**pending appointments */}
                    <div className="bg-white rounded-lg shadow-sm px-2 py-1 space-y-1 h-full border border-slate-100">
                        <div className="flex items-center justify-between text-sm border-b border-orange-200 pb-2">
                            <h3 className="font-semibold text-gray-700">Pending</h3>
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">{ appointments?.filter(a => a.status === 'pending').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-32"> 
                            {
                                appointments?.length === 0 ? (
                                    <div className="text-sm text-center p-2 text-gray-600">No schedules done</div>
                                ) : (appointments.filter(ap => ap.status === 'pending').map(ap => (
                                    <div key={ap.id}
                                        className="flex items-center justify-between bg-orange-50 p-1.5 rounded-lg border border-orange-200 hover:bg-orange-100 transition text-xs">
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600 font-semibold">Patient</h3>
                                            <span className="text-sm text-orange-900">{ap?.patient?.user?.name}</span>
                                        </label>
                                        <span className="bg-orange-500 text-white rounded px-2 py-0.5 text-xs font-medium">Pending</span>
                                      
                                    </div>
                                )))
                            }
                        </div>
                    </div>

                    {/** confirmed appointments */}
                    <div className="bg-white rounded-lg shadow-sm px-2 py-1 space-y-1 h-full border border-slate-100">
                       <div className="text-sm flex items-center justify-between border-b border-blue-200 pb-2">
                            <h3 className="font-semibold text-gray-700">Confirmed</h3>
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{ appointments?.filter(a => a.status === 'confirmed').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-32">
                            {
                                appointments?.filter(a => a.status === 'confirmed').map(a => (
                                    <div className="flex items-center justify-between bg-blue-50 p-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-xs" key={a.id}>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600 font-semibold">Patient</h3>
                                            <span className="text-sm text-blue-900">{a?.patient?.user?.name}</span>
                                        </label>
                                        <span className="bg-blue-500 text-white rounded px-2 py-0.5 text-xs font-medium">Confirmed</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/** concluded appointments */}
                    <div className="bg-white rounded-lg shadow-sm px-2 py-1 space-y-1 h-full border border-slate-100 overflow-hidden">
                        <div className="text-sm flex items-center justify-between border-b border-green-200 pb-2">
                            <h3 className="font-semibold text-gray-700">Concluded</h3>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{ appointments?.filter(a => a.status === 'concluded').length}</span>
                        </div>
                        <div className="space-y-1 overflow-y-auto h-32"> 
                            {
                                appointments?.filter(a => a.status === 'concluded').map(a => (
                                    <div className="flex items-center justify-between bg-green-50 p-1.5 rounded-lg border border-green-200 hover:bg-green-100 transition text-xs" key={a.id}>
                                        <label htmlFor="">
                                            <h3 className="text-xs text-gray-600 font-semibold">Patient</h3>
                                            <span className="text-sm text-green-900">{a?.patient?.user?.name}</span>
                                        </label>
                                        <span className="bg-green-500 text-white rounded px-2 py-0.5 text-xs font-medium">Concluded</span>
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