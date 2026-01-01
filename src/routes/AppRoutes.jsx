import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PatientPage from "../pages/patientsPages/PatientPage";
import PatientDetails from "../pages/patientsPages/PatientDetails";
import AdminLayout from "../layouts/AdminLayout";
import MedicalPage from "../pages/MedicalPage";
import DoctorDetails from "../pages/DoctorDetails";
import DoctorAdd from "../pages/DoctorAdd";
import PatientNew from "../pages/patientsPages/PatientNew";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Admin Routes com Layout */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute role='admin'>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />

                {/** patient routes */}
                <Route path="patients" element={<PatientPage />} />
                <Route path="patient/novo" element={<PatientNew />}/>
                <Route path="patient/:id" element={<PatientDetails /> } />

                {/* medicla routes */}
                <Route path="doctors" element={<MedicalPage />} />
                <Route path="doctor_novo" element={<DoctorAdd />} />
                <Route path="doctor/:id" element={<DoctorDetails />} />
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