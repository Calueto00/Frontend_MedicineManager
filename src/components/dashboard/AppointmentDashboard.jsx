import { Link } from "react-router-dom"
export default function AppointmentDashboard({appointments}){
    return (
        <div className="border space-y-2 flex-1 border-slate-300 bg-white rounded-lg shadow-md p-2">
                <div className=" font-semibold flex items-center justify-between">
                    <h1 className="text-gray-500">Appointment Management</h1>
                    <Link to={'/dashboard/appointments'} className="text-sm text-blue-700">See All</Link>
                </div>
                        
                <table className="min-w-full m-auto text-sm text-center">
                    <thead>
                        <tr className="bg-slate-300 text-gray-600">
                            <th className="p-1">Patient</th>
                            <th>Date</th>
                            <th>Houra</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody className="p-1">
                        {
                            appointments.map((appointment)=>(
                                <tr className="border-b border-slate-300" key={appointment.id}>
                                    <td className="p-2" >{appointment.patient.user.name}</td>
                                    <td >{appointment.data}</td>
                                    <td >{appointment.houra}</td>
                                    <td >{appointment.schedule?.doctor.user.name}</td>
                                    <td>
                                        {appointment.status === 'pending' && 
                                        <button className="bg-orange-600 text-white rounded-md p-1"> Pending</button>}
                                        {appointment.status === 'confirmed' && 
                                        <button className="bg-blue-700 text-white rounded-md p-1"> Confirmed</button>}
                                        {appointment.status === 'concluded' && 
                                        <button className="bg-green-600 text-white rounded-md p-1"> Concluded</button>}
                                        {appointment.status === 'denied' && 
                                        <button className="bg-red-600 text-white rounded-md p-1"> Canceled</button>}
                                    </td>
                                    <td className="">
                                        <Link to={`/dashboard/appointment/${appointment.id}`} 
                                        className="bg-blue-600 p-1 text-white rounded-md">Details</Link>
                                    </td>
                                </tr>
                                    ))
                        }
                    </tbody>
                </table>
        </div>
    )
}