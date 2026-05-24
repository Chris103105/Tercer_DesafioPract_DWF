let idMateriaEditando = null;

// LECTURA DE PROFESORES PARA EL SELECT

function cargarProfesoresParaSelect(idSeleccionado = null) {
    fetch('http://localhost:8080/api/profesores', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(r => r.json())
    .then(profesores => {
        const select = document.getElementById('selectProfesor');
        select.innerHTML = '<option value="">Seleccionar Profesor...</option>';
        
        profesores.forEach(p => {
            const selected = (idSeleccionado == p.id) ? 'selected' : '';
            select.innerHTML += `<option value="${p.id}" ${selected}>${p.nombre}</option>`;
        });
    });
}

// FUNCIONES DEL MODAL

function abrirModalMateria() {
    idMateriaEditando = null;
    document.getElementById('modalMateria').style.display = 'flex';
    document.getElementById('nombreMateria').value = '';
    document.getElementById('tituloModalMateria').innerText = 'Agregar Materia';
    cargarProfesoresParaSelect(); // Cargamos los profes al abrir
}

function editarMateria(id, nombre, idProfesor) {
    idMateriaEditando = id;
    document.getElementById('modalMateria').style.display = 'flex';
    document.getElementById('nombreMateria').value = nombre;
    document.getElementById('tituloModalMateria').innerText = 'Editar Materia';
    cargarProfesoresParaSelect(idProfesor); // Seleccionamos al profe actual
}


// C y U: GUARDAR O ACTUALIZAR (POST / PUT)

function guardarMateria() {
    const nombre = document.getElementById('nombreMateria').value.trim();
    const idProfesor = document.getElementById('selectProfesor').value;

    // Validación previa para evitar enviar datos vacíos a Java
    if(!nombre || !idProfesor) {
        return Swal.fire({ 
            icon: 'warning', 
            title: 'Campos incompletos', 
            text: 'Por favor, ingresa el nombre de la materia y selecciona un profesor.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#00f3ff', 
            heightAuto: false 
        });
    }

    const url = idMateriaEditando ? `http://localhost:8080/api/materias/${idMateriaEditando}` : 'http://localhost:8080/api/materias';
    const metodo = idMateriaEditando ? 'PUT' : 'POST';

    // Mostramos alerta de carga
    Swal.fire({
        title: 'Guardando materia...',
        background: '#0f2027', color: '#fff',
        allowOutsideClick: false, heightAuto: false,
        didOpen: () => { Swal.showLoading() }
    });

    fetch(url, {
        method: metodo,
        headers: { 
            'Authorization': 'Bearer ' + token, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            nombre: nombre, 
            profesor: { id: parseInt(idProfesor) } // Conexión crucial con Spring Boot
        }) 
    })
    .then(response => {
        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Materia Guardada!',
                text: 'La materia se registró correctamente en el sistema.',
                background: '#0f2027', color: '#fff', confirmButtonColor: '#2ed573',
                timer: 1500,
                showConfirmButton: false,
                heightAuto: false
            }).then(() => {
                // Alerta terminada, cerramos ventana y recargamos tabla
                cerrarModales(); 
                cargarMaterias(); 
            });
        } else {
            Swal.fire({ 
                icon: 'error', 
                title: 'Error al guardar', 
                text: 'El servidor no pudo procesar la materia.', 
                background: '#0f2027', color: '#fff', heightAuto: false 
            });
        }
    })
    .catch(error => {
        console.error("Error crítico en la petición:", error);
        Swal.fire({ 
            icon: 'error', 
            title: 'Fallo de conexión', 
            text: 'No se pudo conectar con el servidor backend.', 
            background: '#0f2027', color: '#fff', heightAuto: false 
        });
    });
}


// R: LEER TODOS (GET)
function cargarMaterias() {
    fetch('http://localhost:8080/api/materias', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaMaterias');
        tbody.innerHTML = '';
        data.forEach(m => {
            tbody.innerHTML += `<tr>
                <td>${m.id}</td>
                <td>${m.nombre}</td>
                <td>${m.profesor ? m.profesor.nombre : 'Sin asignar'}</td>
                <td>
                    <button class="btn-editar" onclick="editarMateria(${m.id}, '${m.nombre}', ${m.profesor ? m.profesor.id : null})">Editar</button>
                    <button class="btn-borrar" onclick="eliminarMateria(${m.id})">Borrar</button>
                </td>
            </tr>`;
        });
    });
}


// D: ELIMINAR (DELETE)

function eliminarMateria(id) {
    Swal.fire({
        title: '¿Eliminar materia?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        background: '#0f2027', color: '#fff', confirmButtonColor: '#ff4757', heightAuto: false
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8080/api/materias/${id}`, {
                method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
            }).then(r => { if(r.ok) cargarMaterias(); });
        }
    });
}