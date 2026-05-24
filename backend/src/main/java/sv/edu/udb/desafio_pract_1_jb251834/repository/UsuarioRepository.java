package sv.edu.udb.desafio_pract_1_jb251834.repository;

import sv.edu.udb.desafio_pract_1_jb251834.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Este método es oro puro. Spring Boot lo lee y automáticamente
    // sabe que debe hacer un "SELECT * FROM usuarios WHERE username = ?"
    Optional<Usuario> findByUsername(String username);

    // Útil para validar que no se registren dos personas con el mismo usuario
    Boolean existsByUsername(String username);
}