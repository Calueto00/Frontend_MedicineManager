import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";

export default function DoctorListDashboard(){

    const [doctors, setDoctors] = useState([]);

    //getting
    useEffect(() => {
        const fetchData = async () => {
            await api.get('/doctors').then((res)=>{
                setDoctors(res.data);
            })
        };

        fetchData();
    })
    return (
        <div className="mt-3">
                    <div className="border rounded-lg bg-white h-48 p-3 border-gray-200 shadow-md border-l-4 border-l-blue-600 space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <h3 className="text-sm font-bold text-gray-800">Doctor List</h3>
                            <Link 
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm cursor-pointer transition"
                                to={'/dashboard/doctors'} >View All</Link>
                        </div>
                        <div className="h-34 overflow-y-auto space-y-1">
                            {
                                doctors?.length === 0 ? (<div className="text-center text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">No doctors found</div>) : (
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="text-sm text-gray-600">
                                                <th className="p-2">Name</th>
                                                <th>Email</th>
                                                <th>Especiality</th>
                                                <th>CRM</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="space-y-1">
                                            {
                                                doctors?.slice(0,3)?.map(doctor => (
                                                    <tr 
                                                    key={doctor.id}
                                                    className="text-sm text-center border-l-2 border-l-blue-600 border-b-4 border-b-white rounded-l-md">
                                                        <td className="p-1 ">{doctor?.user?.name}</td>
                                                        <td>{doctor?.user?.email}</td>
                                                        <td>{doctor?.especiality}</td>
                                                        <td>{doctor?.crm}</td>
                                                        <td>
                                                            <Link 
                                                            className="font-semibold text-white bg-blue-600 p-1 rounded"
                                                            to={`/dashboard/doctor/${doctor.id}`}
                                                            >View</Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
                    </div>
                </div>
    );
}