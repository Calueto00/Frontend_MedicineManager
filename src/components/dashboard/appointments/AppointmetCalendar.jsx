import { useState, useEffect } from "react";
import './AppointmentCalendar.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../../api/axios";
import { Link } from "react-router-dom";

export default function AppointmentCalendar({doctorId}){
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    //buscar appointment by doctor
    useEffect(()=>{
        if(doctorId === null || doctorId === undefined) return;

        api.get(`/doctor/${doctorId}`).then((res) => {
            const data = res.data.doctor?.appointments || [];
            setAppointments(data);

            //select the firt day withappointment
            if(data.lenght > 0) {
                const firstDay = new Date(data[0].data);
                setSelectedDate(firstDay);
            }
        }).catch((err) => console.error('erro ao buscar appointments',err));
    },[doctorId]);

    //function to decide class tile calender
    const tileClassName = ({date}) => {
        const calendarDateStr = date.toISOString().split("T")[0];

        //appointments from this day
        const dayAppointments = appointments.filter((app) => app.data === calendarDateStr);

        if(dayAppointments.length === 0) return null;

        //priority status
        const priority = ['pending','confirmed','concluded','denied'];
        const status = priority.find((s) => dayAppointments.some((app) => app.status === s));

        return `has-appointment ${status}`;
    }

    const selectedDateStr = selectedDate.toISOString().split("T")[0];

    //adicionar appointment do dia
    const appointmentsOfDay = appointments.filter((app) => 
        app.data === selectedDateStr);
    return (
        <div className="grid grid-cols-1 gap-3">
            {/* calendar */}
            <div className="bg-white p-4 rounded shadow text-center p-2">
                <h2 className="text-lg font-semibold mb-4">
                    Appointments Calendar
                </h2>
                <Calendar 
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileClassName={tileClassName}
                />

                {/**list days */}
                <h2 className="font-medium text-sm my-2">Appointments on {selectedDateStr}</h2>
                 {appointmentsOfDay.length === 0 ? (
                    <p className="text-gray-500 text-center">No Appointments</p>
                 ): (
                    <ul className="space-y-1">
                        {appointmentsOfDay.map((app) => (
                            <Link to={`/dashboard/appointment/details/${app.id}`}
                             key={app.id}
                                className="p-2 border rounded flex justify-between shadow-sm border-slate-300">
                                    <div>
                                        <p className="font-medium">
                                            {app.patient.user.name}
                                        </p>
                                        
                                    </div>
                                    <span 
                                        className={`px-2 py-1 rounded text-white ${
                                            app.status === 'pending' ? 'bg-orange-600' :
                                            app.status === 'confirmed' ? 'bg-blue-600' :
                                            app.status === 'concluded' ? 'bg-green-600' :
                                            app.status === 'denied' ? 'bg-red-600' : 'bg-gray-600'
                                        }`}>
                                            {app.status}
                                    </span>
                            </Link>
                        ))}
                    </ul>
                 )}
            </div>
        </div>
    )
}