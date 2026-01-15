import { Link } from "react-router-dom"
export default function AppointmentList({appointments}){
    
    return (
        <section className="bg-white p-2 rounded-lg space-y-3 shadow-md">
            <div className="flex items-center bg-blue-800 rounded text-white justify-between border-b border-slate-300 p-2">
                <span className="text-sm font-semibold">Appointment List</span>
                <span className="text-sm">Total - {appointments?.length}</span>
            </div>
            
                    {
                        appointments?.length > 0 ? (
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
                                        appointments.map((appointments)=>(
                                            <tr key={appointments.id} className="text-center border-t-4 border-white bg-slate-200">
                                                <td className="p-1">{appointments?.patient?.user.name}</td>
                                                <td>{appointments.data}</td>
                                                <td>
                                                    {appointments.status === 'pending' 
                                                    && <span 
                                                    className="bg-orange-600 p-1 rounded text-white font-semibold">
                                                        {appointments.status}</span>}
                                                    {appointments.status === 'denied' 
                                                    && <span 
                                                    className="bg-red-600 p-1 rounded text-white font-semibold">
                                                        canceled</span>}
                                                    
                                                    {appointments.status === 'confirmed' 
                                                    && <span 
                                                    className="bg-blue-600 p-1 rounded text-white font-semibold">
                                                        {appointments.status}</span>}
                                                    
                                                    {appointments.status === 'concluded' 
                                                    && <span 
                                                    className="bg-green-500 p-1 rounded text-white font-semibold">
                                                        {appointments.status}</span>}
                                                </td>
                                                <td>
                                                    <Link className="font-semibold text-white bg-blue-800 text-sm px-2 py-1 rounded" to={`/dashboard/appointment/${appointments.id}`}>See</Link>
                                                </td>
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