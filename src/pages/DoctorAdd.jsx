import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DoctorAdd() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        especiality: '',
        crm: '',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                especiality: form.especiality || null,
                crm: form.crm || null,
                bio: form.bio || null
            }
             await api.post('/doctor', payload);
            toast.success('Médico registrado com sucesso!');


            setForm({ name: '', email: '', password: '', especiality: '', crm: '', bio: '' });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Erro ao registrar médico');
        } finally {
            navigate('/admin/doctors');
        }
    }

    const handleReset = () => {
        setForm({ name: '', email: '', password: '', especiality: '', crm: '', bio: '' });
    }

    return (
        <>
            <div className="px-2 py-4 bg-white shadow-sm">
                <h1 className="font-semibold">Doctor Management</h1>
            </div>
            <div className="border my-auto mt-10 px-2 py-2 bg-white mx-4 rounded-md shadow-sm border-slate-300">
                <h2 className="bg-blue-700 p-2 text-center text-white font-bold rounded">Add New Doctor</h2>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 mt-4 gap-3">
                        <label className="space-y-2">
                            <h3>Name</h3>
                            <input type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="border rounded-md w-full border-slate-200 shadow-md p-2"
                                placeholder="Digite name.."
                            />
                        </label>
                        <label className="space-y-2">
                            <h3>Email</h3>
                            <input type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="border rounded-md w-full border-slate-200 shadow-md p-2"
                                placeholder="Digite email.."
                            />
                        </label>
                        <label className="space-y-2">
                            <h3>Code</h3>
                            <input type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="border rounded-md w-full border-slate-200 shadow-md p-2"
                                placeholder="Digite code.."
                            />
                        </label>
                        <label className="space-y-2">
                            <h3>Especiality</h3>
                            <input type="text"
                                id="especiality"
                                name="especiality"
                                value={form.especiality}
                                onChange={handleChange}
                                className="border rounded-md w-full border-slate-200 shadow-md p-2"
                                placeholder="especiality.."
                            />
                        </label>
                        <label className="space-y-2">
                            <h3>Crm</h3>
                            <input type="text"
                                id="crm"
                                name="crm"
                                value={form.crm}
                                onChange={handleChange}
                                className="border rounded-md w-full border-slate-200 shadow-md p-2"
                                placeholder="Digite crm.."
                            />
                        </label>

                    </div>
                    <div>
                        <h3>Biografy</h3>
                        <textarea
                            id="bio"
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="write all about"
                            className="border w-full p-2 border-slate-200 shadow-md rounded h-26"
                        ></textarea>
                    </div>
                    <div className="text-end space-x-2">
                        <button type="button"
                            onClick={handleReset}
                            className="border rounded-md border-slate-200 bg-slate-100 px-6 py-3">Limpar</button>
                        <button type="submit" className="border rounded-md border-slate-200 px-6 py-3 bg-blue-700 text-white">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}