
// R: CARGAR LISTAS PARA INSCRIPCIONES

function cargarListasParaInscripcion() {
    // Disparamos dos peticiones GET concurrentes para poblar los dropdowns.
    // Esto hidrata la vista con los catálogos más recientes de la base de datos.
    
    // Promesa 1: Catálogo de Alumnos
    fetch('http://localhost:8080/api/alumnos', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(alumnos => {
        const select = document.getElementById('selectAlumnoInsc');
        // Limpiamos el select y dejamos la opción por defecto
        select.innerHTML = '<option value="">Seleccionar Alumno...</option>';
        // Iteramos inyectando el value (ID) para el backend y el label (Nombre) para el usuario
        alumnos.forEach(a => select.innerHTML += `<option value="${a.id}">${a.nombre} ${a.apellido}</option>`);
    });

    // Promesa 2: Catálogo de Materias
    fetch('http://localhost:8080/api/materias', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(materias => {
        const select = document.getElementById('selectMateriaInsc');
        select.innerHTML = '<option value="">Seleccionar Materia...</option>';
        materias.forEach(m => select.innerHTML += `<option value="${m.id}">${m.nombre}</option>`);
    });
}

// FUNCIONES DEL MODAL (UI Flow)

function abrirModalInscripcion() {
    // Revelamos el modal sobrescribiendo la clase oculta con un display flex
    document.getElementById('modalInscripcion').style.display = 'flex';
    // Forzamos la recarga de las listas cada vez que se abre el modal para evitar datos obsoletos
    cargarListasParaInscripcion(); 
}

function guardarInscripcion() {
    // Extracción de las llaves primarias seleccionadas en el DOM
    const idAlumno = document.getElementById('selectAlumnoInsc').value;
    const idMateria = document.getElementById('selectMateriaInsc').value;

    // Early return: Validación de integridad referencial en el cliente.
    // Evitamos un HTTP 400 Bad Request si faltan datos.
    if(!idAlumno || !idMateria) {
        return Swal.fire({ icon: 'warning', title: 'Datos incompletos', background: '#0f2027', color: '#fff', heightAuto: false });
    }

    // Bloqueo de UI (Feedback visual de carga asíncrona)
    Swal.fire({ title: 'Inscribiendo...', background: '#0f2027', color: '#fff', allowOutsideClick: false, heightAuto: false, didOpen: () => { Swal.showLoading() } });

    // Petición POST para insertar en la tabla intermedia.
    fetch('http://localhost:8080/api/inscripciones', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        // Construimos un DTO (Data Transfer Object) anidado.
        // Spring Boot y JPA esperan objetos instanciados por ID para mapear las relaciones @ManyToOne.
        body: JSON.stringify({ alumno: { id: parseInt(idAlumno) }, materia: { id: parseInt(idMateria) } }) 
    })
    .then(r => {
        // Resolvemos la UI tras el 201 Created / 200 OK
        if(r.ok) {
            Swal.fire({ icon: 'success', title: 'Inscripción exitosa', background: '#0f2027', color: '#fff', timer: 1500, showConfirmButton: false, heightAuto: false })
            .then(() => { cerrarModales(); cargarInscripciones(); });
        }
    });
}

// LECTURA Y ELIMINACIÓN DE INSCRIPCIONES (GET / DELETE)

function cargarInscripciones() {
    // Petición GET para leer la tabla pivote resuelta (trae los objetos completos, no solo los IDs)
    fetch('http://localhost:8080/api/inscripciones', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaInscripciones');
        // Purgamos el nodo contenedor
        tbody.innerHTML = '';
        
        data.forEach(i => {
            // Null safety checks: Operadores ternarios para manejar registros huérfanos
            // Si la relación existe, renderizamos el string; si no (fue borrado en cascada o es null), mostramos 'N/A'
            const nAlumno = i.alumno ? `${i.alumno.nombre} ${i.alumno.apellido}` : 'N/A';
            const nMateria = i.materia ? i.materia.nombre : 'N/A';
            
            // Construcción del template literal dinámico inyectando los datos hidratados
            tbody.innerHTML += `<tr>
                <td>${i.id}</td><td>${nAlumno}</td><td>${nMateria}</td>
                <td><button class="btn-borrar" onclick="eliminarInscripcion(${i.id})">Borrar</button></td>
            </tr>`;
        });
    });
}

function eliminarInscripcion(id) {
    // Intercepción de borrado con alerta de confirmación asíncrona
    Swal.fire({ title: '¿Eliminar inscripción?', icon: 'warning', showCancelButton: true, background: '#0f2027', color: '#fff', confirmButtonColor: '#ff4757', heightAuto: false })
    .then((result) => {
        if (result.isConfirmed) {
            // Se ejecuta el verbo DELETE hacia el endpoint específico y se recarga el state visual
            fetch(`http://localhost:8080/api/inscripciones/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } })
            .then(r => { if(r.ok) cargarInscripciones(); });
        }
    });
}