package sv.edu.udb.desafio_pract_1_jb251834.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Materia;
import sv.edu.udb.desafio_pract_1_jb251834.repository.MateriaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service encargado de la lógica de negocio para la entidad Materia.
 * Centraliza las operaciones CRUD del catálogo de asignaturas.
 */
@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    /**
     * Recupera el catálogo completo de materias registradas.
     */
    public List<Materia> obtenerTodas() {
        return materiaRepository.findAll();
    }

    /**
     * Busca una materia específica por su ID.
     * @param id Identificador único de la asignatura.
     * @return Optional conteniendo la materia si se encuentra en la base de datos.
     */
    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }

    /**
     * Registra una nueva materia o actualiza una existente en el catálogo.
     */
    public Materia guardar(Materia materia) {
        return materiaRepository.save(materia);
    }

    /**
     * Elimina permanentemente una materia del sistema.
     */
    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}