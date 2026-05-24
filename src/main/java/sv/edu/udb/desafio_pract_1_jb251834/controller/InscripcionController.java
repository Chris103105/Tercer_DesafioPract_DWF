package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Inscripcion;
import sv.edu.udb.desafio_pract_1_jb251834.repository.InscripcionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
public class InscripcionController {

    private final InscripcionRepository repository;

    public InscripcionController(InscripcionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Inscripcion> obtenerTodas() {
        return repository.findAll();
    }

    // Ruta especial para obtener solo las inscripciones de una materia específica
    @GetMapping("/materia/{materiaId}")
    public List<Inscripcion> obtenerPorMateria(@PathVariable Long materiaId) {
        return repository.findByMateriaId(materiaId);
    }

    @PostMapping
    public Inscripcion crear(@RequestBody Inscripcion inscripcion) {
        return repository.save(inscripcion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return repository.findById(id).map(inscripcion -> {
            repository.delete(inscripcion);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}