const mensajeDiv = document.getElementById('mensaje');


// ALTERNAR FORMULARIOS 

function alternarFormularios() {
    // Capturamos los nodos del DOM de ambos contenedores
    const login = document.getElementById('seccionLogin');
    const registro = document.getElementById('seccionRegistro');
    
    // Reseteamos los inputs nativos para evitar que las credenciales 
    // se queden escritas al cambiar de vista (buena práctica de seguridad)
    document.getElementById('loginForm').reset();
    document.getElementById('registroForm').reset();

    // Lógica de toggle basada en clases CSS. 
    // Si el login está oculto, lo mostramos y ocultamos el registro, y viceversa.
    if (login.classList.contains('oculto')) {
        login.classList.remove('oculto');
        registro.classList.add('oculto');
    } else {
        login.classList.add('oculto');
        registro.classList.remove('oculto');
    }
}


// INICIAR SESIÓN (Generar JWT)

document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevenimos el recargo nativo del navegador (Single Page Application behavior)
    event.preventDefault();
    
    // Extracción y sanitización del payload (trim para evitar espacios en blanco por error)
    const user = document.getElementById('loginUser').value.trim(); 
    const pass = document.getElementById('loginPass').value;
    
    // --- 1. VALIDACIONES DE SEGURIDAD (Early Return) ---
    // Evitamos enviar peticiones HTTP nulas al servidor para ahorrar recursos
    if (user === '' || pass === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, ingresa tu usuario y contraseña.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#00f3ff',
            heightAuto: false // <--- EL TRUCO PARA QUE NO SALTE LA PANTALLA
        });
        return; 
    }

    // --- 2. MOSTRAR CARGA (UX Feedback) ---
    // Bloqueamos la interfaz asíncronamente mientras el fetch espera el response
    Swal.fire({
        title: 'Verificando...',
        text: 'Conectando con el servidor',
        background: '#0f2027', color: '#fff',
        allowOutsideClick: false,
        heightAuto: false, // <--- APLICADO AQUÍ TAMBIÉN
        didOpen: () => { Swal.showLoading() }
    });

    // --- 3. PETICIÓN AL BACKEND (Auth Endpoint) ---
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    })
    .then(async response => {
        // Parseo seguro: verificamos si el backend nos devolvió un JSON o un String/Error
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        
        // Si el status HTTP no es 2xx, lanzamos la excepción hacia el bloque catch
        if (!response.ok) throw new Error(data?.message || 'Credenciales incorrectas');
        return data;
    })
    .then(data => {
        // --- 4. ÉXITO (Persistencia de Sesión) ---
        // Guardamos el JWT en el almacenamiento local del navegador para usarlo en las rutas protegidas
        localStorage.setItem('jwtToken', data.token);
        
        Swal.fire({
            icon: 'success',
            title: '¡Acceso Concedido!',
            text: 'Preparando tu panel de control...',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#2ed573',
            timer: 1500, 
            showConfirmButton: false,
            heightAuto: false
        }).then(() => {
            // Redirección al área privada una vez finalizada la alerta
            window.location.href = 'dashboard.html';
        });
    })
    .catch(error => {
        // --- 5. ERROR DE CREDENCIALES (Manejo de Excepciones) ---
        // Captura errores 401 (Unauthorized) o 403 (Forbidden)
        Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: error.message,
            background: '#0f2027', color: '#fff', confirmButtonColor: '#ff4757',
            heightAuto: false
        });
    });
});


// REGISTRAR NUEVO USUARIO

document.getElementById('registroForm').addEventListener('submit', function(event) {
    // Prevenimos el recargo nativo
    event.preventDefault();
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value;
    
    // --- 1. VALIDACIONES DE REGISTRO (Client-Side Constraints) ---
    if (user === '' || pass === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Incompletos',
            text: 'Debes llenar todos los datos para crear tu cuenta.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#00f3ff',
            heightAuto: false
        });
        return;
    }

    // Restricción de longitud para cumplir con políticas de seguridad básicas
    if (pass.length < 5) {
        Swal.fire({
            icon: 'info',
            title: 'Contraseña muy corta',
            text: 'Por seguridad, la contraseña debe tener al menos 5 caracteres.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#00f3ff',
            heightAuto: false
        });
        return;
    }

    // --- 2. MOSTRAR CARGA ---
    Swal.fire({
        title: 'Creando cuenta...',
        background: '#0f2027', color: '#fff',
        allowOutsideClick: false,
        heightAuto: false,
        didOpen: () => { Swal.showLoading() }
    });

    // --- 3. PETICIÓN AL BACKEND (User Registration Endpoint) ---
    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Enviamos el DTO inyectando un rol por defecto (ROLE_USER) para cumplir con Spring Security
        body: JSON.stringify({ username: user, password: pass, role: "ROLE_USER" })
    })
    .then(async response => {
        if (!response.ok) {
            // Manejo de Data Integrity Exceptions (ej. Usuario duplicado - HTTP 409 o 400)
            const textError = await response.text();
            throw new Error(textError || 'Error al registrar el usuario');
        }
        return response.text();
    })
    .then(data => {
        // --- 4. ÉXITO ---
        Swal.fire({
            icon: 'success',
            title: '¡Usuario Registrado!',
            text: 'Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#2ed573',
            heightAuto: false
        }).then(() => {
            // Retornamos automáticamente al formulario de Login tras registrarse
            alternarFormularios(); 
        });
    })
    .catch(error => {
        // --- 5. ERROR ---
        Swal.fire({
            icon: 'error',
            title: 'No se pudo crear la cuenta',
            text: 'Es posible que el nombre de usuario ya esté en uso.',
            background: '#0f2027', color: '#fff', confirmButtonColor: '#ff4757',
            heightAuto: false
        });
    });
});