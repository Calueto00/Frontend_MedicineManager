import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const day = {
    1 : 'Monday',
    2 : 'Thuesday',
    3 : 'Wenesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Sartday',
    7 : 'Sunday'
};

export default function PatientAppointment(){
    const [patient, setPatient] = useState({});
    const [appointments, setAppointments] = useState([]);
    const {id} = useParams();

    //get patient info
    useEffect(()=> {
        const fetchData = async () => {
            await api.get(`/patient/${id}`).then((res) => {
                setPatient(res.data);
                setAppointments(res.data?.appointments);
            });
        };

        fetchData();
    },[id]);
    return (
        <main className="p-2 space-y-3">
            <div className="my-2 pb-2">
                <Link to={-1} 
                className="bg-blue-600 rounded-md px-4 py-2 text-white cursor-pointer">
                Return
            </Link>
            </div>
            <div className="p-2 bg-white border-l-4 border-l-blue-600  shadow-sm flex items-center gap-3 rounded-md ">
                    <svg className="w-12 h-12 bg-blue-600 rounded-full p-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div>
                    <h1 className="font-bold text-blue-800">{patient?.user?.name}</h1>
                    <span className="text-sm text-gray-600">{patient?.user?.email}</span>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="bg-white p-2 flex justify-between items-center rounded border border-slate-200 shadow-sm">
                    <h2 className="font-semibold">All Appointments</h2>
                    <span className="bg-blue-600 rounded-full px-2 text-white">{appointments?.length}</span>
                </div>

                <div className="space-y-3">
                    {
                        appointments?.length === 0 ? (
                            <div className="text-gray-600 text-center">No Appointments Found</div>
                        ) : (
                            appointments?.map(appointment => (
                                <div key={appointment.id}
                                className={`flex items-center bg-white justify-between p-2 rounded-lg shadow border border-slate-200
                                 ${appointment.status === 'concluded'? 'border-l-4 rounded-r border-l-green-600' :
                                    appointment.status === 'denied'? 'border-l-4 rounded-r border-l-red-600' :
                                    appointment.status === 'confirmed'? 'border-l-4 rounded-r border-l-blue-600' :
                                    appointment.status === 'pending'? 'border-l-4 rounded-r border-l-orange-600' : ''
                                 }`}>
                                    <label htmlFor="" className="text-center">
                                        <p className="text-sm text-gray-700">Date</p>
                                        <p className="font-semibold">{appointment?.data}</p>
                                    </label>
                                    <label htmlFor="" className="text-center">
                                        <p className="text-sm text-gray-700">Time</p>
                                        <p className="font-semibold">{appointment?.houra}</p>
                                    </label>
                                    <label htmlFor="" className="text-center">
                                        <p className="text-sm text-gray-700">Doctor</p>
                                        <p className="font-semibold">{appointment?.schedule?.doctor?.user?.name}</p>
                                    </label>
                                    <label htmlFor="" className="text-center">
                                        <p className="text-sm text-gray-700">Status</p>
                                        <p className={`${appointment.status === 'concluded'? 'font-bold text-green-600' :
                                    appointment.status === 'denied'? 'font-bold text-red-600' :
                                    appointment.status === 'confirmed'? 'font-bold text-blue-600' :
                                    appointment.status === 'pending'? 'font-bold text-orange-600' : ''
                                 }`}>{appointment?.status}</p>
                                    </label>
                                    <label htmlFor="" className="text-center">
                                        <p className="text-sm text-gray-700">Day</p>
                                        <p className="font-semibold text-violet-600">{day[appointment?.schedule?.day_weeks]}</p>
                                    </label>
                                    <label htmlFor="" className="space-x-2">
                                        <Link to={`/dashboard/appointment/details/${appointment.id}`} className="bg-blue-600 text-white rounded px-2 py-1">View</Link>
                                        <button className="bg-red-600 text-white rounded px-2 py-1">Delete</button>
                                    </label>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </main>
    )
}