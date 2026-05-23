package sv.edu.udb.desafio_pract_1_jb251834.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Alumno;
import sv.edu.udb.desafio_pract_1_jb251834.repository.AlumnoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service que centraliza la lógica de negocio para la entidad Alumno.
 * Actúa como puente entre el Controller y el Repository.
 */
@Service
public class AlumnoService {

    // Inyección del repositorio para realizar operaciones CRUD sobre la BD
    @Autowired
    private AlumnoRepository alumnoRepository;

    /**
     * Recupera todos los registros de alumnos almacenados en la base de datos.
     */
    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll();
    }

    /**
     * Busca un alumno específico por su ID.
     * @param id Identificador único del alumno.
     * @return Optional que puede contener el alumno si existe.
     */
    public Optional<Alumno> obtenerPorId(Long id) {
        return alumnoRepository.findById(id);
    }

    /**
     * Persiste o actualiza un objeto Alumno en la base de datos.
     * Si el ID ya existe, JPA realiza un UPDATE; de lo contrario, un INSERT.
     */
    public Alumno guardar(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    /**
     * Elimina un registro de alumno de la base de datos de forma permanente.
     */
    public void eliminar(Long id) {
        alumnoRepository.deleteById(id);
    }
}