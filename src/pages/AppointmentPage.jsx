import { useState, useEffect } from "react"
import api from "../api/axios";
import AppointmentCalendar from "../components/dashboard/appointments/AppointmetCalendar";


export default function AppointmentPage(){
    const [isOpen, setIsOpen] = useState(true);
    const [appointments, setAppointment] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    

    const fetchData = async () => {
        try {
           const [doctorResponse, appointmentResponse] =  await Promise.all([
            api.get('/doctors'), api.get('/appointments')
           ]);
           setDoctors(doctorResponse.data);
           setAppointment(appointmentResponse.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <main>
            
            <div className="flex">
                {/**status sidebar */}
                <aside className={`${isOpen ? 'w-80' : 'w-17'}
                    h-screen bg-white shadow-sm duration-300 transition-all ease-in-out space-y-2`}>
                    {/**sidebar header */}
                   <div className="px-4 py-6 border-b border-slate-200 shadow-sm flex items-center justify-between">
                        { isOpen && (
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">Management</h3>
                                </div>
                            )}
                        <button onClick={()=> setIsOpen(!isOpen)}
                                className="cursor-pointer bg-slate-200 p-2 rounded-full"
                                title={isOpen ? 'close' : 'open'}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                   </div>

                   {/**status */}
                   <div className="p-1">
                        {isOpen ? (
                            <div>
                                <h3 className="text-lg font-semibold">Status</h3>
                                <div className="ml-3 space-y-1 text-sm">
                                    <div className="flex items-center justify-between  border-b border-slate-300  p-1 rounded-lg">
                                        <span>Pending</span>
                                        <span className="border px-2 rounded-full bg-orange-600/90 text-white">
                                            { appointments.filter((as) => as.status === 'pending').length }
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between  border-b border-slate-300 p-1 rounded-lg">
                                        <span>Confirmed</span>
                                        <span className="border px-2 rounded-full bg-blue-600/90 text-white">
                                            { appointments.filter((as) => as.status === 'confirmed').length}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between  border-b border-slate-300 p-1 rounded-lg">
                                        <span>Concluded</span>
                                        <span className="border px-2 rounded-full bg-green-600/90 text-white">
                                            { appointments.filter((as) => as.status === 'concluded').length }
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between  border-b border-slate-300 p-1 rounded-lg">
                                        <span>Canceled</span>
                                        <span className="border px-2 rounded-full bg-red-600/90 text-white">
                                            { appointments.filter((as) => as.status === 'denied').length }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <h3>Status</h3>
                                <div className="flex space-y-3 flex-col items-center justify-center">
                                    <div className="bg-green-600/90 text-white rounded-full px-3 py-1">
                                        { appointments.filter((as) => as.status === 'agendado').length }
                                    </div>
                                    <div className="bg-blue-600/90 text-white rounded-full px-3 py-1">
                                        { appointments.filter((as) => as.status === 'confirmado').length || 0 }
                                    </div>
                                    <div className="bg-red-600/90 text-white rounded-full px-3 py-1">2</div>
                                </div>
                            </div>
                        )}
                   </div>

                   {/**appointment search */}
                   <div>
                        {
                            isOpen ? (
                                <div className="p-2 space-y-2">
                                    <h3 className="font-semibold">Appointment </h3>

                                    <form action="" className="border rounded-md border border-slate-300 shadow-sm bg-slate-100">
                                        <input type="text"
                                            placeholder="digite date..."
                                            className="outline-none p-2" />
                                        <button cla>Search</button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-semibold p-2">Search</h3>
                                    <div>logo</div>
                                </div>
                            )
                        }
                   </div>

                   {/**doctor list */}
                   <div>
                    {
                        isOpen ? (
                            <div className="p-1 space-y-2">
                                <h3 className="font-semibold">Doctor List</h3>
                                <ul className="space-y-1">
                                    {
                                        doctors?.map(doctor =>(
                                            <button key={doctor.id} 
                                            onClick={()=> setDoctorId(doctor.id)}
                                            className="ml-4 cursor-pointer flex flex-col border-b border-slate-300 p-1">
                                                <span className="font-semibold">{doctor?.user?.name}</span>
                                                <span className="text-sm text-gray-600">{doctor?.especiality}</span>
                                            </button>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <h3 className="p-2 font-semibold">Doctor</h3>
                                <div>logo</div>
                            </div>
                        )
                    }
                   </div>
                </aside>

                {/**main content of page */}
                <div className=" flex-1 p-4">
                    <div>
                        <form action="">
                            <input type="text" />
                            <button>search</button>
                        </form>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-3">
                            <h2 className="font-semibold p-2">Appointments</h2>

                            <div className="bg-white shadow rounded-md border-slate-200 p-2">
                                {
                                    appointments?.length === 0 ? (
                                        <div title="click on" className="p-2 text-gray-600 text-center">No Appointment done...</div>
                                    ) : (appointments?.map((appoint, index) =>(
                                        <div key={index} className="border-b-2 delay-150 transition-all ease-in-out cursor-pointer rounded-lg
                                        border-gray-200 p-2 hover:bg-slate-300 flex items-center justify-between">
                                                <div className="flex flex-col space-y-1">
                                                    <h3 className="text-sm font-semibold">
                                                        {appoint?.patient?.user?.name}
                                                    </h3>
                                                    <span className="text-sm text-gray-600">
                                                        {appoint?.patient?.user?.email}
                                                    </span>
                                                    {appoint?.status === 'pending' && 
                                                    <button 
                                                    className="text-sm border-2 border-orange-600 px-3 py-1 w-26
                                                    bg-orange-400 text-white text-center rounded-md">Pending</button>}
                                                    {appoint?.status === 'confirmed' && 
                                                    <button 
                                                    className="text-sm border-2 border-blue-600 px-3 py-1 w-26
                                                    bg-blue-400 text-white text-center rounded-md">Confirmed</button>}

                                                    {appoint?.status === 'denied' && 
                                                    <button 
                                                    className="text-sm border-2 border-red-600 px-3 py-1 w-26
                                                    bg-red-400 text-white text-center rounded-md">Canceled</button>}

                                                    {appoint?.status === 'concluded' && 
                                                    <button 
                                                    className="text-sm border-2 border-green-600 px-3 py-1 w-26
                                                    bg-green-400 text-white text-center rounded-md">Concluded</button>}
                                                </div>
                                                <div className="text-sm text-gray-800">
                                                    <p>{appoint.data}</p>
                                                    <p>{appoint.houra} h</p>
                                                </div>
                                        </div>
                                    )))
                                }
                            </div>
                        </div>
                        <div className="w-90">
                            <AppointmentCalendar doctorId={doctorId}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}