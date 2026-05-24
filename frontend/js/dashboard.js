
// ESCUDO DE SEGURIDAD Y SESIÓN 

// Recuperamos el JSON Web Token (JWT) almacenado durante el login.
const token = localStorage.getItem('jwtToken');

// Middleware de frontend: Si no hay token, abortamos la carga y redirigimos al login.
// Esto evita accesos no autorizados si el usuario escribe la URL del dashboard directamente.
if (!token) window.location.href = 'index.html';

function cerrarSesion() {
    // Destruimos el token local (invalidación de sesión en el cliente) y redirigimos.
    localStorage.removeItem('jwtToken');
    window.location.href = 'index.html';
}


// SISTEMA DE NAVEGACIÓN (SPA Router Pattern)

function mostrarSeccion(seccion) {
    // 1. Reset Visual (Ocultamos todo primero)
    // Utilizamos clases utilitarias de CSS (display: none) para sacar las vistas del DOM activo.
    document.getElementById('seccionProfesores').classList.add('seccion-oculta');
    document.getElementById('seccionAlumnos').classList.add('seccion-oculta');
    
    // 2. Reset de UI del Menú (Quitamos el estado 'active' de los botones)
    document.getElementById('btnProfesores').classList.remove('active');
    document.getElementById('btnAlumnos').classList.remove('active');

    // 3. Enrutamiento Condicional
    // Evaluamos el parámetro y revelamos únicamente la vista solicitada, disparando su petición GET.
    if(seccion === 'profesores') {
        document.getElementById('seccionProfesores').classList.remove('seccion-oculta');
        document.getElementById('btnProfesores').classList.add('active');
        cargarProfesores();
    } else if(seccion === 'alumnos') {
        document.getElementById('seccionAlumnos').classList.remove('seccion-oculta');
        document.getElementById('btnAlumnos').classList.add('active');
        cargarAlumnos();
    }
}

function cerrarModales() {
    // Función utilitaria para forzar el cierre de todas las ventanas emergentes.
    // Útil para limpiar la pantalla tras un CRUD exitoso o una cancelación.
    document.getElementById('modalProfesor').style.display = 'none';
    document.getElementById('modalAlumno').style.display = 'none';
}

// LÓGICA DE PROFESORES (CRUD)

// State Management: Variable bandera para saber si estamos creando (null) o editando (ID).
let idProfesorEditando = null;

function abrirModalProfesor() {
    // Seteamos el estado a 'Creación' y purgamos el input para evitar datos cacheados.
    idProfesorEditando = null;
    document.getElementById('modalProfesor').style.display = 'flex';
    document.getElementById('nombreProfesor').value = ''; 
    document.getElementById('tituloModalProfesor').innerText = 'Agregar Profesor';
}

function editarProfesor(id, nombre) {
    // Hydratamos el DOM y el estado global con los datos provenientes del ciclo iterativo de la tabla.
    idProfesorEditando = id;
    document.getElementById('modalProfesor').style.display = 'flex';
    document.getElementById('nombreProfesor').value = nombre;
    document.getElementById('tituloModalProfesor').innerText = 'Editar Profesor';
}

function guardarProfesor() {
    // Extracción de datos y sanitización básica (trim).
    const nombre = document.getElementById('nombreProfesor').value.trim();
    
    // Early Return: Frenamos la ejecución si el payload está vacío para no saturar el backend.
    if(!nombre) return alert("Ingresa el nombre");

    // Lógica dinámica de enrutamiento:
    // Si idProfesorEditando tiene un valor (true), usamos PUT hacia el endpoint específico.
    // Si es null (false), usamos POST hacia la colección general.
    const url = idProfesorEditando ? `http://localhost:8080/api/profesores/${idProfesorEditando}` : 'http://localhost:8080/api/profesores';
    const metodo = idProfesorEditando ? 'PUT' : 'POST';

    // Petición asíncrona inyectando el token JWT en la cabecera para autorización.
    fetch(url, {
        method: metodo,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre }) 
    }).then(r => { 
        // Si el backend devuelve status 20x, repintamos la UI.
        if(r.ok) { cerrarModales(); cargarProfesores(); } 
    });
}

function eliminarProfesor(id) {
    // Barrera de confirmación síncrona nativa.
    if(!confirm("¿Eliminar este profesor?")) return;
    
    // Ejecución asíncrona del verbo DELETE.
    fetch(`http://localhost:8080/api/profesores/${id}`, {
        method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => { 
        // Refrescamos el DOM sólo si la eliminación fue exitosa a nivel de base de datos.
        if(r.ok) cargarProfesores(); 
    });
}

function cargarProfesores() {
    // Petición GET solicitando el JSON del catálogo de profesores.
    fetch('http://localhost:8080/api/profesores', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaProfesores');
        // Limpiamos el nodo principal antes de iterar para evitar duplicación de registros.
        tbody.innerHTML = ''; 
        
        // Iteramos el arreglo y construimos el template literal dinámicamente.
        data.forEach(p => {
            tbody.innerHTML += `<tr>
                <td>${p.id}</td><td>${p.nombre}</td>
                <td>
                    <button class="btn-editar" onclick="editarProfesor(${p.id}, '${p.nombre}')">Editar</button>
                    <button class="btn-borrar" onclick="eliminarProfesor(${p.id})">Borrar</button>
                </td></tr>`;
        });
    });
}

// LÓGICA DE ALUMNOS (CRUD)


// State Management para módulo Alumnos
let idAlumnoEditando = null;

function abrirModalAlumno() {
    idAlumnoEditando = null;
    document.getElementById('modalAlumno').style.display = 'flex';
    document.getElementById('nombreAlumno').value = ''; 
    document.getElementById('apellidoAlumno').value = ''; 
    document.getElementById('tituloModalAlumno').innerText = 'Agregar Alumno';
}

function editarAlumno(id, nombre, apellido) {
    idAlumnoEditando = id;
    document.getElementById('modalAlumno').style.display = 'flex';
    document.getElementById('nombreAlumno').value = nombre;
    document.getElementById('apellidoAlumno').value = apellido;
    document.getElementById('tituloModalAlumno').innerText = 'Editar Alumno';
}

function guardarAlumno() {
    const nombre = document.getElementById('nombreAlumno').value.trim();
    const apellido = document.getElementById('apellidoAlumno').value.trim();
    
    // Early return para validación de campos obligatorios en el cliente.
    if(!nombre || !apellido) return alert("Completa todos los campos");

    // Selección dinámica de endpoint y método basándonos en el estado de edición.
    const url = idAlumnoEditando ? `http://localhost:8080/api/alumnos/${idAlumnoEditando}` : 'http://localhost:8080/api/alumnos';
    const metodo = idAlumnoEditando ? 'PUT' : 'POST';

    fetch(url, {
        method: metodo,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, apellido: apellido }) 
    }).then(r => { 
        if(r.ok) { cerrarModales(); cargarAlumnos(); } 
    });
}

function eliminarAlumno(id) {
    if(!confirm("¿Eliminar este alumno?")) return;
    
    fetch(`http://localhost:8080/api/alumnos/${id}`, {
        method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => { 
        if(r.ok) cargarAlumnos(); 
    });
}

function cargarAlumnos() {
    // Renderizado dinámico de la tabla de alumnos.
    fetch('http://localhost:8080/api/alumnos', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaAlumnos');
        tbody.innerHTML = ''; 
        data.forEach(a => {
            tbody.innerHTML += `<tr>
                <td>${a.id}</td><td>${a.nombre}</td><td>${a.apellido}</td>
                <td>
                    <button class="btn-editar" onclick="editarAlumno(${a.id}, '${a.nombre}', '${a.apellido}')">Editar</button>
                    <button class="btn-borrar" onclick="eliminarAlumno(${a.id})">Borrar</button>
                </td></tr>`;
        });
    });
}

// Inicializamos la vista por defecto al terminar de parsear el DOM.
window.onload = cargarProfesores;