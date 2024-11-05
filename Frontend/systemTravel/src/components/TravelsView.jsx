import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";

const TravelsView = () => {
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await axios.get("https://localhost:7258/api/viaje"); // URL de la API
                const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato 'YYYY-MM-DD'
                
                // Filtra los viajes para mostrar solo los de hoy
                const todayTravels = response.data.filter((travel) =>
                    travel.fecha.startsWith(today)
                );

                setTravels(todayTravels);
            } catch (error) {
                console.error("Error al obtener los viajes:", error);
            }
        };

        fetchTravels();
    }, []);

    return (
        <Box 
            p={4} 
            maxW={{ base: "90%", md: "80%" }} // 80% de ancho en pantallas medianas en adelante, 90% en pequeñas
            mx="auto" // Margen horizontal automático para centrar
            my={8} // Margen vertical
            boxShadow="lg" // Sombra para el contenedor
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco para contraste
        >
            <Heading mb={4} textAlign="center" color="teal.500">Viajes de Hoy</Heading>
            <Table variant="striped" colorScheme="gray" size="md">
                <Thead bg="gray.300">
                    <Tr>
                        <Th>Fecha</Th>
                        <Th>Total Kilómetros</Th>
                        <Th>Total Pago</Th>
                        <Th>Nombre Colaborador</Th>
                        <Th>Nombre Transportista</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {travels.map((travel) => (
                        <Tr key={travel.id}>
                            <Td>{new Date(travel.fecha).toLocaleDateString()}</Td>
                            <Td>{travel.totalKilometros}</Td>
                            <Td>{travel.totalPago}</Td>
                            <Td>{travel.nombreColaborador}</Td>
                            <Td>{travel.nombreTransportista}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TravelsView;
