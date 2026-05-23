package sv.edu.udb.desafio_pract_1_jb251834.repository;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;


//  El identificador (ID) de cada maestro es un número de tipo "Long".
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {


}