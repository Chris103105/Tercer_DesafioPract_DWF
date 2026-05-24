    package sv.edu.udb.desafio_pract_1_jb251834.controller;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import sv.edu.udb.desafio_pract_1_jb251834.entity.Nota;
    import sv.edu.udb.desafio_pract_1_jb251834.repository.NotaRepository;

    import java.util.List;

    @RestController
    @RequestMapping("/api/notas")
    public class NotaController {

        private final NotaRepository notaRepository;

        public NotaController(NotaRepository notaRepository) {
            this.notaRepository = notaRepository;
        }

        @GetMapping
        public List<Nota> listarTodas() {
            return notaRepository.findAll();
        }

        @GetMapping("/{id}")
        public ResponseEntity<Nota> obtenerPorId(@PathVariable Long id) {
            return notaRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping
        public Nota guardar(@RequestBody Nota nota) {
            return notaRepository.save(nota);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Nota> actualizar(@PathVariable Long id, @RequestBody Nota notaActualizada) {
            return notaRepository.findById(id)
                    .map(nota -> {
                        nota.setCalificacion(notaActualizada.getCalificacion());
                        // Permite corregir si se equivocaron de alumno o materia
                        nota.setAlumno(notaActualizada.getAlumno());
                        nota.setMateria(notaActualizada.getMateria());
                        return ResponseEntity.ok(notaRepository.save(nota));
                    })
                    .orElse(ResponseEntity.notFound().build());
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Object> eliminar(@PathVariable Long id) {
            return notaRepository.findById(id)
                    .map(nota -> {
                        notaRepository.delete(nota);
                        return ResponseEntity.noContent().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        }
    }