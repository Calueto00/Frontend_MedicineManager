import { Link } from "react-router-dom"
export default function AppointmentDashboard({appointments}){
    return (
        <div className="border space-y-2 flex-1 border-gray-200 bg-white rounded-lg shadow-md p-3 border-l-4 border-l-green-600">
                <div className="font-bold flex items-center justify-between pb-2 border-b border-gray-200">
                    <h1 className="text-gray-800">Appointment Management</h1>
                    <Link to={'/dashboard/appointments'} className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition">View All</Link>
                </div>
                        
                <table className="min-w-full m-auto text-sm text-center">
                    <thead>
                        <tr className="bg-green-50 text-gray-600 border-b-2 border-green-200">
                            <th className="p-2 text-left font-semibold">Patient</th>
                            <th className="p-2 text-left font-semibold">Date</th>
                            <th className="p-2 text-left font-semibold">Time</th>
                            <th className="p-2 text-left font-semibold">Status</th>
                            <th className="p-2 text-center font-semibold">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment)=>(
                                <tr className="border-b border-gray-100 hover:bg-gray-50 transition" key={appointment.id}>
                                    <td className="p-2 text-sm text-left">{appointment.patient.user.name}</td>
                                    <td className="p-2 text-sm text-left">{appointment.data}</td>
                                    <td className="p-2 text-sm text-left">{appointment.houra}</td>
                                    
                                    <td className="p-2">
                                        {appointment.status === 'pending' && 
                                        <span className="bg-orange-100 text-orange-700 rounded-full px-2.5 py-1 text-xs font-semibold">Pending</span>}
                                        {appointment.status === 'confirmed' && 
                                        <span className="bg-blue-100 text-blue-700 rounded-full px-2.5 py-1 text-xs font-semibold">Confirmed</span>}
                                        {appointment.status === 'concluded' && 
                                        <span className="bg-green-100 text-green-700 rounded-full px-2.5 py-1 text-xs font-semibold">Concluded</span>}
                                        {appointment.status === 'denied' && 
                                        <span className="bg-red-100 text-red-700 rounded-full px-2.5 py-1 text-xs font-semibold">Canceled</span>}
                                    </td>
                                    <td className="p-2">
                                        <Link to={`/dashboard/appointment/details/${appointment.id}`} 
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-white rounded-lg text-xs font-semibold transition">View</Link>
                                    </td>
                                </tr>
                                    ))
                        }
                    </tbody>
                </table>
        </div>
    )
}