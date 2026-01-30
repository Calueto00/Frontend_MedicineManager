import { useState, useEffect } from "react"
import api from "../api/axios";
import AppointmentCalendar from "../components/dashboard/appointments/AppointmetCalendar";
import { Link } from "react-router-dom";

// SVG Icons
const Icons = {
    menu: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    search: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
};

export default function AppointmentPage(){
    const [isOpen, setIsOpen] = useState(true);
    const [appointments, setAppointment] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointStatus, setAppointStatus] = useState([]);
    

    const fetchData = async () => {
        try {
           setLoading(true);
           const [doctorResponse, appointmentResponse] =  await Promise.all([
            api.get('/doctors'), api.get('/appointments')
           ]);
           setDoctors(doctorResponse.data);
           setAppointment(appointmentResponse.data);
           setAppointStatus(appointmentResponse.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Search appointments by patient name
    useEffect(() => {
        if(name.length === 0){
            fetchData();
            return;
        }
        const search = async () => {
            try {
                const res = await api.get(`/appointment/search/${name}`);
                setAppointment(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        search();
    },[name])
    
    // Fetch all appointments
    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <main className="relative bg-gray-50 min-h-screen">
            
            <div className="flex">
                {/* Sidebar */}
                <aside className={`${isOpen ? 'w-60' : 'w-17'}
                    h-screen bg-white shadow-lg duration-300 transition-all ease-in-out space-y-2 border-r-1 border-blue-600`}>
                    
                    {/* Sidebar Header */}
                   <div className="px-4 py-6 border-b-2 border-blue-100 shadow-sm flex items-center justify-between bg-blue-50">
                        { isOpen && (
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg text-blue-900">Filters</h3>
                                </div>
                            )}
                        <button onClick={()=> setIsOpen(!isOpen)}
                                className="cursor-pointer bg-blue-200 hover:bg-blue-300 p-2 rounded-lg transition"
                                title={isOpen ? 'Close sidebar' : 'Open sidebar'}>
                            {Icons.menu}
                        </button>
                   </div>

                   {/* Status Section */}
                   <div className="p-4 border-b border-gray-200">
                        {isOpen ? (
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Filter by Status</h3>
                                <div className="ml-2 space-y-2 text-sm">
                                    <div 
                                        onClick={()=> fetchData()}
                                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 bg-gray-200 text-gray-700 font-medium transition flex items-center justify-between">
                                        <span>All Status</span>
                                        <span className="bg-gray-400 text-white px-2 rounded-full">{appointStatus?.length}</span>
                                    </div>
                                    <div 
                                    onClick={()=> setAppointment(appointStatus.filter(a => a.status === 'pending'))}
                                    className="flex items-center justify-between p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition border border-orange-200">
                                        <span className="text-gray-700 font-medium text-sm">Pending</span>
                                        <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                            { appointStatus.filter((as) => as.status === 'pending').length }
                                        </span>
                                    </div>

                                    {/* Confirmed Status */}
                                    <div 
                                    onClick={()=> setAppointment(appointStatus.filter(a => a.status === 'confirmed'))}
                                    className="cursor-pointer flex items-center justify-between p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition border border-blue-200">
                                        <span className="text-gray-700 font-medium text-sm">Confirmed</span>
                                        <span className="bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                            { appointStatus.filter((as) => as.status === 'confirmed').length}
                                        </span>
                                    </div>
                                    {/* Concluded Status */}
                                    <div 
                                    onClick={()=> setAppointment(appointStatus.filter(a => a.status === 'concluded'))}
                                    className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition border border-green-200">
                                        <span className="text-gray-700 font-medium text-sm">Concluded</span>
                                        <span className="bg-green-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                            { appointStatus.filter((as) => as.status === 'concluded').length }
                                        </span>
                                    </div>
                                    {/* denied Status */}
                                    <div 
                                    onClick={()=> setAppointment(appointStatus.filter(a => a.status === 'denied'))}
                                    className="flex items-center justify-between p-2 rounded-lg bg-red-50 hover:bg-red-100 transition border border-red-200">
                                        <span className="text-gray-700 font-medium text-sm">Canceled</span>
                                        <span className="bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                            { appointStatus.filter((as) => as.status === 'denied').length }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 flex flex-col items-center justify-center">
                                <div className="bg-orange-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                                    { appointStatus.filter((as) => as.status === 'pending').length }
                                </div>
                                <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                                    { appointStatus.filter((as) => as.status === 'confirmed').length || 0 }
                                </div>
                                <div className="bg-green-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                                    { appointStatus.filter((as) => as.status === 'concluded').length }
                                </div>
                                <div className="bg-red-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                                    { appointStatus.filter((as) => as.status === 'denied').length }
                                </div>
                            </div>
                        )}
                   </div>

                   {/* Doctor List */}
                   <div>
                    {
                        isOpen ? (
                            <div className="p-4 space-y-3 border-t-2 border-gray-200">
                                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Doctor List</h3>
                                <ul className="space-y-2">
                                    {
                                        doctors?.map(doctor =>(
                                            <li key={doctor.id} 
                                            onClick={()=> setDoctorId(doctor.id)}
                                            className="cursor-pointer bg-slate-50 flex flex-col p-2 rounded-lg border-l-4 shadow-sm border-l-blue-600 hover:bg-blue-50 hover:border-blue-400 transition">
                                                <span className="font-semibold text-gray-800 text-sm">{doctor?.user?.name}</span>
                                                <span className="text-xs text-gray-600 mt-0.5">{doctor?.especiality}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : (
                            <div className="p-4 text-center border-t border-gray-200">
                                
                                <div className="text-2xl">👨‍⚕️</div>
                            </div>
                        )
                    }
                   </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    
                    <div className="flex gap-6">
                        <div className="flex-1 space-y-4">
                             <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
                             
                             {/* Search Bar */}
                                <form className="flex bg-white p-3 rounded-lg shadow-sm border border-gray-300 focus-within:border-blue-500 focus-within:shadow-md transition"
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

                            {/* Appointments List */}
                            <div className=" space-y-3">
                                {
                                    loading ? (
                                        <div className="p-8 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                            <p className="text-gray-600 text-sm">Loading appointments...</p>
                                        </div>
                                    ) : appointments?.length === 0 ? (
                                        <div className="p-8 text-gray-900 text-center text-sm">No appointments found</div>
                                    ) : (appointments?.map((appoint) =>(
                                        <Link to={`/dashboard/appointment/details/${appoint.id}`} 
                                            key={appoint.id} 
                                            className={`flex bg-white items-center p-2 shadow-sm rounded-md ${
                                                appoint.status === 'pending'? 'border-l-4 border-l-orange-600' :
                                                appoint.status === 'concluded'? 'border-l-4 border-l-green-600' :
                                                appoint.status === 'confirmed'? 'border-l-4 border-l-blue-600' :
                                                appoint.status === 'denied'? 'border-l-4 border-l-red-600' : ''
                                            }`}>
                                                <div className="flex flex-col space-y-1.5 flex-1 bg-white">
                                                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition">
                                                        {appoint?.patient?.user?.name}
                                                    </h3>
                                                    <span className="text-xs text-gray-600 group-hover:text-gray-700">
                                                        {appoint?.patient?.user?.email}
                                                    </span>
                                                    <div>
                                                        {appoint?.status === 'pending' && 
                                                        <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                                                            Pending
                                                        </span>}
                                                        {appoint?.status === 'confirmed' && 
                                                        <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                            Confirmed
                                                        </span>}

                                                        {appoint?.status === 'denied' && 
                                                        <span className="inline-block text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                                            Canceled
                                                        </span>}

                                                        {appoint?.status === 'concluded' && 
                                                        <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                            Concluded
                                                        </span>}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-800 text-right flex-shrink-0">
                                                    <p className="font-semibold">{appoint.data}</p>
                                                    <p className="text-gray-600 text-xs">{appoint.houra}h</p>
                                                </div>
                                        </Link>
                                    )))
                                }
                            </div>
                        </div>
                        <div className="w-96">
                            <AppointmentCalendar doctorId={doctorId}/>
                        </div>
                    </div>
                </div>
            </div>
                               
        </main>
    )
}