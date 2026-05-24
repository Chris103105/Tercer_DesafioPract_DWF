package sv.edu.udb.desafio_pract_1_jb251834.repository;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;



//  El identificador único (ID) de cada materia es un número de tipo "Long".
public interface MateriaRepository extends JpaRepository<Materia, Long> {


}