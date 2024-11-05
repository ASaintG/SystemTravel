import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const EstadisticasTransporte = () => {
  const [transportistas, setTransportistas] = useState([]);
  const [transportista, setTransportista] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [viajes, setViajes] = useState([]);
  const [totalPago, setTotalPago] = useState(0);
  const [totalKilometros, setTotalKilometros] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchTransportistas = async () => {
      try {
        const response = await axios.get('https://localhost:7258/api/transportistas');
        setTransportistas(response.data);
      } catch (error) {
        toast({
          title: 'Error al cargar transportistas',
          description: error.response?.data?.error || 'Ha ocurrido un error',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchTransportistas();
  }, [toast]);

  const buscarViajes = async () => {
    try {
      const response = await axios.get('https://localhost:7258/api/viaje/transportistaview', {
        params: {
          idTransportista: transportista,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
        },
      });
      
      console.log('Respuesta de la API:', response.data);
      setViajes(response.data);

      const totalPago = response.data.reduce((acc, viaje) => acc + viaje.totalPago, 0);
      const totalKilometros = response.data.reduce((acc, viaje) => acc + viaje.totalKilometros, 0);
      
      setTotalPago(totalPago);
      setTotalKilometros(totalKilometros);
    } catch (error) {
      toast({
        title: 'Error al buscar viajes',
        description: error.response?.data?.error || 'Ha ocurrido un error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box p={4} width="80%" mx="auto" mt={4}>
      <Box mb={4} width="60%" mx="auto"  boxShadow="lg"  >
        <FormControl id="transportista" pb={2} p>
          <FormLabel>Selecciona un Transportista</FormLabel>
          <Select
            placeholder="Seleccione un transportista"
            value={transportista}
            onChange={(e) => setTransportista(e.target.value)}
          >
            {transportistas.map((trans) => (
              <option key={trans.id} value={trans.id}>
                {trans.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="fechaInicio" mt={4}>
          <FormLabel>Fecha de Inicio</FormLabel>
          <Input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </FormControl>

        <FormControl id="fechaFin" mt={4}>
          <FormLabel>Fecha de Fin</FormLabel>
          <Input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </FormControl>

        <Button mt={4} colorScheme="blue" onClick={buscarViajes}>
          Buscar
        </Button>
      </Box>

      <TableContainer width="100%" borderRadius="md">
        <Table variant="simple">
          <Thead bg="gray.300">
            <Tr>
              <Th>ID Viaje</Th>
              <Th>Fecha</Th>
              <Th>Total KM</Th>
              <Th>Total Pago</Th>
              <Th>Transportista</Th>
            </Tr>
          </Thead>
          <Tbody>
            {viajes.map((viaje) => (
              <Tr key={viaje.id}>
                <Td>{viaje.id}</Td>
                <Td>{viaje.fecha}</Td>
                <Td>{viaje.totalKilometros}</Td>
                <Td>{viaje.totalPago}</Td>
                <Td>{viaje.nombreTransportista}</Td>
              </Tr>
            ))}
            {/* Fila de Totales */}
            <Tr fontWeight="bold" bg="gray.300">
              <Td colSpan={3}>Total</Td>
              <Td>{totalPago}</Td>
              <Td></Td>
            </Tr>
            <Tr fontWeight="bold" bg="gray.300">
              <Td colSpan={2}>Total Kilómetros</Td>
              <Td>{totalKilometros}</Td>
              <Td></Td>
              <td></td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EstadisticasTransporte;
