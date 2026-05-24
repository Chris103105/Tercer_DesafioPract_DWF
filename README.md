# Sistema de Gestión Académica - Desafío Práctico 

Este proyecto es una aplicación web completa (Backend + Frontend) desarrollada para gestionar el ciclo académico. Implementa una arquitectura robusta por capas (Controller, Service, Repository) utilizando **Spring Boot**, seguridad mediante **JWT**, y una interfaz de usuario moderna tipo *Single Page Application* (SPA) construida con ** JavaScript**.

##  Características Principales (Nuevas Implementaciones)

* **Seguridad y Autenticación:** Sistema de Login y Registro de usuarios con encriptación de contraseñas y generación de tokens **JWT (JSON Web Tokens)**.
* **Dashboard :** Interfaz de usuario totalmente responsiva y estructurada mediante tarjetas y menús dinámicos.
* **Sistema de Alertas:** Integración con **SweetAlert2** para un feedback visual asíncrono (bloqueo de UI durante peticiones, confirmaciones de borrado, alertas de error).
* **Gestión de Notas:** Nuevo módulo implementado para registrar y gestionar las calificaciones de los alumnos por materia.
* **Operaciones CRUD Completas:** Interacción asíncrona (Fetch API) con el backend para crear, leer, actualizar y eliminar Profesores, Alumnos, Materias, Notas e Inscripciones.
* 

##  Tecnologías y Dependencias

### Backend
* **Java** (JDK 17 o superior recomendado)
* **Spring Boot** (Framework principal)
* **Spring Security + JWT** (Protección de rutas y endpoints)
* **Spring Data JPA** (Mapeo objeto-relacional / ORM)
* **MySQL 8.0+** (Motor de base de datos)
* **SpringDoc OpenAPI / Swagger** (Documentación de la API)

### Frontend
* **HTML5 & CSS3** (Diseño Grid/Flexbox)
* **Vanilla JavaScript** (ES6+, Promesas, Async/Await, Fetch API)
* **SweetAlert2** (Librería de notificaciones)
* **FontAwesome 6** (Librería de iconos vectoriales)
* 
##  Estructura de la Base de Datos

El sistema gestiona la integridad relacional estricta entre las siguientes entidades:
* **Usuario / Rol:** Manejo de credenciales de acceso para el sistema.
* **Profesor:** Entidad principal del personal docente.
* **Materia:** Asignatura vinculada directamente a un Profesor (Relación N:1).
* **Alumno:** Entidad que almacena los datos del estudiante.
* **Inscripción:** Tabla pivote (intermedia) que vincula Alumnos con Materias (Relación N:M).
* **Nota:** Registro de calificaciones que vincula a un Alumno con una Materia específica.

---

##  Cómo clonar y ejecutar el proyecto

Sigue estos pasos para desplegar el proyecto en tu entorno local:

### 1. Clonar el repositorio
Abre la terminal y ejecuta el siguiente comando:
```bash
git clone  https://github.com/Chris103105/Tercer_DesafioPract_DWF.git

2. Abrir en el IDE

Abre el proyecto en IntelliJ IDEA (o tu editor de preferencia).

Espera a que Maven/Gradle descargue todas las dependencias necesarias.

## Preparación de la Base de Datos

Asegúrate de tener MySQL corriendo (a través de WAMP, XAMPP o servicio local).

Crea una base de datos llamada desafio2.

Ejecuta el script desafio2.sql incluido en la raíz del proyecto para crear las tablas y cargar los datos de prueba.


##Configuración del Backend (Spring Boot)



Abre el archivo src/main/resources/application.properties y verifica que tus credenciales locales de MySQL sean correctas:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/desafio2?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_contraseña_aqui




Ejecución del Frontend
Al ser una aplicación basada en Vanilla JS, no necesitas compilar nada con Node.js.

Navega a la carpeta del frontend dentro del proyecto clonado.

Abre el archivo index.html directamente en tu navegador web.

Recomendación: Utiliza la extensión Live Server de VS Code para una mejor experiencia de desarrollo.

Inicia sesión con tus credenciales o registra un nuevo usuario en la pantalla principal para acceder al Dashboard.


Importante: Debes ejecutar el frontend utilizando la extensión Live Server de VS Code (o cualquier servidor local equivalente). Si abres el archivo index.html con doble clic directamente desde tus carpetas, el navegador bloqueará las peticiones a la API por políticas de seguridad (CORS).



Ejecuta la clase principal DesafioPract1Jb251834Application.


##Equipo de Desarrollo
Proyecto desarrollado colaborativamente por:

Christopher Steven  Jovel Beltran 
Odaly Rachel Cruz Franco
