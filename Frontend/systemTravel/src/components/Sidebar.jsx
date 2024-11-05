import React from 'react';
import { Box, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    // Lee el userType desde localStorage
    const userType = localStorage.getItem("userType");
    console.log(localStorage.getItem("userType"));

    return (
        <Box position="fixed" right={0} top={0} height="50vh" width="auto">
            {/* Botón de menú */}
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    mt={4} 
                    mr={2}
                />
                <MenuList color="black" height="50vh">
                    <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
                    {String(userType) === "Gerente de tienda" && (
                        <>
                            <MenuItem as={RouterLink} to="/ViajesColaboradores">Viajes</MenuItem>
                            <MenuItem as={RouterLink} to="/transporter">Estadisticas de Transportistas</MenuItem>
                            <MenuItem as={RouterLink} to="/statistics">Asignar Colaboradores a Sucursales</MenuItem>
                        </>
                    )}

                  
                </MenuList>
            </Menu>
        </Box>
    );
};

export default Sidebar;
