import api from "../../../api/axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function PatientAdd() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        birth: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                birth: form.birth || null,
                phone: form.phone || null,
                address: form.address || null
            };
            const response = await api.post('/patient', payload);
            console.log('Paciente criado:', response.data);
            
            setForm({ name: '', email: '', password: '', birth: '', phone: '', address: '' });
            Navigate('/patients');
        } catch (err) {
            console.error(err);
            
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setForm({ name: '', email: '', password: '', birth: '', phone: '', address: '' });
    };

    return (
        <section className=" p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">+</div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Novo Paciente</h2>
                    <p className="text-sm text-gray-500 mt-1">Preencha os campos para criar um novo registro de paciente.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm text-gray-600 mb-1 font-medium">Nome *</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-gray-600 mb-1 font-medium">Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@exemplo.com"
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm text-gray-600 mb-1 font-medium">Senha *</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Mín. 6 caracteres"
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="birth" className="text-sm text-gray-600 mb-1 font-medium">Data de Nascimento</label>
                    <input
                        id="birth"
                        name="birth"
                        type="date"
                        value={form.birth}
                        onChange={handleChange}
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm text-gray-600 mb-1 font-medium">Telefone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(99) 99999-9999"
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="address" className="text-sm text-gray-600 mb-1 font-medium">Endereço</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Rua, número, bairro"
                        className="rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>

                <div className="lg:col-span-3 flex items-center justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition">
                        Limpar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-5 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 ${loading ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'} transition`}>
                        {loading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle>
                                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                                </svg>
                                <span>Salvando...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Salvar Paciente</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}