import BackButton from "../components/buttons/BackButton";
import api from "../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InvoiceButton from "../components/buttons/InvoiceButton";
import InvoiceModal from "../components/dashboard/appointments/InvoiceModal";

const day = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
};

// Ícones SVG
const Icons = {
    calendar: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    clock: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    user: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    mail: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    phone: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    location: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    badge: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    print: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2zm-6-4h.01M12 8h.01" /></svg>,
    trash: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

export default function AppointmentDetails(){

    const {id} = useParams();
    const [appointment, setAppointment] = useState({});
    const [doctor, setDoctor] = useState({});
    const [schedule, setSchedule] = useState({});
    const [patient, setPatient] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedAppointment, setSelectedApoointment] = useState(null);
    const navigate = useNavigate();

    // Getting data
    useEffect(()=>{
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/appointment/${id}`);
                setAppointment(res.data);
                setPatient(res.data?.patient || {});
                setSchedule(res.data?.schedule || {});
                setDoctor(res.data?.schedule?.doctor || {});
                setError(null);
            } catch (err) {
                setError('Error loading appointment details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[id]);

   

    const reloadAppointment = async () =>{
        try {
            const response = await api.get(`/appointment/${id}`)
            setAppointment(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAppoint = async (id) => {
        if(!confirm) return ;
        await api.delete(`/appointment/${id}`).then((res) =>{
            toast.success(res.data);
            navigate(-1);
        }).catch(err => toast.error(err));
    }
    
    if (loading) {
        return (
            <main className="p-6">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Loading appointment details...</p>
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
        <main className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6 border-l-4 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-100 border-l-blue-600">
                <BackButton></BackButton>
                <div className="flex gap-3">
                    {
                        appointment.status === 'concluded' && !appointment.invoice && (
                            <>
                            <button
                            onClick={()=> {
                                setSelectedApoointment(appointment);
                                setShowInvoiceModal(true);}}
                            className="border cursor-pointer hover:bg-blue-600 hover:text-white transition delay-150 ease-in-out border-slate-200 rounded shadow-sm px-4 border-l-4 border-l-blue-600 rounded-l-md"
                            >Faturar</button>

                            <InvoiceModal 
                                appointment={selectedAppointment}
                                isOpen={showInvoiceModal}
                                onClose={()=> {
                                    setShowInvoiceModal(false);
                                    setSelectedApoointment(null);
                                }                             
                                }
                                onInvoiceCreated={() => {
                                    setShowInvoiceModal(false);
                                    setSelectedApoointment(null);
                                    reloadAppointment();
                                }}
                            />
                            </>
                        )
                    }
                    
                    {/** just show when status is concluded and invoice !null */}
                    {
                        appointment.invoice && (
                           <InvoiceButton appointmentId={appointment.id} invoiceId={appointment.invoice?.id} />
                        )
                    }
                    <button onClick={() => deleteAppoint(appointment.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition font-medium">
                        {Icons.trash}
                        Delete
                    </button>
                </div>
            </div>

            {/* Title Section */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-300 border-l-4 border-l-green-600">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Appointment Details</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {Icons.calendar} Created on {new Date(appointment?.created_at).toLocaleDateString('en-US')}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className={`inline-flex items-center gap-2 font-semibold text-white px-4 py-2 rounded-lg ${
                            appointment.status === 'pending'? 'bg-orange-500':
                            appointment.status === 'confirmed'? 'bg-blue-600':
                            appointment.status === 'concluded'? 'bg-green-600':
                            appointment.status === 'denied'? 'bg-red-600': 'bg-gray-500'
                        }`}>
                            {Icons.badge}
                            {appointment?.status?.charAt(0).toUpperCase() + appointment?.status?.slice(1)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Appointment Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            {Icons.calendar}
                        </div>
                        <h3 className="font-bold text-gray-800">Appointment Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</p>
                            <p className="text-gray-800 font-medium mt-1">{appointment?.data}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                {Icons.clock} Time
                            </p>
                            <p className="text-gray-800 font-medium mt-1">{appointment?.houra}h</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Member Since</p>
                            <p className="text-gray-800 font-medium mt-1">{new Date(patient?.created_at).toLocaleDateString('en-US')}</p>
                        </div>
                    </div>
                </div>

                {/* Patient Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            {Icons.user}
                        </div>
                        <h3 className="font-bold text-gray-800">Patient Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</p>
                            <p className="text-gray-800 font-medium mt-1">{patient?.user?.name || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                {Icons.mail} Email
                            </p>
                            <p className="text-gray-800 font-medium mt-1 text-sm break-all">{patient?.user?.email || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                {Icons.phone} Phone
                            </p>
                            <p className="text-gray-800 font-medium mt-1">+244 {patient?.phone || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                {Icons.location} Address
                            </p>
                            <p className="text-gray-800 font-medium mt-1 text-sm">{patient?.address || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Schedule Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            {Icons.clock}
                        </div>
                        <h3 className="font-bold text-gray-800">Appointment Schedule</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Day of Week</p>
                            <div className="mt-1">
                                <span className="inline-block bg-purple-100 text-purple-700 font-semibold text-sm px-3 py-1 rounded-full">
                                    {day[schedule?.day_weeks] || '-'}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Starts at</p>
                            <p className="text-gray-800 font-medium mt-1">{schedule?.start_time || '-'}h</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ends at</p>
                            <p className="text-gray-800 font-medium mt-1">{schedule?.end_time || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Availability</p>
                            <div className="mt-1">
                                <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-3 py-1 rounded-full">
                                    ✓ Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor Information Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        {Icons.user}
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">Responsible Doctor</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Doctor Basic Info */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-5 border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 mb-4">Basic Information</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.user}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">NAME</p>
                                    <p className="text-gray-800 font-medium">{doctor?.user?.name || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.mail}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">EMAIL</p>
                                    <p className="text-gray-800 font-medium text-sm break-all">{doctor?.user?.email || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.badge}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">MEMBER SINCE</p>
                                    <p className="text-gray-800 font-medium">{new Date(doctor?.created_at).toLocaleDateString('en-US')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Professional Info */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-5 border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 mb-4">Professional Information</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.badge}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">CLASS</p>
                                    <p className="text-gray-800 font-medium">{doctor?.user?.role || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.badge}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">SPECIALTY</p>
                                    <p className="text-gray-800 font-medium">{doctor?.especiality || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-600 mt-1">{Icons.badge}</span>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold">CRM</p>
                                    <p className="text-gray-800 font-medium">{doctor?.crm || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="font-bold text-gray-800">Documents and Agreements</h3>
                </div>
                <p className="text-gray-600 text-center py-8">No documents attached yet</p>
            </div>
        </main>
    )
}