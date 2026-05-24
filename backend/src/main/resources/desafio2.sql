-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-05-2026 a las 04:25:06
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `desafio2`
--
CREATE DATABASE IF NOT EXISTS `desafio2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `desafio2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id`, `nombre`, `apellido`) VALUES
(1, 'Christopher', 'Jovel'),
(2, 'Odaly', 'Cruz'),
(3, 'Manuel', 'Luna'),
(4, 'Sofia', 'Menjivar'),
(7, 'Fatima Sofia', 'Menjivar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_materia`
--

DROP TABLE IF EXISTS `alumno_materia`;
CREATE TABLE IF NOT EXISTS `alumno_materia` (
  `id_alumno` bigint NOT NULL,
  `id_materia` bigint NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_materia`),
  KEY `FK5rqimn29ofwxhpwdqrugqstxp` (`id_materia`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alumno_materia`
--

INSERT INTO `alumno_materia` (`id_alumno`, `id_materia`) VALUES
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
CREATE TABLE IF NOT EXISTS `inscripciones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `alumno_id` bigint NOT NULL,
  `materia_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `alumno_id`, `materia_id`) VALUES
(1, 1, 1),
(2, 2, 4),
(3, 4, 4),
(5, 1, 4),
(6, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE IF NOT EXISTS `materia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_profesor` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkejrlt9yd5qon0x9ijvbwv1yf` (`id_profesor`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `nombre`, `id_profesor`) VALUES
(1, 'Programación Orientada a Objetos', 1),
(2, 'Administración de Bases de Datos', 2),
(3, 'Redes de Comunicación', 3),
(4, 'Algebra', 4),
(5, 'Servidores en Plataformas Propietarias', 5),
(8, 'Fisica', 7),
(11, 'Quimica', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

DROP TABLE IF EXISTS `notas`;
CREATE TABLE IF NOT EXISTS `notas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `calificacion` double NOT NULL,
  `id_alumno` bigint NOT NULL,
  `id_materia` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `calificacion`, `id_alumno`, `id_materia`) VALUES
(2, 9, 1, 4),
(4, 9, 2, 4),
(6, 10, 1, 1),
(8, 8, 2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id`, `nombre`) VALUES
(1, 'Ligia Marcela Majano'),
(2, 'Bladimir Campos'),
(3, 'Alexander  Campos'),
(4, 'Nelson  Belloso '),
(5, 'Leonardo Alfonso '),
(7, 'Christopher  Jovel'),
(9, 'Manuel  Jesus Perez Herrera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKm2dvbwfge291euvmk6vkkocao` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `password`, `role`, `username`) VALUES
(1, '$2a$10$eo5tNi0gC50PFYgJDCnUA.VlfW5R9Kwtv75ir0glNcWtWE3vV3WbO', 'ROLE_ADMIN', 'odaly_cruz'),
(2, '$2a$10$W54bwOfMvNBCXbx9NuhOaucnCDmXpkQmxcCX/LcOulKryDmmoE66q', 'ROLE_USER', 'Chris_Jovel'),
(3, '$2a$10$ipsoAHbKvIOm7eU1bcLwIOD08cD0t6NHOY.bRKIfKtSjHm6dJnpre', 'ROLE_USER', 'Fenix');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
