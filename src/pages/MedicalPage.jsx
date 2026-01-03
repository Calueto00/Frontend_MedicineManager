import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { Link } from "react-router-dom";
import CalendarComponent from "../components/dashboard/CalendarComponent";


export default function MedicalPage() {
    const [doctors, setDoctors] = useState([]);
    const [upcoming, setUpComing] = useState([]);

    const fetchData = async () => {
        try {
            const [doctorResponse, appointmentResponse] = await Promise.all([
                api.get('/doctors'),
                api.get('/doctors_appointment')
            ]);
            setDoctors(doctorResponse.data);
            setUpComing(appointmentResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        // confirm deletion with the user
        if (!confirm('Confirma excluir este médico?')) return;
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


    return (
        <>
            <div className="bg-white p-2 flex items-center justify-between">
                <h1>Doctors Management</h1>
                <Link to={'/dashboard/doctor_novo'} className="bg-blue-800 text-white rounded-md px-4 py-2">
                    <span>Add New</span>
                </Link>
            </div>

            <div className="flex justify-between gap-3 p-3">
                {/**doctors list table */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between bg-white p-2 rounded shadow-md">
                        <h2>Doctor List</h2>
                        <span>Total ({doctors.length})</span>
                    </div>
                    <div className="mb-4">
                        <form action="" className=" text-center space-x-2">
                            <input
                                type="text"
                                placeholder="Digite name..."
                                className="outline-none p-2 w-1/3 bg-white rounded shadow-md border border-slate-200" />
                            <button className=" px-4 py-2 rounded bg-blue-600 text-white">Search</button>
                        </form>
                    </div>
                    <table className=" min-w-full text-sm">
                        <thead>
                            <tr className="text-sm text-slate-400">
                               
                                <th>Name</th>
                                <th>Email</th>
                                <th>Especiality</th>
                                
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors && doctors?.length > 0 ? (doctors.map((doctor) => (
                                    <tr key={doctor.id} className="text-base border-b-6 shadow-md bg-white text-sm text-center border-slate-100 rounded-md">
                                        
                                        <td>{doctor?.user?.name}</td>
                                        <td>{doctor?.user?.email}</td>
                                        <td>{doctor.especiality ?? 'no especiality'}</td>
                                        
                                        <td className="flex p-1 space-x-4 items-center justify-center">
                                            <Link to={`/dashboard/doctor/${doctor.id}`} title="Detalhes"
                                                className=" bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </Link>

                                            <button title="Excluir"
                                                onClick={() => handleDelete(doctor.user.id)}
                                                className=" bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition">
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
                                        <td colSpan={6} className="text-slate-400 text-center">No doctors found...</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/** side componentes */}
                <div className="w-100">

                    {/**upcoming appointments */}
                    <div className="bg-white rounded-lg p-3 shadow">
                        <div className="flex justify-between text-sm">
                            <h3 className=" font-semibold">Upcoming Appointment</h3>
                            <span>Total({upcoming?.length})</span>
                        </div>
                        <div className="space-y-2">
                            {upcoming && upcoming?.length > 0 ? (
                                upcoming.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="rounded-lg bg-slate-100 p-2 flex justify-between items-center">
                                        <label htmlFor="" className="text-sm">
                                            <h3 className="text-xs text-gray-700">Doctor</h3>
                                            <span className="font-semibold">{appointment?.doctor?.user?.name}</span>
                                        </label>

                                        <label htmlFor="" className="text-sm">
                                            <span className="font-semibold text-white bg-green-400 p-2 rounded-md">{appointment?.status}</span>
                                        </label>
                                    </div>
                                ))) : (<div className="text-center text-slate-300 text-sm">No Appointment found</div>)}
                        </div>
                    </div>

                    {/** dates schedules */}
                    <CalendarComponent />
                </div>

            </div>

        </>
    )
}