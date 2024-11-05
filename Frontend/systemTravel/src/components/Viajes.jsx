import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Accordion,
  AccordionItem,
  useDisclosure,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ModalColaboradores from "./ModalColaboradores";

const Viajes = () => {
    const [data, setData] = useState([]);
    const [transportistas, setTransportistas] = useState([]);
    const [selectedColaborador, setSelectedColaborador] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [existingTravels, setExistingTravels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7258/api/colaboradoressucursales");
                setData(response.data); // Datos de colaboradores y sucursales
            } catch (error) {
                console.error("Error al obtener colaboradores:", error);
            }
        };

        const fetchTransportistas = async () => {
            try {
                const response = await axios.get("https://localhost:7258/api/transportistas");
                setTransportistas(response.data); // Lista de transportistas
            } catch (error) {
                console.error("Error al obtener transportistas:", error);
            }
        };
        const fetchExistingTravels = async () => {
            try {
                const response = await axios.get("https://localhost:7258/api/viaje");
                setExistingTravels(response.data); // Lista de viajes existentes
            } catch (error) {
                console.error("Error al obtener viajes:", error);
            }
        };

        fetchData();
        fetchTransportistas();
        fetchExistingTravels();
    }, []);

    // Agrupa los datos por nombre del colaborador
    const groupedData = data.reduce((acc, item) => {
        const { nombreColaborador } = item;
        if (!acc[nombreColaborador]) {
            acc[nombreColaborador] = [];
        }
        acc[nombreColaborador].push(item);
        return acc;
    }, {});

    const handleRowClick = (colaborador) => {
        setSelectedColaborador(colaborador);
        onOpen();
    };

    const handleCreateViaje = async (data) => {
        try {
          const response = await axios.post('https://localhost:7258/api/viaje', data);
          console.log("Viaje creado con éxito:", response.data);
         
          alert("Viaje creado con éxito");
        } catch (error) {
          console.error("Error al crear el viaje:", error);
         
          if (error.response && error.response.status === 400) {
            alert("Ya existe un viaje programado para hoy.");
          } else {
            alert("Error al crear el viaje. Por favor, intenta de nuevo.");
          }
        }
      };

    return (
        <Box p={4} width="60%" mx="auto">
            <Heading mb={8} mt={6} textAlign="center" color="teal.500">Viajes por Colaborador</Heading>
            <Accordion allowToggle>
                {Object.entries(groupedData).map(([colaborador, sucursales]) => (
                    <AccordionItem key={colaborador}>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                <strong>Nombre:</strong> {colaborador} - <strong>Dirección:</strong> {sucursales[0].direccionColaborador}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Table variant="striped" colorScheme="gray" size="sm">
                                <Thead bg="gray.300">
                                    <Tr>
                                        <Th>Nombre Sucursal</Th>
                                        <Th>Dirección Sucursal</Th>
                                        <Th>Distancia (Km)</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {sucursales.map((sucursal) => (
                                        <Tr key={sucursal.id} onClick={() => handleRowClick(sucursal)} cursor="pointer">
                                            <Td>{sucursal.nombreSucursal}</Td>
                                            <Td>{sucursal.direccionSucursal}</Td>
                                            <Td>{sucursal.distanciaKm}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            {selectedColaborador && (
                <ModalColaboradores
                    isOpen={isOpen}
                    onClose={onClose}
                    colaborador={selectedColaborador}
                    transportistas={transportistas}
                    onCreateViaje={handleCreateViaje}
                    existingTravels={existingTravels}
                />
            )}
        </Box>
    );
};

export default Viajes;
