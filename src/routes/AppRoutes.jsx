import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
    return (
        <Routes>
            <Route 
                path="/login" 
                element={<Login />} />
            <Route 
                path="/admin"
                element={
                    <ProtectedRoute role='admin'>
                        <Dashboard />
                    </ProtectedRoute>
                } />

            <Route 
                path="/doctor"
                element={
                    <ProtectedRoute role='doctor'>
                        /** aqui vem o doctor */
                    </ProtectedRoute>
                } />

            <Route 
                path="/patient"
                element={
                    <ProtectedRoute role='patient'>
                        /** aqui vem o dashboard */
                    </ProtectedRoute>
                } />
            
        </Routes>
    )
}