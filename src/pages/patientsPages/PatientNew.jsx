import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PatientNew() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        birth: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleReset = () => {
        setForm({ name: '', email: '', password: '', birth: '', phone: '', address: '' });
        setErrors([]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                birth: form.birth || null,
                phone: form.phone || null,
                address: form.address || null
            };

            await api.post('/patient', payload);

            toast.success('Paciente criado com sucesso!');
            setForm({ name: '', email: '', password: '', birth: '', phone: '', address: '' });
            navigate('/dashboard/patients');

        } catch (error) {
            console.error('Error:', error?.response?.data || error);

            // Tenta exibir erro como lista se for array
            if (error?.response?.data?.errors) {
                const errArray = Array.isArray(error.response.data.errors)
                    ? error.response.data.errors
                    : [error.response.data.errors];
                setErrors(errArray.map(e => typeof e === 'string' ? e : JSON.stringify(e)));
            }
            // Tenta exibir erro como mensagem simples do servidor
            else if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            // Fallback para qualquer outra estrutura de erro
            else if (error?.response?.data) {
                const errorData = error.response.data;
                // Se for um objeto com propriedades, mostra tudo
                const errorMsg = Object.values(errorData).join(', ') || 'Erro ao criar paciente';
                toast.error(errorMsg);
            }
            // Erro de rede ou outro erro
            else {
                const msg = error?.message || 'Erro ao criar paciente';
                toast.error(msg);
            }
        }
    }
    return (
        <>
            <h1 className="py-4 px-2 bg-white shadow-sm">Patient Management</h1>

            {Array.isArray(errors) && errors.length > 0 && (
                <div className="m-7 p-4 bg-red-50 border border-red-700 rounded-md">
                    <ul className="space-y-2">
                        {errors.map((error, idx) => (
                            <li key={idx} className="text-red-600">• {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-white m-7 p-2 rounded-md shadow-sm border border-slate-200">
                <h3 className="p-2 text-center bg-blue-700 font-semibold text-white rounded-md">Add New Patient</h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div className="border grid grid-cols-3 gap-4 p-2 border-slate-200 shadow-sm rounded-md py-3">
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Name</h3>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Digit name..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Email</h3>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Digit email..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Password</h3>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Digit password..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Birth</h3>
                            <input
                                type="date"
                                id="birth"
                                name="birth"
                                value={form.birth}
                                onChange={handleChange}
                                placeholder="Digit birth..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Phone</h3>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Digit phone..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>
                        <label className="space-y-2">
                            <h3 className="text-gray-600 text-sm">Address</h3>
                            <input type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Digit address..."
                                className="w-full p-2 border border-slate-200 shadow-sm rounded-md outline-none" />
                        </label>

                    </div>
                    <div className="text-end p-2 space-x-2">
                        <button type="button"
                            onClick={handleReset}
                            className="px-6 py-2 rounded-md border bg-slate-300 border-slate-400">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-md border bg-blue-800 text-white">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}