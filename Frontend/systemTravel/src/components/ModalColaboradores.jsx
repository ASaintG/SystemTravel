import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
} from "@chakra-ui/react";

const ModalColaboradores = ({ isOpen, onClose, colaborador, transportistas, onCreateViaje,existingTravels  }) => {
    const [selectedTransportista, setSelectedTransportista] = useState(null);
    const [totalPago, setTotalPago] = useState(0);

    // Efecto para actualizar el total según el transportista seleccionado y la distancia
    useEffect(() => {
        if (selectedTransportista && colaborador.distanciaKm) {
            const tarifaPorKm = selectedTransportista.tarifa_por_km;
            const distancia = Number(colaborador.distanciaKm) || 0;
            const tarifa = Number(tarifaPorKm);
            setTotalPago(distancia * tarifa);
        }
    }, [selectedTransportista, colaborador.distanciaKm]);

    // Maneja la selección del transportista en el dropdown
    const handleTransportistaChange = (event) => {
        const transportistaId = event.target.value;
        const transportista = transportistas.find(t => t.id === Number(transportistaId));
        setSelectedTransportista(transportista);
    };

    const handleCreateViaje = () => {
        const today = new Date().toISOString().split("T")[0]; // Obtén la fecha actual en formato "YYYY-MM-DD"
        const hasTodayTravel = existingTravels.some(
            (travel) =>
                travel.id_colaboradores_sucursales === colaborador.id &&
                travel.fecha.startsWith(today)
        );
    
        if (hasTodayTravel) {
            alert("Este colaborador ya tiene un viaje creado para hoy. Intenta nuevamente mañana.");
            return;
        }
    
        if (selectedTransportista) {
            const viajeData = {
                id_colaboradores_sucursales: colaborador.id,
                idTransportista: selectedTransportista.id,
                fecha: new Date().toISOString(),
                totalKilometros: colaborador.distanciaKm,
                totalPago: totalPago,
            };
            onCreateViaje(viajeData);
        }
    };
    

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalles del Viaje</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nombre Colaborador</FormLabel>
                        <Input value={colaborador.nombreColaborador} isReadOnly />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Dirección Colaborador</FormLabel>
                        <Input value={colaborador.direccionColaborador} isReadOnly />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Nombre Sucursal</FormLabel>
                        <Input value={colaborador.nombreSucursal} isReadOnly />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Distancia (Km)</FormLabel>
                        <Input value={colaborador.distanciaKm} isReadOnly />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Transportista</FormLabel>
                        <Select onChange={handleTransportistaChange} placeholder="Selecciona un transportista">
                        {transportistas.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.nombre} - Tarifa: {t.tarifa_por_km}
                            </option>
                        ))}
                    </Select>

                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Total a Pagar</FormLabel>
                        <Input value={`$${totalPago.toFixed(2)}`} isReadOnly />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleCreateViaje} isDisabled={!selectedTransportista}>
                        Crear Viaje
                    </Button>
                    <Button onClick={onClose}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalColaboradores;
