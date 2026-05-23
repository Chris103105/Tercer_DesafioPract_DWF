# Sistema de Gestión Académica - Desafío Práctico 

Este proyecto es una aplicación backend desarrollada con Spring Boot y Java, diseñada para gestionar la inscripción de alumnos en materias impartidas por profesores. Implementa una arquitectura robusta por capas (Controller, Service, Repository) utilizando Spring Data JPA y una base de datos MySQL
##  Demostración del Proyecto

 demostración del funcionamiento del sistema en el siguiente enlace:
https://drive.google.com/file/d/1TZjistjCkzLhD9yDPuteIVH14EsE-Ee2/view?usp=sharing


##  Tecnologías y Dependencias

El proyecto está construido utilizando las siguientes herramientas y dependencias principales:

* **Java** (JDK 17 o superior recomendado)
* **Spring Boot** (Framework principal)
* **Spring Data JPA** (Para el mapeo objeto-relacional / ORM)
* ** MySQL 8.0+** 
* ** SpringDoc OpenAPI (Swagger)** 

## Estructura de la Base de Datos
El sistema gestiona la integridad relacional entre las siguientes entidades:

Profesor: Entidad principal.

Materia: Vinculada a un profesor.

Alumno: Relacionado con materias mediante una tabla intermedia.


##  Cómo clonar y ejecutar el proyecto

Sigue estos pasos para desplegar el proyecto en tu entorno local:

### 1. Clonar el repositorio
Abre la terminal y ejecuta el siguiente comando:
```bash
git clone  https://github.com/Chris103105/Segund_Desafio_Pract_DWF_JB251834.git

2. Abrir en el IDE

Abre el proyecto en IntelliJ IDEA (o tu editor de preferencia).

Espera a que Maven/Gradle descargue todas las dependencias necesarias.

## Preparación de la Base de Datos

Asegúrate de tener MySQL corriendo (a través de WAMP, XAMPP o servicio local).

Crea una base de datos llamada desafio2.

Ejecuta el script desafio2.sql incluido en la raíz del proyecto para crear las tablas y cargar los datos de prueba.

##Configuración del Proyecto
Abre el archivo src/main/resources/application.properties y verifica que tus credenciales de MySQL sean correctas:

spring.datasource.url=jdbc:mysql://localhost:3306/desafio2?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

Ejecuta la clase principal DesafioPract1Jb251834Application.

Accede a la documentación interactiva de la API en: http://localhost:8080/swagger-ui/index.html
