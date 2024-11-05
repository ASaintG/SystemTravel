import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ViajesColaboradores from './pages/ViajesColaboradores'; // Asegúrate de importar estos componentes
import Statistics from './pages/Statistics';
import Transporter from './pages/Transporter';

const App = () => {
    // Simulación de estado de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Función para manejar inicio de sesión
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Routes>
                {/* Ruta de login: redirige al Dashboard si ya está autenticado */}
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                />
                
                {/* Ruta del Dashboard: redirige al Login si no está autenticado */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                
                {/* Otras rutas: redirige al Login si no está autenticado */}
                <Route
                    path="/ViajesColaboradores"
                    element={isAuthenticated ? <ViajesColaboradores /> : <Navigate to="/login" />}
                />
                <Route
                    path="/statistics"
                    element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />}
                />
                <Route
                    path="/transporter"
                    element={isAuthenticated ? <Transporter /> : <Navigate to="/login" />}
                />

                {/* Redirección de ruta base */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
