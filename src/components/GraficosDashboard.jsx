
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function GraficosDashboard({appointment, patient,doctor}) {
    
    const examesCount = 1; // Será atualizado quando tiver dados
    
    // Gráfico de pizza
    const pieChartData = {
        labels: ["Pacientes", "Médicos","Exames","Appointment"],
        datasets: [
            {
                data: [patient, doctor,examesCount,appointment],
                backgroundColor: [
                    "#3639e9ff",
                    "#dd8513ff",
                    "#9822cfff",
                    "#17d406ff"
                ],
                borderColor: ["rgb(59, 130, 246)", "rgb(34, 197, 94)"],
                borderWidth: 1,
            },
        ],
    };

    

    return (
        <section className="">
                <div className="bg-white border border-slate-300 rounded-lg shadow-md p-2 h-[250px]  rounded-lg">
                    <h3 className=" font-semibold text-gray-500">
                        Proporção Pacientes vs Médicos
                    </h3>
                    <Pie
                        data={pieChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    position: "left",
                                },
                            },
                        }}
                    />
                </div>
        </section>
    );
}