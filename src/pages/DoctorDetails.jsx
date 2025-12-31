import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import AppointmentList from "../components/dashboard/doctors/AppointmentList";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoctorDetails() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState([]);
    const [appointments, setAppointments] = useState([])
    const fetchData = async () => {
        try {
            await api.get(`/doctor/${id}`).then((response) => {
                setDoctor(response.data);

                setAppointments(response.data.appointments);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) fetchData();
    });
    return (
        <>
            <div className="bg-white p-2 shadow-md">
                <h1>Doctor Details</h1>
            </div>
            <section className="flex p-4 gap-2">

                <div className=" flex-1  space-y-3">
                    {/** general information */}
                    <div className="bg-white rounded-lg shadow-md space-y-3">
                        <div className="flex items-center justify-between p-2 border-b border-slate-200">
                            <h2>{doctor?.user?.name}</h2>
                            <span className="text-gray-600">Role - {doctor?.user?.role}</span>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <label htmlFor="" className="space-y-2">
                                <h3 className="text-gray-600 text-sm">Email</h3>
                                <span>{doctor?.user?.email}</span>
                            </label>
                            <label htmlFor="" className="space-y-2">
                                <h3 className="text-gray-600 text-sm">Crm</h3>
                                <span>{doctor?.crm}</span>
                            </label>
                            <label htmlFor="" className="space-y-2">
                                <h3 className="text-gray-600 text-sm">Especiality</h3>
                                <span>{doctor?.especiality}</span>
                            </label>
                        </div>
                        {/**doctor biografia */}
                        <div className="border-t border-slate-200 p-2 space-y-3">
                            <h2 className="text-sm text-gray-600">Biografy</h2>
                            <p>{doctor.bio}</p>
                        </div>
                    </div>

                    {/**doctor list appointment */}
                    <AppointmentList appointments={appointments} />

                </div>
                <div className="w-80">
                    <div className="bg-white rounded-lg p-2 shadow-md space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Doctor Statistics</h3>
                        </div>
                        {appointments && appointments.length > 0 ? (
                            <div className="h-80 flex items-center justify-center">
                                <Pie
                                    data={{
                                        labels: [
                                            `Total Appointments (${appointments.length})`,
                                            `Confirmed (${appointments.filter(a => a.status === 'confirmado').length})`,
                                            `Scheduled (${appointments.filter(a => a.status === 'agendado').length})`,
                                            `Completed (${appointments.filter(a => a.status === 'completado').length})`
                                        ],
                                        datasets: [
                                            {
                                                label: 'Appointment Status',
                                                data: [
                                                    appointments.length,
                                                    appointments.filter(a => a.status === 'concluido').length,
                                                    appointments.filter(a => a.status === 'agendado').length,
                                                    appointments.filter(a => a.status === 'cancelado').length
                                                ],
                                                backgroundColor: [
                                                    '#3B82F6',
                                                    '#10B981',
                                                    '#F59E0B',
                                                    '#8B5CF6'
                                                ],
                                                borderColor: [
                                                    '#1E40AF',
                                                    '#047857',
                                                    '#D97706',
                                                    '#6D28D9'
                                                ],
                                                borderWidth: 1
                                            }
                                        ]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    font: { size: 11 },
                                                    padding: 10
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-8">Nenhum agendamento encontrado</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}