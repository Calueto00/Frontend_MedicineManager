
export default function AppointmentTable({appointments}){
    return (
        <div className="border space-y-2 flex-1 border-slate-300 bg-white rounded-lg shadow-md p-2">
                        <div className=" font-semibold flex items-center justify-between">
                            <h1 className="text-gray-500">Appointment Management</h1>
                            <button className="text-sm text-blue-700">See All</button>
                        </div>
                        
                        <table className="min-w-full m-auto text-sm text-center">
                            <thead>
                                <tr className="bg-slate-300 text-gray-600">
                                    <th className="p-1">ID</th>
                                    <th>Patient</th>
                                    <th>Date/Time</th>
                                    <th>Doctor</th>
                                    <th>Especiality</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map((appointment)=>(
                                        <tr className="border-b border-slate-300">
                                            <td className="p-1" key={appointment.id}>{appointment.id}</td>
                                            <td key={appointment.id}>{appointment.patient.user.name}</td>
                                            <td key={appointment.id}>{appointment.date_houra}</td>
                                            <td key={appointment.id}>{appointment.doctor.user.name}</td>
                                            <td key={appointment.id}>{appointment.doctor.especiality}</td>
                                            <td key={appointment.id}>{appointment.status}</td>
                                            <td>Details</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
    )
}