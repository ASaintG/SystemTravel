import React from 'react';
import { Box, Image, Center } from '@chakra-ui/react';
import logo from '../assets/logo.png';

const GerenteDashboard = () => {
    return (
        <Center h="100vh">
            <Box textAlign="center">
                <h1>Bienvenido, Gerente</h1>
                <p>Este es tu panel de administración.</p>
                
            </Box>
            
        </Center>
    );
};

export default GerenteDashboard;
