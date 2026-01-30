import { useEffect, useState, useTransition } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import AppointmentList from "../components/dashboard/doctors/AppointmentList";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const day = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
};

// SVG Icons
const Icons = {
    user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    mail: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    badge: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function DoctorDetails() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [schedules, setSchedules] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/doctor/${id}`);
            setDoctor(response.data.doctor || {});
            setSchedules(response.data?.doctor?.schedules || []);
            setAppointments(response.data?.doctor?.appointments || []);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error loading doctor details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

   
    if (loading) {
        return (
            <main className="p-6">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Loading doctor details...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-sm border-b border-blue-200">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full text-white shadow-md">
                        {Icons.user}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-blue-900">{doctor?.user?.name}</h1>
                        <p className="text-gray-600 text-sm">Specialty: <span className="font-semibold text-blue-600">{doctor?.especiality || '-'}</span></p>
                    </div>
                </div>
            </div>

            <section className="flex p-3 gap-4">

                <div className="flex-1 space-y-3">
                    {/* General Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-600">
                            <h2 className="text-base font-bold text-gray-800">Professional Information</h2>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                                    <p className="text-gray-800 font-medium mt-0.5 text-sm">{doctor?.user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg></span>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">CRM</p>
                                    <p className="text-gray-800 font-medium mt-0.5 text-sm">{doctor?.crm || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg></span>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Specialty</p>
                                    <p className="text-gray-800 font-medium mt-0.5 text-sm">{doctor?.especiality || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Biography */}
                        <div className="border-t border-gray-200 p-4 bg-blue-50 border-l-4 border-l-blue-500">
                            <h3 className="text-xs font-bold text-blue-900 mb-2 uppercase tracking-wide">Biography</h3>
                            <p className="text-gray-700 leading-relaxed text-sm">{doctor?.bio || 'No biography available'}</p>
                        </div>
                    </div>

                    {/* Appointments List */}
                    <AppointmentList appointments={appointments} />

                </div>

                {/* Doctor Statistics */}
                <div className="w-100 space-y-3">
                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-2 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-l-indigo-600">
                            <h3 className="text-base font-bold text-gray-800">Appointment Statistics</h3>
                        </div>
                        <div className="p-2">
                            {appointments && appointments.length > 0 ? (
                                <div className="h-60 flex items-center justify-center">
                                    <Pie
                                        data={{
                                            labels: [
                                                `Pending (${appointments.filter(a => a.status === 'pending').length})`,
                                                `Confirmed (${appointments.filter(a => a.status === 'confirmed').length})`,
                                                `Concluded (${appointments.filter(a => a.status === 'concluded').length})`,
                                                `Canceled (${appointments.filter(a => a.status === 'denied').length})`
                                            ],
                                            datasets: [
                                                {
                                                    label: 'Appointment Status',
                                                    data: [
                                                        appointments.filter(a => a.status === 'pending').length,
                                                        appointments.filter(a => a.status === 'confirmed').length,
                                                        appointments.filter(a => a.status === 'concluded').length,
                                                        appointments.filter(a => a.status === 'denied').length
                                                    ],
                                                    backgroundColor: [
                                                        '#f97316',
                                                        '#3b82f6',
                                                        '#22c55e',
                                                        '#ef4444'
                                                    ],
                                                    borderColor: [
                                                        '#f97316',
                                                        '#3b82f6',
                                                        '#22c55e',
                                                        '#ef4444'
                                                    ],
                                                    borderWidth: 2
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
                                                        font: { size: 10 },
                                                        padding: 9
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-8">No appointments found</p>
                            )}
                        </div>
                    </div>
                     
                    {/* Schedules List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-l-purple-600">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-gray-800">Doctor Schedules</h3>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                    {schedules?.length || 0}
                                </span>
                            </div>
                        </div>
                        <div className="p-3 space-y-2 h-45 overflow-y-auto">
                                {
                                    loading && 
                                    <div className="flex items-center justify-center p-4">
                                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    </div>
                                }

                                {
                                    !loading && schedules?.length === 0 ? (
                                    <div className="p-3 text-xs text-gray-500 text-center bg-gray-50 rounded-lg border border-gray-200">
                                        No schedules found</div>) : ( schedules?.map(schedule => (
                                            <div key={schedule.id} 
                                            className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition text-sm">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <div className="flex items-start gap-1.5 flex-1">
                                                        <span className="text-blue-600 mt-0.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold uppercase">Day</p>
                                                            <p className="text-gray-800 font-medium text-xs">{day[schedule.day_weeks]}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-1.5 flex-1">
                                                        <span className="text-blue-600 mt-0.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold uppercase">Start</p>
                                                            <p className="text-gray-800 font-medium text-xs">{schedule.start_time}h</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-1.5 flex-1">
                                                        <span className="text-blue-600 mt-0.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold uppercase">End</p>
                                                            <p className="text-gray-800 font-medium text-xs">{schedule.end_time}h</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ml-2">Active</span>
                                            </div>
                                        ))

                                    )
                                }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}