
// LÓGICA DE PROFESORES (CON SWEETALERT2)

let idProfesorEditando = null;

// 1. CONTROLADORES DEL MODAL

function abrirModalProfesor() {
    idProfesorEditando = null;
    document.getElementById('modalProfesor').style.display = 'flex';
    document.getElementById('nombreProfesor').value = ''; 
    document.getElementById('tituloModalProfesor').innerText = 'Agregar Profesor';
}

function editarProfesor(id, nombre) {
    idProfesorEditando = id;
    document.getElementById('modalProfesor').style.display = 'flex';
    document.getElementById('nombreProfesor').value = nombre;
    document.getElementById('tituloModalProfesor').innerText = 'Editar Profesor';
}


//  GUARDAR O ACTUALIZAR (POST / PUT)

function guardarProfesor() {
    const nombre = document.getElementById('nombreProfesor').value.trim();
    
    if(!nombre) {
        return Swal.fire({ 
            icon: 'warning', 
            title: 'Campo vacío', 
            text: 'Por favor, ingresa el nombre del profesor.',
            background: '#1f2937', color: '#fff', confirmButtonColor: '#6366f1', heightAuto: false 
        });
    }

    const url = idProfesorEditando ? `http://localhost:8080/api/profesores/${idProfesorEditando}` : 'http://localhost:8080/api/profesores';
    const metodo = idProfesorEditando ? 'PUT' : 'POST';

    Swal.fire({
        title: 'Guardando registro...', 
        background: '#1f2937', color: '#fff',
        allowOutsideClick: false, heightAuto: false, 
        didOpen: () => { Swal.showLoading() }
    });

    fetch(url, {
        method: metodo,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre }) 
    })
    .then(r => { 
        if(r.ok) { 
            Swal.fire({
                icon: 'success', title: '¡Profesor Guardado!', text: 'El registro se actualizó correctamente.',
                background: '#1f2937', color: '#fff', confirmButtonColor: '#10b981',
                timer: 1500, showConfirmButton: false, heightAuto: false
            }).then(() => {
                cerrarModales(); 
                cargarProfesores(); 
            });
        } else {
            Swal.fire({ icon: 'error', title: 'Error al procesar', background: '#1f2937', color: '#fff', heightAuto: false });
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Fallo de red', text: 'No hay conexión con el backend.', background: '#1f2937', color: '#fff', heightAuto: false });
    });
}

// 3. D: ELIMINAR (DELETE)

function eliminarProfesor(id) {
    Swal.fire({
        title: '¿Eliminar este profesor?', 
        text: "Esta acción removerá el registro permanentemente.",
        icon: 'warning', 
        showCancelButton: true,
        background: '#1f2937', color: '#fff', 
        confirmButtonColor: '#ef4444', cancelButtonColor: '#6366f1', 
        heightAuto: false,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8080/api/profesores/${id}`, {
                method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
            }).then(r => { 
                if(r.ok) cargarProfesores(); 
            });
        }
    });
}


// 4. R: LEER (GET) Y RENDERIZAR TABLA

function cargarProfesores() {
    fetch('http://localhost:8080/api/profesores', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById('tablaProfesores');
        tbody.innerHTML = ''; 
        
        // Agregamos 'index' para la numeración estética visual
        data.forEach((p, index) => {
            tbody.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${p.nombre}</td>
                <td>
                    <button class="btn-editar" onclick="editarProfesor(${p.id}, '${p.nombre}')">Editar</button>
                    <button class="btn-borrar" onclick="eliminarProfesor(${p.id})">Borrar</button>
                </td>
            </tr>`;
        });
    })
    .catch(error => console.error("Error al cargar profesores:", error));
}