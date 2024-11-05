import React, { useEffect, useState } from 'react';
import Slidebar from "../components/Sidebar.jsx";
import GerenteDashboard from "../components/GerentesDashboard.jsx";
import ColaboradorDashboard from "../components/ColaboradoresDashboard.jsx";

const Dashboard = () => {
    const [userType, setUserType] = useState("");

    useEffect(() => {
        // Obtén el tipo de usuario desde localStorage
        const storedUserType = localStorage.getItem("userType");
        setUserType(storedUserType);
    }, []);

    return (
        <div>
            <Slidebar />
            <h1>Dashboard</h1>
            {/* Renderizar contenido según el tipo de usuario */}
            {userType === "Gerente de tienda" && <GerenteDashboard />}
            {userType === "Colaborador" && <ColaboradorDashboard />}
            {!userType && <p>Cargando...</p>}
        </div>
    );
};

export default Dashboard;
