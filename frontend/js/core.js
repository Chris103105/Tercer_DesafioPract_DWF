
// SEGURIDAD Y SESIÓN 


// Extraemos el JWT del almacenamiento local. Este token fue generado por Spring Security en el Login.
const token = localStorage.getItem('jwtToken');

// Middleware básico de Frontend: Si el payload no existe, expulsamos al usuario al index (Login).
// Esto protege las vistas de accesos no autorizados mediante manipulación de URL.
if (!token) window.location.href = 'index.html';

function cerrarSesion() {
    // Destruimos el token del navegador para invalidar la sesión en el cliente
    localStorage.removeItem('jwtToken');
    window.location.href = 'index.html';
}


// SISTEMA DE NAVEGACIÓN 

function mostrarSeccion(seccion) {
    // 1. Ocultamos absolutamente todas las vistas (Reset visual)
    // Usamos un array para iterar sobre los IDs y evitar código repetitivo (DRY - Don't Repeat Yourself)
    const vistas = [
        'seccionMenu', 
        'seccionProfesores', 
        'seccionAlumnos', 
        'seccionMaterias', 
        'seccionInscripciones', 
        'seccionNotas'
    ];
    
    // Iteramos aplicando la clase CSS 'seccion-oculta' (display: none) para sacar los nodos del flujo visual
    vistas.forEach(id => {
        const elemento = document.getElementById(id);
        if(elemento) elemento.classList.add('seccion-oculta');
    });

    // 2. Mostramos únicamente la sección solicitada y aplicamos "Lazy Loading" de datos
    // Dependiendo de la vista seleccionada, removemos la clase oculta y disparamos el fetch correspondiente
    if(seccion === 'menu') {
        document.getElementById('seccionMenu').classList.remove('seccion-oculta');
    } else if(seccion === 'profesores') {
        document.getElementById('seccionProfesores').classList.remove('seccion-oculta');
        cargarProfesores();
    } else if(seccion === 'alumnos') {
        document.getElementById('seccionAlumnos').classList.remove('seccion-oculta');
        cargarAlumnos();
    } else if(seccion === 'materias') {
        document.getElementById('seccionMaterias').classList.remove('seccion-oculta');
        cargarMaterias();
    } else if(seccion === 'inscripciones') {
        document.getElementById('seccionInscripciones').classList.remove('seccion-oculta');
        cargarInscripciones();
    } else if(seccion === 'notas') {
        document.getElementById('seccionNotas').classList.remove('seccion-oculta');
        cargarNotas();
    }
}

// CONTROL DE VENTANAS EMERGENTES (MODALES)

function cerrarModales() {
    // Utility function: Cierra cualquier modal que esté abierto en el DOM
    // Útil para resetear el estado visual después de un POST/PUT exitoso o al darle "Cancelar"
    const modales = ['modalProfesor', 'modalAlumno', 'modalMateria', 'modalInscripcion', 'modalNota'];
    modales.forEach(id => {
        const modal = document.getElementById(id);
        // Se inyecta display 'none' en línea para sobreescribir el 'flex' aplicado al abrir
        if(modal) modal.style.display = 'none';
    });
}


// ARRANQUE DEL SISTEMA 

// Hook de inicialización: Una vez que el DOM está completamente cargado y parseado,
// inyectamos el estado inicial de la aplicación (mostrando el Grid de Tarjetas).
window.onload = () => {
    mostrarSeccion('menu');
};