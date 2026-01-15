import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {


  return (

    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={5000} />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
