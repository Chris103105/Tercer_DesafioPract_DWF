package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Profesor;
import sv.edu.udb.desafio_pract_1_jb251834.service.ProfesorService;

import java.util.List;
import java.util.Optional;

/**
 * Controller de la API de Profesores.
 * Gestiona el acceso y mantenimiento de la información del personal docente.
 */
@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    /**
     * Endpoint GET: Obtiene la lista completa de docentes registrados en el sistema.
     */
    @GetMapping
    public List<Profesor> listarTodos() {
        return profesorService.obtenerTodos();
    }

    /**
     * Endpoint GET con PathVariable: Recupera un docente específico mediante su identificador único.
     * Retorna un Optional para garantizar seguridad en la respuesta ante IDs no encontrados.
     */
    @GetMapping("/{id}")
    public Optional<Profesor> buscarPorId(@PathVariable Long id) {
        return profesorService.obtenerPorId(id);
    }

    /**
     * Endpoint POST: Almacena un nuevo registro de docente en la base de datos.
     */
    @PostMapping
    public Profesor crear(@RequestBody Profesor profesor) {
        return profesorService.guardar(profesor);
    }

    /**
     * Endpoint PUT: Actualiza la información de un docente existente.
     * Vinculamos el ID de la URL al objeto para asegurar la coherencia del registro a modificar.
     */
    @PutMapping("/{id}")
    public Profesor actualizar(@PathVariable Long id, @RequestBody Profesor profesor) {
        profesor.setId(id);
        return profesorService.guardar(profesor);
    }

    /**
     * Endpoint DELETE: Elimina la ficha de un docente del sistema.
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        profesorService.eliminar(id);
    }
}