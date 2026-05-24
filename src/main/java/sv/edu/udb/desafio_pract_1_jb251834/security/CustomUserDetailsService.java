package sv.edu.udb.desafio_pract_1_jb251834.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Usuario;
import sv.edu.udb.desafio_pract_1_jb251834.repository.UsuarioRepository;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    // Conectamos el repositorio para poder buscar los usuarios en WAMP/MySQL
    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscamos al usuario por su nombre. Si no existe, lanzamos un error.
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el nombre: " + username));

        // Le traducimos los datos a Spring Boot (Nombre, Contraseña y su Rol de acceso)
        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(usuario.getRole()))
        );
    }
}