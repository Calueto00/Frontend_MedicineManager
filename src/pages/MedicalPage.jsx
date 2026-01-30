import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { Link } from "react-router-dom";
import CalendarComponent from "../components/dashboard/CalendarComponent";

const Icons = {
    menu: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    search: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
};

export default function MedicalPage() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [name, setName] = useState('');

    const fetchData = async () => {
        try {
            const [doctorResponse, appointmentResponse] = await Promise.all([
                api.get('/doctors'),
                api.get('/doctors_appointment')
            ]);
            setDoctors(doctorResponse.data);
           setAppointments(appointmentResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        // confirm deletion with the user
        if (!confirm('Confirm delete this doctor?')) return;
        try {
            await api.delete(`/doctor/${id}`);
            toast.success('Doctor deleted successfully');
            // refresh list after successful deletion
            await fetchData();
        } catch (error) {
            console.error(error);
            const msg = error?.response?.data?.message || error?.message || 'Error deleting doctor';
            toast.error(msg);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    //search doctors
    useEffect(() => {
        if(name?.length == 0) {
            fetchData();
            return ;
        }
        const search = async () => {
            await api.get(`/doctor/search/${name}`).then((res) => setDoctors(res.data));
        };
        search();
    },[name]);


    return (
        <>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 flex items-center justify-between rounded-lg shadow-sm">
                <h1 className="text-lg font-bold text-blue-900">Doctors Management</h1>
                <Link to={'/dashboard/doctor_novo'} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition">
                    <span>Add New</span>
                </Link>
            </div>

            <div className="flex justify-between gap-3 p-3">
                {/**doctors list table */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border-l-4 border-blue-600">
                        <h2 className="font-semibold text-gray-800">Doctor List</h2>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Total: {doctors.length}</span>
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
                    <table className=" min-w-full text-sm">
                        <thead>
                            <tr className="text-sm text-slate-600 bg-blue-50 border-b-2 border-blue-200">
                                <th className="p-2 text-left font-semibold">Name</th>
                                <th className="p-2 text-left font-semibold">Email</th>
                                <th className="p-2 text-left font-semibold">Specialty</th>
                                <th className="p-2 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors && doctors?.length > 0 ? (doctors.map((doctor) => (
                                    <tr key={doctor.id} className="bg-white border-b border-slate-100 hover:bg-slate-50 transition">
                                        <td className="p-2 text-sm">{doctor?.user?.name}</td>
                                        <td className="p-2 text-sm text-slate-600">{doctor?.user?.email}</td>
                                        <td className="p-2 text-sm text-slate-600">{doctor.especiality ?? 'N/A'}</td>
                                        <td className="flex p-2 space-x-2 items-center justify-center">
                                            <Link to={`/dashboard/doctor/${doctor.id}`} title="View Details"
                                                className="bg-blue-600 text-white rounded px-3 py-1.5 hover:bg-blue-700 transition text-xs"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </Link>

                                            <button title="Delete"
                                                onClick={() => handleDelete(doctor.user.id)}
                                                className="bg-red-600 text-white rounded px-3 py-1.5 hover:bg-red-700 transition text-xs">
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
                                ))) : (
                                    <tr>
                                        <td colSpan={4} className="text-slate-400 text-center p-4 text-sm">No doctors found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/** side componentes */}
                <div className="w-100 space-y-3">
                    <div className="flex items-center justify-between text-sm bg-white p-2 rounded-lg shadow-sm border-l-4 border-green-600">
                        <h3 className="font-semibold text-gray-800">Appointments</h3>
                        <Link className="font-semibold text-blue-600 hover:text-blue-800 transition" to={'/dashboard/appointments'}>View All</Link>
                    </div>
                    <div className="grid grid-rows-3 h-[535px] gap-2">
                        {/**upcoming appointments */}
                        <div className="bg-white rounded-lg h-full p-2 shadow-sm border border-slate-100">
                            <div className="text-sm flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-700">Pending</h3>
                                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">{ appointments?.filter(a => a.status === 'pending')?.length}</span>
                            </div>
                            <div className="h-32 overflow-y-auto space-y-1">
                                {
                                    appointments?.filter(a => a.status === 'pending')?.map(doc => (
                                        <div key={doc.id} className="border border-orange-200 text-xs rounded p-1.5 bg-orange-50 hover:bg-orange-100 transition flex items-center justify-between">
                                            <h3 className="font-semibold text-orange-900 truncate">Dr. {doc.schedule?.doctor?.user?.name}</h3>
                                            <span className="bg-orange-500 rounded px-2 py-0.5 text-white text-xs flex-shrink-0">Pending</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/**doctor with appointment confirmed */}
                        <div className="bg-white rounded-lg h-full p-2 shadow-sm border border-slate-100">
                            <div className="text-sm flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-700">Confirmed</h3>
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{ appointments?.filter(a => a.status === 'confirmed')?.length}</span>
                            </div>
                            <div className="h-32 overflow-y-auto space-y-1">
                                {
                                    appointments?.filter(a => a.status === 'confirmed')?.map(doc => (
                                        <div key={doc.id} className="border border-blue-200 text-xs rounded p-1.5 bg-blue-50 hover:bg-blue-100 transition flex items-center justify-between">
                                            <h3 className="font-semibold text-blue-900 truncate">Dr. {doc.schedule?.doctor?.user?.name}</h3>
                                            <span className="bg-blue-500 rounded px-2 py-0.5 text-white text-xs flex-shrink-0">Confirmed</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/** dates schedules */}
                        <CalendarComponent />
                    </div>
                </div>

            </div>

        </>
    )
}