import api from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PatientDetails() {

    const [patient, setPatient] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const {id} = useParams();
    const [btnAppoint, setBtnAppoint] = useState('upcoming');

    
    useEffect(()=>{
        const handleData = async () => {
            try {
                await api.get(`/patient/${id}`).then((response)=>{
                    setPatient(response.data);
                    setAppointments(response.data?.appointments);
                });
            } catch (error) {
                toast.error(error);
            }
        }

        handleData();
    });

    return (
        <>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm p-4 border-b border-blue-200">
                <h1 className="font-bold text-lg text-blue-900">Patient Details</h1>
            </div>
            <main className="p-2">
                <div className="flex gap-6">
                    {/**general information and appointments */}
                    <div className=" flex-1 space-y-3">
                        <div className="bg-white rounded-lg text-base shadow-md border border-gray-200 border-l-4 border-l-blue-600 p-3 space-y-3">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <h1 className="font-bold text-lg text-gray-800">{patient?.user?.name ?? 'No Name'}</h1>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l4.049 2.25a1 1 0 00.856.023l4.19-2.093a1 1 0 00.529-.769l.325-1.995A.999.999 0 0020 4H4a1 1 0 00-1 1z" /></svg>
                                    <span className="text-gray-700 font-medium">+244 {patient?.phone ?? '-'}</span>
                                </div>
                            </div>
                            {/**patient Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <label htmlFor="">
                                    <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Email</span>
                                    <p className="font-semibold text-sm text-gray-800 mt-1">{patient?.user?.email ?? 'No Email'}</p>
                                </label>
                                <label htmlFor="">
                                    <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Registered</span>
                                    <p className="font-semibold text-sm text-gray-800 mt-1">{patient?.created_at ?? 'No Date'}</p>
                                </label>
                                <label htmlFor="">
                                    <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Birth Date</span>
                                    <p className="font-semibold text-sm text-gray-800 mt-1">{patient?.birth ?? 'No Date'}</p>
                                </label>
                                <label htmlFor="">
                                    <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Address</span>
                                    <p className="font-semibold text-sm text-gray-800 mt-1">{patient?.address ?? 'No Address'}</p>
                                </label>
                            </div>
                        </div>

                        {/**appointment information */}
                        <div className="bg-white rounded-lg space-y-3 shadow-md border border-gray-200 border-l-4 border-l-green-600 p-3">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div className="flex gap-2">
                                    <button onClick={() => setBtnAppoint('upcoming')}
                                     className={`border border-slate-300 p-1 rounded cursor-pointer
                                     ${btnAppoint=== 'upcoming'? 'bg-orange-600 text-white':''}`}>Upcoming</button>
                                    <button onClick={() => setBtnAppoint('appointment')}
                                     className={`border border-slate-300 p-1 rounded cursor-pointer
                                     ${btnAppoint=== 'appointment'? 'bg-blue-600 text-white':''}`}> Appointments</button>
                                </div>
                                <Link to={`/dashboard/patient/${patient.id}/appointments`} 
                                className="font-semibold text-blue-600 text-sm hover:text-blue-800 transition">
                                    View All
                                </Link>
                            </div>
                            {/**appointment registers */}
                            <div className="space-y-2">
                               {
                                 appointments?.length != 0 ? (
                                    btnAppoint === 'upcoming' ? (
                                        appointments?.filter(app => app.status === 'pending')
                                        .map(ap => (
                                            <div
                                            key={ap.id}
                                            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex gap-3 p-2.5 justify-between items-center border border-blue-200 hover:border-blue-400 transition text-sm"
                                        >
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Date</span>
                                                <p className="font-semibold text-gray-800">{ap?.data ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Doctor</span>
                                                <p className="font-semibold text-gray-800">{ap?.schedule?.doctor?.user?.name ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Specialty</span>
                                                <p className="font-semibold text-gray-800">{ap?.schedule?.doctor?.especiality ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-shrink-0">
                                                <span className="text-xs text-gray-600 font-semibold">Status</span>
                                                <p className="font-semibold text-orange-600">{ap?.status}</p>
                                            </label>
                                        </div>
                                        ))
                                    ) : (
                                        appointments?.filter(app => app.status !== 'pending')
                                        .map(ap => (
                                            <div
                                            key={ap.id}
                                            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex gap-3 p-2.5 justify-between items-center border border-blue-200 hover:border-blue-400 transition text-sm"
                                        >
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Date</span>
                                                <p className="font-semibold text-gray-800">{ap?.data ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Doctor</span>
                                                <p className="font-semibold text-gray-800">{ap?.schedule?.doctor?.user?.name ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-1">
                                                <span className="text-xs text-gray-600 font-semibold ">Specialty</span>
                                                <p className="font-semibold text-gray-800">{ap?.schedule?.doctor?.especiality ?? '-'}</p>
                                            </label>
                                            <label className="text-sm flex-shrink-0">
                                                <span className="text-xs text-gray-600 font-semibold">Status</span>
                                                <p className={`font-semibold 
                                                ${ap.status === 'confirmed' ? 'text-blue-600' :
                                                    ap.status === 'denied' ? 'text-red-600' :
                                                    ap.status === 'concluded'? 'text-green-600' : ' '
                                                }`}>{ap?.status}</p>
                                            </label>
                                        </div>
                                        ))
                                    )
                                 ) : (<div>no appointments</div>)
                               }
                            </div>
                        </div>
                    </div>

                    {/**information of archives and medical records */}
                    <div className="w-100 space-y-3">
                        {/**documents */}
                        <div className="border border-gray-200 border-l-4 border-l-orange-600 rounded-lg bg-white shadow-md p-3 space-y-2">
                            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                <h3 className="text-sm font-bold text-gray-800">Documents</h3>
                                <span className="text-sm text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition">+ Add Files</span>
                            </div>
                            <div className="text-center text-gray-500 p-4 text-sm bg-gray-50 rounded-lg">No files found</div>
                        </div>

                        {/**medical records */}
                        <div className="border border-gray-200 border-l-4 border-l-purple-600 shadow-md rounded-lg p-3 bg-white space-y-2">
                            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                <h3 className="text-sm font-bold text-gray-800">Medical Records</h3>
                                <span className="text-sm text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition">+ Add Record</span>
                            </div>
                            <div className="text-center text-gray-500 p-4 text-sm bg-gray-50 rounded-lg">No records found</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}