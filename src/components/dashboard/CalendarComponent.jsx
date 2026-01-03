import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import api from "../../api/axios";

const day = {
        1: 'Segunda',
        2: 'Terça',
        3: 'Quarta',
        4: 'Quinta',
        5: 'Sexta',
        6: 'Sábado',
        7: 'Domingo',
    };

export default function CalendarComponent(){

    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.get('/schedules').then(response => setSchedule(response.data))
        .finally(()=> setLoading(false));
    },[]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="bg-white mt-1 rounded-md shadow p-2">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold p-1">Schedules week</h3>
                <span className="text-sm text-gray-600">Total ({schedule?.length || 0})</span>
            </div>
            <div className="space-y-2">
                {
                    schedule?.length === 0 ? (
                    <div className="p-2 text-center text-sm text-gray-400">
                        No schedule found
                    </div>) : (schedule?.map(s => (
                        <div className="flex cursor-pointer hover:bg-gray-200 delay-150 duration transition-all items-center justify-between border p-2 rounded-lg border-slate-200 bg-slate-100">
                            <label htmlFor="">
                                <h3 className="text-xs text-gray-600">Doctor</h3>
                                <p className="text-sm font-semibold">{s?.doctor?.user?.name}</p>
                            </label>
                            <label htmlFor="">
                                <h3 className="text-xs text-gray-600">Day</h3>
                                <p className="text-sm font-semibold bg-green-400 px-3 py-1 rounded-md">{day[s.day_weeks]}</p>
                            </label>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}