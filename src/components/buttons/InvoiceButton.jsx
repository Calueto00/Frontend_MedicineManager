import api from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const InvoiceButton = ({ appointmentId, invoiceId }) => {
    const [loading, setLoading] = useState(false);

    const handleDownloadInvoice = async () => {
        if (!invoiceId) {
            toast.error('Invoice ID not provided');
            return;
        }

        try {
            setLoading(true);
            console.log('Downloading invoice:', invoiceId);
            
            const response = await api.get(`/appointments/invoice/${invoiceId}/pdf`, {
                responseType: 'blob'
            });

            // Cria um blob e URL para download
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Cria um link e simula o clique para download
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoiceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            
            // Limpa recursos
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.success('Invoice downloaded successfully');
        } catch (error) {
            console.error('Invoice download error:', error);
            toast.error(error.response?.data?.error || error.message || 'Error downloading invoice');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleDownloadInvoice}
            disabled={loading}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2zm-6-4h.01M12 8h.01" /></svg>
            <span>{loading ? 'Downloading...' : 'Download PDF'}</span>
        </button>
    )
}

export default InvoiceButton;