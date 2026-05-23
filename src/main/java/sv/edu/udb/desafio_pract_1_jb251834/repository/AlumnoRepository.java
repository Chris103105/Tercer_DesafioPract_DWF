package sv.edu.udb.desafio_pract_1_jb251834.repository;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;

// Declaramos una "interfaz" en lugar de una clase normal.



//  El número de carnet o identificación (ID) de esos alumnos es de tipo "Long".
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    // Las llaves están completamente vacías porque no necesitamos programar nada a mano.
    // Spring Boot ya nos regaló las funciones de guardar, buscar, editar y borrar por defecto.
}