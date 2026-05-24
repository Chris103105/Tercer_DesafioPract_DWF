package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.dto.LoginDto;
import sv.edu.udb.desafio_pract_1_jb251834.dto.RegistroDto;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Usuario;
import sv.edu.udb.desafio_pract_1_jb251834.repository.UsuarioRepository;
import sv.edu.udb.desafio_pract_1_jb251834.security.JwtTokenProvider;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    // Inyectamos todas las herramientas necesarias
    public AuthController(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    // ==========================================
    // 1. RUTA DE REGISTRO (Crear cuenta nueva)
    // ==========================================
    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroDto registroDto) {

        // Verificamos si el usuario ya existe en la base de datos (WAMP)
        if (usuarioRepository.existsByUsername(registroDto.getUsername())) {
            return new ResponseEntity<>("Error: El nombre de usuario ya está en uso", HttpStatus.BAD_REQUEST);
        }

        // Creamos la nueva entidad Usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(registroDto.getUsername());

        // ¡Magia de seguridad! Encriptamos la contraseña antes de guardarla
        nuevoUsuario.setPassword(passwordEncoder.encode(registroDto.getPassword()));

        // Asignamos el rol (si no envían uno, por defecto será ROLE_USER)
        nuevoUsuario.setRole(registroDto.getRole() != null ? registroDto.getRole() : "ROLE_USER");

        // Guardamos en MySQL
        usuarioRepository.save(nuevoUsuario);

        return new ResponseEntity<>("Usuario registrado exitosamente", HttpStatus.CREATED);
    }

    // ==========================================
    // 2. RUTA DE LOGIN (Generar el Token JWT)
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> autenticarUsuario(@RequestBody LoginDto loginDto) {

        // El AuthenticationManager verifica que el usuario y la contraseña coincidan con los de MySQL
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                )
        );

        // Si las credenciales son correctas, le damos luz verde en el contexto de Spring
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Nuestra "Máquina de credenciales" fabrica el Token JWT
        String tokenGenerado = tokenProvider.generarToken(authentication);

        // Devolvemos el Token al sitio web en formato JSON
        return ResponseEntity.ok(Collections.singletonMap("token", tokenGenerado));
    }
}