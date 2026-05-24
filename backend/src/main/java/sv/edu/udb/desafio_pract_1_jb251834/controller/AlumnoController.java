package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Alumno;
import sv.edu.udb.desafio_pract_1_jb251834.repository.AlumnoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    private final AlumnoRepository alumnoRepository;

    public AlumnoController(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @GetMapping
    public List<Alumno> listarTodos() {
        return alumnoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id) {
        return alumnoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alumno guardar(@RequestBody Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> actualizar(@PathVariable Long id, @RequestBody Alumno alumnoActualizado) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumno.setNombre(alumnoActualizado.getNombre());
                    alumno.setApellido(alumnoActualizado.getApellido());
                    // Actualizamos las materias inscritas
                    alumno.setMaterias(alumnoActualizado.getMaterias());
                    return ResponseEntity.ok(alumnoRepository.save(alumno));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable Long id) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumnoRepository.delete(alumno);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}