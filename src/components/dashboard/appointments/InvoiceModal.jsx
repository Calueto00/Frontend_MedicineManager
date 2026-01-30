import { useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";


export default function InvoiceModal({
    appointment,
    isOpen,
    onClose,
    onInvoiceCreated
}){
    const [amount, setAmount] = useState('');
    const [payment_method, setPayment_method] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

        if(!isOpen || !appointment) return null;

        const submit = async (e) => {
            e.preventDefault();
            setError(null);

            try {
                setLoading(true);
                await api.post(`/appointments/${appointment.id}/invoice`,{
                    amount,
                    payment_method
                });

                toast.success('Payment realized successfully');
                onInvoiceCreated();
                onclose();
                setAmount('');
                setPayment_method('');
               
            } catch (err) {
                setError(
                    err.response?.data?.error || 'error to create invoice'
                );
            } finally {
                setLoading(false);
            }
        }
    return (
        <div 
            onClick={e => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                {/* header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">Appointment Invoice</h3>
                    <button 
                        onClick={() => onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer" 
                    >X</button>
                </div>

                {/* body */}
                <div className="px-6 py-4 space-y-4">
                    <div className="text-sm text-gray-600">
                        <p>
                            <strong>Patient:</strong> {" "} {appointment?.patient?.user?.name}
                        </p>
                        <p>
                            <strong>Doctor:</strong> {" "} {appointment?.schedule?.doctor?.user?.name}
                        </p>
                    </div>
                    { error && ( <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                    Amount Value
                                </label>
                                <input 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 
                                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                placeholder="Ex: 15000" required/>
                            </div>

                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                    Payment Method
                                </label>
                                <select 
                                type="number"
                                value={payment_method}
                                onChange={(e) => setPayment_method(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 
                                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                placeholder="Ex: 15000" required>
                                    <option value="">Select</option>
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="mobile_money">Mobile Money</option>
                                </select>
                            </div>

                            {/* footer / actions */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button 
                                    onClick={onClose}
                                    type="button"
                                    className="rounded-lg border border-gray-300 px-4 py-2 
                                    text-sm textgray-700 hover:bg-gray-100"> Cancel
                                </button>

                                <button 
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 font-semibold px-4 py-2 
                                text-sm text-white hover:bg-blue-700">
                                        {loading ? 'Proccessing...' : 'Confirm Payment'}
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}