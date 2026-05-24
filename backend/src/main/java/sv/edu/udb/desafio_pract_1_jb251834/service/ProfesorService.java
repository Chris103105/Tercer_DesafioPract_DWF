package sv.edu.udb.desafio_pract_1_jb251834.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Profesor;
import sv.edu.udb.desafio_pract_1_jb251834.repository.ProfesorRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service que maneja la lógica de negocio para la entidad Profesor.
 * Centraliza las operaciones para la administración del personal docente.
 */
@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    /**
     * Recupera la nómina completa de docentes registrados en el sistema.
     */
    public List<Profesor> obtenerTodos() {
        return profesorRepository.findAll();
    }

    /**
     * Busca un docente específico por su ID.
     * @param id Identificador único del profesor.
     * @return Optional con el objeto Profesor encontrado.
     */
    public Optional<Profesor> obtenerPorId(Long id) {
        return profesorRepository.findById(id);
    }

    /**
     * Persiste un nuevo registro de docente o actualiza la información de uno existente.
     */
    public Profesor guardar(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    /**
     * Elimina permanentemente la ficha de un docente de la base de datos.
     */
    public void eliminar(Long id) {
        profesorRepository.deleteById(id);
    }
}