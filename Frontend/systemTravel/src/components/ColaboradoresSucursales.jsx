import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import axios from 'axios';

const ColaboradoresSucursales = () => {
  const [colaboradoresSucursales, setColaboradoresSucursales] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState('');
  const [distanciaKm, setDistanciaKm] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7258/api/colaboradoressucursales');
      setColaboradoresSucursales(response.data);

      const colaboradoresRes = await axios.get('https://localhost:7258/api/colaborador');
      setColaboradores(colaboradoresRes.data);

      const sucursalesRes = await axios.get('https://localhost:7258/api/sucursal');
      setSucursales(sucursalesRes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      idColaborador: selectedColaborador,
      idSucursal: selectedSucursal,
      distancia_Km: parseFloat(distanciaKm),
    };

    try {
      await axios.post('https://localhost:7258/api/colaboradoressucursales', newEntry);
      await fetchData();  // Llamada para refrescar la lista después de agregar una nueva asignación
      setSelectedColaborador('');
      setSelectedSucursal('');
      setDistanciaKm('');
    } catch (error) {
      console.error("Error al guardar la asignación:", error);
    }
  };

  // Agrupa las asignaciones por colaborador
  const groupedData = colaboradoresSucursales.reduce((acc, item) => {
    const { nombreColaborador } = item;
    if (!acc[nombreColaborador]) {
      acc[nombreColaborador] = [];
    }
    acc[nombreColaborador].push(item);
    return acc;
  }, {});

  return (
    <Box width="60%" mx="auto" mt={12} p={4} mb={12} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>Asignar Colaboradores a Sucursales</Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Colaborador</FormLabel>
            <Select placeholder="Selecciona un colaborador" value={selectedColaborador} onChange={(e) => setSelectedColaborador(e.target.value)}>
              {colaboradores.map((colaborador) => (
                <option key={colaborador.id} value={colaborador.id}>
                  {colaborador.nombre} - {colaborador.direccion}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Sucursal</FormLabel>
            <Select placeholder="Selecciona una sucursal" value={selectedSucursal} onChange={(e) => setSelectedSucursal(e.target.value)}>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre} - {sucursal.ubicacion}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Distancia (Km)</FormLabel>
            <Input type="number" step="0.01" value={distanciaKm} onChange={(e) => setDistanciaKm(e.target.value)} placeholder="Ingresa la distancia en Km" />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">Guardar Asignación</Button>
        </VStack>
      </form>

      <Box mt={8}>
        <Heading as="h3" size="md" mb={4}>Asignaciones Guardadas</Heading>
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
                      <Tr key={sucursal.id}>
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
      </Box>
    </Box>
  );
};

export default ColaboradoresSucursales;
