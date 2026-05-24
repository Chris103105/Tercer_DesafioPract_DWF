// Variable global para controlar si editamos o creamos
let idNotaEditando = null;
// Copia local de las notas para el filtro rápido de la tabla principal
let listaGlobalNotas = []; 


// 1. CARGA INICIAL DE LISTAS (MODAL)

function cargarListasParaNotas(idMateriaSel = null, idAlumnoSel = null) {
    fetch('http://localhost:8080/api/materias', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(materias => {
        const selectMat = document.getElementById('selectMateriaNota');
        selectMat.innerHTML = '<option value="">1. Seleccionar Materia...</option>';
        
        materias.forEach(m => {
            const selected = (idMateriaSel == m.id) ? 'selected' : '';
            selectMat.innerHTML += `<option value="${m.id}" ${selected}>${m.nombre}</option>`;
        });

        document.getElementById('selectAlumnoNota').innerHTML = '<option value="">2. Esperando materia...</option>';
        
        if(idMateriaSel) {
            cargarAlumnosPorMateriaSeleccionada(idAlumnoSel);
        }
    });
}


// 2. FILTRADO EN TIEMPO REAL

function cargarAlumnosPorMateriaSeleccionada(idAlumnoSeleccionadoPreviamente = null) {
    const idMateria = document.getElementById('selectMateriaNota').value;
    const selectAlum = document.getElementById('selectAlumnoNota');

    if (!idMateria) {
        selectAlum.innerHTML = '<option value="">2. Esperando materia...</option>';
        return;
    }

    selectAlum.innerHTML = '<option value="">Cargando alumnos inscritos...</option>';

    fetch(`http://localhost:8080/api/inscripciones/materia/${idMateria}`, { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(inscripciones => {
        selectAlum.innerHTML = '<option value="">2. Seleccionar Alumno...</option>';
        
        if (inscripciones.length === 0) {
            selectAlum.innerHTML = '<option value="">No hay alumnos inscritos en esta materia</option>';
        } else {
            inscripciones.forEach(insc => {
                const a = insc.alumno;
                const selected = (idAlumnoSeleccionadoPreviamente == a.id) ? 'selected' : '';
                selectAlum.innerHTML += `<option value="${a.id}" ${selected}>${a.nombre} ${a.apellido}</option>`;
            });
        }
    })
    .catch(err => {
        console.error("Error al filtrar alumnos:", err);
        selectAlum.innerHTML = '<option value="">Error al cargar alumnos</option>';
    });
}


// 3. CONTROLADORES DE MODALES

function abrirModalNota() {
    idNotaEditando = null;
    document.getElementById('modalNota').style.display = 'flex';
    document.getElementById('valorNota').value = '';
    document.getElementById('tituloModalNota').innerText = 'Agregar Nota';
    cargarListasParaNotas(); 
}

function editarNota(id, valor, idAlumno, idMateria) {
    idNotaEditando = id;
    document.getElementById('modalNota').style.display = 'flex';
    document.getElementById('valorNota').value = valor;
    document.getElementById('tituloModalNota').innerText = 'Editar Nota';
    cargarListasParaNotas(idMateria, idAlumno); 
}


// 4. ACCIONES CRUD: GUARDAR (POST / PUT)

function guardarNota() {
    const idMateria = document.getElementById('selectMateriaNota').value;
    const idAlumno = document.getElementById('selectAlumnoNota').value;
    const valor = document.getElementById('valorNota').value;

    if(!idAlumno || !idMateria || !valor) {
        return Swal.fire({ 
            icon: 'warning', title: 'Campos incompletos', 
            text: 'Debes seleccionar una materia, un alumno inscrito y asignar una nota.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#00f3ff', heightAuto: false 
        });
    }

    const url = idNotaEditando ? `http://localhost:8080/api/notas/${idNotaEditando}` : 'http://localhost:8080/api/notas';
    const metodo = idNotaEditando ? 'PUT' : 'POST';

    Swal.fire({
        title: 'Registrando calificación...', background: '#0f2027', color: '#fff',
        allowOutsideClick: false, heightAuto: false, didOpen: () => { Swal.showLoading() }
    });

    fetch(url, {
        method: metodo,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            calificacion: parseFloat(valor),
            alumno: { id: parseInt(idAlumno) }, 
            materia: { id: parseInt(idMateria) } 
        }) 
    })
    .then(response => {
        if(response.ok) {
            Swal.fire({
                icon: 'success', title: '¡Nota Guardada!', text: 'El registro se actualizó correctamente.',
                background: '#0f2027', color: '#fff', confirmButtonColor: '#2ed573',
                timer: 1500, showConfirmButton: false, heightAuto: false
            }).then(() => {
                cerrarModales(); 
                
                const filtroElement = document.getElementById('filtroMateria');
                if(filtroElement) filtroElement.value = 'TODAS';
                
                idNotaEditando = null; 
                cargarNotas(); 
            });
        } else {
            Swal.fire({ icon: 'error', title: 'Error al procesar', text: 'Verifica los parámetros del servidor.', background: '#0f2027', color: '#fff', heightAuto: false });
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Fallo de red', text: 'No hay conexión con el backend.', background: '#0f2027', color: '#fff', heightAuto: false });
    });
}


// 5. ACCIONES CRUD: LEER Y FILTRAR TABLA

function cargarNotas() {
    fetch('http://localhost:8080/api/notas', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(r => r.json())
    .then(data => {
        // Dejamos el detective activado por si acaso
        console.log("👉 DATOS RECIBIDOS DESDE JAVA:", data); 
        
        listaGlobalNotas = data; 
        actualizarSelectFiltro();
        aplicarFiltroNotas(); 
    })
    .catch(error => console.error("Error al cargar la tabla de notas:", error));
}

function actualizarSelectFiltro() {
    const selectFiltro = document.getElementById('filtroMateria');
    if(!selectFiltro) return;
    
    const valorActual = selectFiltro.value; 
    const materiasUnicas = [...new Set(listaGlobalNotas.map(n => n.materia ? n.materia.nombre : 'Desconocida'))];
    
    selectFiltro.innerHTML = '<option value="TODAS">Todas las materias</option>';
    materiasUnicas.forEach(materia => {
        const selected = (valorActual === materia) ? 'selected' : '';
        selectFiltro.innerHTML += `<option value="${materia}" ${selected}>${materia}</option>`;
    });
}

function aplicarFiltroNotas() {
    const selectFiltro = document.getElementById('filtroMateria');
    if(!selectFiltro) return;
    
    const materiaFiltro = selectFiltro.value;
    const tbody = document.getElementById('tablaNotas');
    if(!tbody) return;
    
    tbody.innerHTML = '';
    
    const notesFiltradas = (materiaFiltro === 'TODAS') 
        ? listaGlobalNotas 
        : listaGlobalNotas.filter(n => n.materia && n.materia.nombre === materiaFiltro);

    notesFiltradas.forEach(n => {
        const nombreAlumno = n.alumno ? `${n.alumno.nombre} ${n.alumno.apellido}` : 'Desconocido';
        const nombreMateria = n.materia ? n.materia.nombre : 'Desconocida';
        const idAlum = n.alumno ? n.alumno.id : null;
        const idMat = n.materia ? n.materia.id : null;
        
        // Bloque de seguridad contra valores nulos o palabras diferentes
        // Si Java manda "calificacion", usamos eso.
        const califNumerica = n.calificacion != null ? Number(n.calificacion) : 0;
        const colorNota = califNumerica >= 6 ? '#2ed573' : '#ff4757';

        tbody.innerHTML += `<tr>
            <td>${n.id}</td>
            <td>${nombreAlumno}</td>
            <td>${nombreMateria}</td>
            <td style="color: ${colorNota}; font-weight: bold; font-size: 1.1em;">${califNumerica.toFixed(1)}</td>
            <td>
                <button class="btn-editar" onclick="editarNota(${n.id}, ${califNumerica}, ${idAlum}, ${idMat})">Editar</button>
                <button class="btn-borrar" onclick="eliminarNota(${n.id})">Borrar</button>
            </td>
        </tr>`;
    });
}


// 6. ACCIONES CRUD: ELIMINAR (DELETE)

function eliminarNota(id) {
    Swal.fire({
        title: '¿Eliminar calificación?', text: "Esta acción removerá el registro permanentemente",
        icon: 'warning', showCancelButton: true,
        background: '#0f2027', color: '#fff', confirmButtonColor: '#ff4757', heightAuto: false
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8080/api/notas/${id}`, {
                method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
            }).then(r => { if(r.ok) cargarNotas(); });
        }
    });
}