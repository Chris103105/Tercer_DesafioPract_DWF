package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Profesor;
import sv.edu.udb.desafio_pract_1_jb251834.repository.ProfesorRepository;

import java.util.List;

@RestController
// Esta será la ruta base para todo lo que tenga que ver con profesores
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorRepository profesorRepository;

    // Inyectamos a nuestro "asistente" de la base de datos
    public ProfesorController(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    // 1. LEER TODOS (GET)
    @GetMapping
    public List<Profesor> listarTodos() {
        return profesorRepository.findAll();
    }

    // 2. LEER UNO SOLO (GET por ID)
    @GetMapping("/{id}")
    public ResponseEntity<Profesor> obtenerPorId(@PathVariable Long id) {
        return profesorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. CREAR NUEVO (POST)
    @PostMapping
    public Profesor guardar(@RequestBody Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    // 4. ACTUALIZAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizar(@PathVariable Long id, @RequestBody Profesor profesorActualizado) {
        return profesorRepository.findById(id)
                .map(profesor -> {
                    profesor.setNombre(profesorActualizado.getNombre());
                    return ResponseEntity.ok(profesorRepository.save(profesor));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. ELIMINAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable Long id) {
        return profesorRepository.findById(id)
                .map(profesor -> {
                    profesorRepository.delete(profesor);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}