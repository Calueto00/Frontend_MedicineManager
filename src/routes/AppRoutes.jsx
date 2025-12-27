import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PatientPage from "../pages/PatientPage";
import AdminLayout from "../layouts/AdminLayout";
import MedicalPage from "../pages/MedicalPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Admin Routes com Layout */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute role='admin'>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="patients" element={<PatientPage />} />
                
                {/* medicla routes */}
                <Route path="doctors" element={<MedicalPage />} />
            </Route>

            <Route
                path="/doctor"
                element={
                    <ProtectedRoute role='doctor'>
                        {/** aqui vem o doctor */}
                    </ProtectedRoute>
                }
            />

            <Route
                path="/patient"
                element={
                    <ProtectedRoute role='patient'>
                        {/** aqui vem o dashboard */}
                    </ProtectedRoute>
                }
            />

        </Routes>
    )
}