import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../auth/AuthContext';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            const user = JSON.parse(localStorage.getItem('user'));

            //redirecionar de acordo ao role
            if(user.role === 'admin') navigate('/admin')
                else if(user.role === 'doctor') navigate('/doctor')
            else navigate('/patient');
        } catch (error) {
            setError('Email ou Password invalidos'+ error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                    <h1 className="text-2xl font-bold text-center mb-6">Hospital System</h1>
                    {
                        error && (
                            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
                        )
                    }

                    <div className="mb-4">
                        <label htmlFor="" className="block mb-1 text-sm font-medium">Email</label>
                        <input type="email"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}  required/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="" className="block mb-1 text-sm font-medium">Senha</label>
                        <input type="password"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}  required/>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
            </form>
        </div>
    );
}