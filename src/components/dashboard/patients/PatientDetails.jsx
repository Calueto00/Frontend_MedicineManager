import api from "../../../api/axios";
import { useState, useEffect } from "react";

export default function PatientDetails({ id }) {

    const [patient, setPatient] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get(`/patient/${id}`);
            setPatient(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    return (
        <main className="p-2">

            <div className="flex gap-6">
                {/**general information and appointments */}
                <div className=" flex-1 space-y-3">
                    <div className="bg-white rounded-lg text-base shadow-md border border-slate-300 p-1">
                        <div className="flex items-center justify-between border-b border-slate-300 p-2">
                            <h1>{patient?.user?.name ?? 'no name'}</h1>
                            <div className="space-x-3">
                                <span role="img" aria-label="phone">📞</span>
                                <span>+244 {patient?.phone}</span>
                            </div>
                        </div>
                        {/**patient Information */}
                        <div className="p-2 grid grid-cols-2 gap-6">
                            <label htmlFor="">
                                <span className="text-gray-600 text-sm">Email</span>
                                <p className="font-semibold">{patient?.user?.email ?? 'No Email'}</p>
                            </label>
                            <label htmlFor="">
                                <span className="text-gray-600 text-sm">Register</span>
                                <p className="font-semibold">{patient?.created_at ?? 'No Date'}</p>
                            </label>
                            <label htmlFor="">
                                <span className="text-gray-600 text-sm">Birth</span>
                                <p className="font-semibold">{patient?.birth ?? 'No Date'}</p>
                            </label>
                            <label htmlFor="">

                                <span className="text-gray-600 text-sm">Address</span>
                                <p className="font-semibold">{patient?.address ?? 'No Date'}</p>
                            </label>
                        </div>
                    </div>

                    {/**appointment information */}
                    <div className="bg-white rounded-lg space-y-3 shadow-md border border-slate-300 p-2">
                        <div className="flex items-center justify-between bg">
                            <div className="space-x-3">
                                <button className="bg-blue-900 text-white rounded-md p-1">Upcoming</button>
                                <button className="border border-slate-300 shadow-md rounded-md bg-slate-300 p-1 text-gray-600">Post Appointment</button>
                            </div>
                            <button className="font-semibold text-blue-900 p-1">
                                Appointment
                            </button>
                        </div>
                            {/**appointment registers */}
                        <div>
                            {patient?.appointments && patient.appointments.length > 0 ? (
                                patient.appointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="bg-slate-200 rounded-md flex p-1 justify-between items-center"
                                    >
                                        <label className="text-sm">
                                            <span className="text-xs text-gray-700">Date</span>
                                            <p className="font-semibold">{appointment?.date_houra ? new Date(appointment.date_houra).toLocaleString() : '-'}</p>
                                        </label>
                                        <label className="text-sm">
                                            <span className="text-xs text-gray-700">Doctor</span>
                                            <p className="font-semibold">{appointment?.doctor?.user?.name ?? '-'}</p>
                                        </label>
                                        <label className="text-sm">
                                            <span className="text-xs text-gray-700">Especiality</span>
                                            <p className="font-semibold">{appointment?.doctor?.especiality ?? '-'}</p>
                                        </label>
                                        <label className="text-sm">
                                            <p className={appointment?.status === 'agendado' || appointment?.status === 'confirmado'
                                                ? 'font-bold text-green-600 p-2 rounded-md bg-green-200'
                                                : 'font-bold text-orange-600 p-2 rounded-md bg-orange-200'}>{appointment?.status ?? '-'}</p>
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Nenhum agendamento encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/**information of archives and medical records */}
                <div className="border w-100">
                    appointment
                </div>
            </div>
        </main>
    );
}