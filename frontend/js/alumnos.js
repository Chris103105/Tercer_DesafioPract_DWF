
// LÓGICA DE ALUMNOS


// State Management: Controla el contexto de la vista. 
// Si es null -> Modo Creación (POST). Si tiene un ID -> Modo Edición (PUT).
let idAlumnoEditando = null;

function abrirModalAlumno() {
    // Reseteamos el estado a 'creación' y limpiamos el DOM para evitar que queden datos fantasma
    idAlumnoEditando = null;
    document.getElementById('modalAlumno').style.display = 'flex';
    document.getElementById('nombreAlumno').value = ''; 
    document.getElementById('apellidoAlumno').value = ''; 
    document.getElementById('tituloModalAlumno').innerText = 'Agregar Alumno';
}

function editarAlumno(id, nombre, apellido) {
    // Inyectamos el payload en el estado global y poblamos los inputs para la edición
    idAlumnoEditando = id;
    document.getElementById('modalAlumno').style.display = 'flex';
    document.getElementById('nombreAlumno').value = nombre;
    document.getElementById('apellidoAlumno').value = apellido;
    document.getElementById('tituloModalAlumno').innerText = 'Editar Alumno';
}

function guardarAlumno() {
    // Extracción y limpieza del payload
    const nombre = document.getElementById('nombreAlumno').value.trim();
    const apellido = document.getElementById('apellidoAlumno').value.trim();
    
    // Early return: Validación temprana en el cliente para ahorrar peticiones innecesarias al backend
    if(!nombre || !apellido) {
        return Swal.fire({ 
            icon: 'warning', title: 'Campos incompletos', text: 'Completa todos los campos', 
            background: '#1f2937', color: '#fff', confirmButtonColor: '#6366f1', heightAuto: false 
        });
    }

    // Operador ternario para enrutar dinámicamente el endpoint y el verbo HTTP basándonos en el state
    const url = idAlumnoEditando ? `http://localhost:8080/api/alumnos/${idAlumnoEditando}` : 'http://localhost:8080/api/alumnos';
    const metodo = idAlumnoEditando ? 'PUT' : 'POST';

    // Bloqueamos la UI mientras se resuelve la promesa del fetch
    Swal.fire({
        title: 'Guardando...', background: '#1f2937', color: '#fff',
        allowOutsideClick: false, heightAuto: false, didOpen: () => { Swal.showLoading() }
    });

    // Petición asíncrona inyectando el JWT en los headers para autorizar la ruta en Spring Boot
    fetch(url, {
        method: metodo,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, apellido: apellido }) 
    }).then(r => { 
        if(r.ok) { 
            // Si el backend responde 200/201, confirmamos al usuario, cerramos modales y forzamos re-render de la tabla
            Swal.fire({ 
                icon: 'success', title: '¡Guardado!', 
                background: '#1f2937', color: '#fff', timer: 1500, showConfirmButton: false, heightAuto: false 
            }).then(() => {
                cerrarModales(); 
                cargarAlumnos(); 
            });
        } 
    });
}

function eliminarAlumno(id) {
    // Intercepción de la acción destructiva con SweetAlert2 para evitar borrados accidentales
    Swal.fire({
        title: '¿Eliminar este alumno?',
        icon: 'warning',
        showCancelButton: true,
        background: '#1f2937', color: '#fff',
        confirmButtonColor: '#ef4444', cancelButtonColor: '#6366f1',
        heightAuto: false,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Ejecución del DELETE asíncrono
            fetch(`http://localhost:8080/api/alumnos/${id}`, {
                method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
            }).then(r => { 
                // Si la respuesta es exitosa, refrescamos el DOM
                if(r.ok) cargarAlumnos(); 
            });
        }
    });
}

function cargarAlumnos() {
    // GET request para obtener la colección completa de alumnos
    fetch('http://localhost:8080/api/alumnos', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaAlumnos');
        // Limpiamos el nodo antes del bucle de renderizado para evitar datos duplicados
        tbody.innerHTML = ''; 
        
        // Iteramos el JSON armando filas dinámicas con template literals.
        // Se inyecta directamente el ID y los parámetros a las funciones de los botones.
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