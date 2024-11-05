import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Center, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import logo from '../assets/logo.png';
import TravelsView from './TravelsView.jsx';
const ColaboradorDashboard = () => {


    return (
        <Center h="100vh" flexDirection="column">
            
            <Box textAlign="center" mb={4}>
                <Heading>Bienvenido, Colaborador</Heading>
                <p>Este es tu panel de colaborador.</p>
            </Box>
            <TravelsView/>
        </Center>
    );
};

export default ColaboradorDashboard;
