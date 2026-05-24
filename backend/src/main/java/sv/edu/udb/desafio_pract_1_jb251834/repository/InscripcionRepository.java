package sv.edu.udb.desafio_pract_1_jb251834.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Inscripcion;
import java.util.List;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    // Este método nos servirá para filtrar a los alumnos por materia en el Frontend
    List<Inscripcion> findByMateriaId(Long materiaId);
}