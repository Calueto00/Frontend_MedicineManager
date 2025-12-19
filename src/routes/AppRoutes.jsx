import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route 
                path="/login" 
                element={} />
            <Route 
                path="/admin"
                element={
                    <ProtectedRoute role='admin'>
                        /** aqui vem o dashboard */
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