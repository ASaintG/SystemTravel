-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2024 a las 22:32:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transporte_colaboradores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaboradores`
--

CREATE TABLE `colaboradores` (
  `id_colaborador` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colaboradores`
--

INSERT INTO `colaboradores` (`id_colaborador`, `nombre`, `direccion`) VALUES
(1, 'Anthony Saint', 'colonia villa'),
(2, 'María Pérez', 'colonia centro'),
(3, 'Juan López', 'colonia norte'),
(4, 'Luisa Gómez', 'colonia sur'),
(5, 'Carlos Díaz', 'colonia este'),
(6, 'string', 'string');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaborador_sucursal`
--

CREATE TABLE `colaborador_sucursal` (
  `id` int(11) NOT NULL,
  `id_colaborador` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `distancia_km` decimal(5,2) DEFAULT NULL CHECK (`distancia_km` > 0 and `distancia_km` <= 50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colaborador_sucursal`
--

INSERT INTO `colaborador_sucursal` (`id`, `id_colaborador`, `id_sucursal`, `distancia_km`) VALUES
(4, 1, 1, 20.00),
(5, 1, 2, 30.00),
(6, 1, 3, 40.00),
(7, 2, 1, 20.00),
(8, 2, 2, 30.00),
(9, 4, 2, 10.00),
(10, 3, 1, 20.00),
(11, 5, 2, 20.00),
(12, 5, 1, 10.00),
(13, 5, 3, 40.00),
(14, 4, 1, 40.00),
(15, 6, 1, 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_viaje`
--

CREATE TABLE `detalle_viaje` (
  `id` int(11) NOT NULL,
  `id_viaje` int(11) NOT NULL,
  `id_colaborador_sucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`Id`, `Nombre`) VALUES
(2, 'Colaborador'),
(1, 'Gerente de Tienda'),
(3, 'transportista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `id_sucursal` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id_sucursal`, `nombre`, `direccion`) VALUES
(1, 'string', 'string'),
(2, 'bb', 'stribang'),
(3, 'sucursal c', 'barrio villa los');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportistas`
--

CREATE TABLE `transportistas` (
  `id_transportista` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tarifa_por_km` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transportistas`
--

INSERT INTO `transportistas` (`id_transportista`, `nombre`, `tarifa_por_km`) VALUES
(1, 'pedro vargas', 15.00),
(2, 'Jose Cherno', 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `perfil` int(11) NOT NULL,
  `id_colaborador` int(11) DEFAULT NULL,
  `id_transportista` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `contrasena`, `perfil`, `id_colaborador`, `id_transportista`) VALUES
(1, 'saint', 'sdasdasdasdads', 3, NULL, 2),
(5, 'string', '$2a$11$HcjKnelArFJeXxb5stZnf.ULakNWPFTe9lVU5fT257jGhyrbpUeW.', 1, NULL, NULL),
(7, 'string1', '$2a$11$8DpQY9Qm.VIcXS1WuDlpm.74DA6yMjAPOktJg9VsAdW6ThAvuL8Ie', 1, NULL, NULL),
(9, 'saint102', '$2a$11$GncoqUaPV0gblcu0i3tSEuHVbKEf3Hic271053Q1MJ5Lk.OEN0.yG', 1, NULL, NULL),
(10, 'anthony', '$2a$11$4ln1Nj2HHNsarsvanF9F/uNOIXdajCoEdxwWJz5FGm0dT/zVpmoNm', 2, 1, NULL),
(11, 'admin', '$2a$11$.cFdPv.144WRdkmwM2OxfeOf96W.U6sZKlN1cdhEXwL8hzg198pne', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id_viaje` int(11) NOT NULL,
  `id_colaboradores_sucursales` int(11) NOT NULL,
  `id_transportista` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total_km` decimal(5,2) NOT NULL CHECK (`total_km` <= 100),
  `total_pago` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id_viaje`, `id_colaboradores_sucursales`, `id_transportista`, `fecha`, `total_km`, `total_pago`) VALUES
(32, 4, 1, '2024-11-05', 20.00, 300.00),
(34, 15, 2, '2024-11-05', 10.00, 10.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`id_colaborador`);

--
-- Indices de la tabla `colaborador_sucursal`
--
ALTER TABLE `colaborador_sucursal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_colaborador` (`id_colaborador`,`id_sucursal`),
  ADD KEY `id_sucursal` (`id_sucursal`);

--
-- Indices de la tabla `detalle_viaje`
--
ALTER TABLE `detalle_viaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_viaje` (`id_viaje`),
  ADD KEY `id_colaborador_sucursal` (`id_colaborador_sucursal`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id_sucursal`);

--
-- Indices de la tabla `transportistas`
--
ALTER TABLE `transportistas`
  ADD PRIMARY KEY (`id_transportista`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `perfil` (`perfil`),
  ADD KEY `fk_usuarios_colaboradores` (`id_colaborador`),
  ADD KEY `fk_usuarios_transportistas` (`id_transportista`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id_viaje`),
  ADD KEY `id_usuario_registro` (`id_colaboradores_sucursales`),
  ADD KEY `id_transportista` (`id_transportista`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  MODIFY `id_colaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `colaborador_sucursal`
--
ALTER TABLE `colaborador_sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `detalle_viaje`
--
ALTER TABLE `detalle_viaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id_sucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transportistas`
--
ALTER TABLE `transportistas`
  MODIFY `id_transportista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id_viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colaborador_sucursal`
--
ALTER TABLE `colaborador_sucursal`
  ADD CONSTRAINT `colaborador_sucursal_ibfk_1` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  ADD CONSTRAINT `colaborador_sucursal_ibfk_2` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`);

--
-- Filtros para la tabla `detalle_viaje`
--
ALTER TABLE `detalle_viaje`
  ADD CONSTRAINT `detalle_viaje_ibfk_1` FOREIGN KEY (`id_viaje`) REFERENCES `viajes` (`id_viaje`),
  ADD CONSTRAINT `detalle_viaje_ibfk_2` FOREIGN KEY (`id_colaborador_sucursal`) REFERENCES `colaborador_sucursal` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_colaboradores` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  ADD CONSTRAINT `fk_usuarios_transportistas` FOREIGN KEY (`id_transportista`) REFERENCES `transportistas` (`id_transportista`),
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`perfil`) REFERENCES `roles` (`Id`);

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_2` FOREIGN KEY (`id_transportista`) REFERENCES `transportistas` (`id_transportista`),
  ADD CONSTRAINT `viajes_ibfk_3` FOREIGN KEY (`id_colaboradores_sucursales`) REFERENCES `colaborador_sucursal` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
