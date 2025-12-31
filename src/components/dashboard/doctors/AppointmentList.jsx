

export default function AppointmentList({appointments}){
    return (
        <section className="bg-white p-2 rounded-lg space-y-3 shadow-md">
            <div className="flex items-center bg-blue-800 rounded text-white justify-between border-b border-slate-300 p-2">
                <span className="text-sm font-semibold">Appointment List</span>
                <span className="text-sm">Total - {appointments.length}</span>
            </div>
            
                    {
                        appointments.length > 0 ? (
                            <table className="min-w-full">
                                <thead className="text-sm text-gray-600">
                                    <tr>
                                        <th>Pacient</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appointments.map((appointment)=>(
                                            <tr key={appointment.id} className="text-center border-t-4 border-white bg-slate-200">
                                                <td className="p-1">{appointment?.patient?.user.name}</td>
                                                <td>{appointment.date_houra}</td>
                                                <td>{appointment.status}</td>
                                                <td>detail</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (<div className="text-center text-gray-600 p-2">No registers found</div>)
                    }
                
        </section>
    )
}