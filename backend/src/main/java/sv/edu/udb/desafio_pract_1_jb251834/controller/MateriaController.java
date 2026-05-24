package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Materia;
import sv.edu.udb.desafio_pract_1_jb251834.repository.MateriaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    private final MateriaRepository materiaRepository;

    public MateriaController(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    @GetMapping
    public List<Materia> listarTodas() {
        return materiaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtenerPorId(@PathVariable Long id) {
        return materiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Materia guardar(@RequestBody Materia materia) {
        return materiaRepository.save(materia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @RequestBody Materia materiaActualizada) {
        return materiaRepository.findById(id)
                .map(materia -> {
                    materia.setNombre(materiaActualizada.getNombre());
                    // Importante: También actualizamos el profesor asignado
                    materia.setProfesor(materiaActualizada.getProfesor());
                    return ResponseEntity.ok(materiaRepository.save(materia));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable Long id) {
        return materiaRepository.findById(id)
                .map(materia -> {
                    materiaRepository.delete(materia);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}