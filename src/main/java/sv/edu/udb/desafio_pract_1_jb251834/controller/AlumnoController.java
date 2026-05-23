package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Alumno;
import sv.edu.udb.desafio_pract_1_jb251834.service.AlumnoService;

import java.util.List;
import java.util.Optional;

/**
 * Controller de la API de Alumnos.
 * Gestiona el ciclo de vida de los estudiantes mediante peticiones HTTP.
 */
@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    // Inyección de dependencias mediante Spring
    @Autowired
    private AlumnoService alumnoService;

    /**
     * Endpoint GET: Retorna la colección completa de alumnos.
     */
    @GetMapping
    public List<Alumno> listarTodos() {
        return alumnoService.obtenerTodos();
    }

    /**
     * Endpoint GET con PathVariable: Busca un registro específico.
     * Retorna un Optional para manejar de forma segura la ausencia de datos (evita NullPointerExceptions).
     */
    @GetMapping("/{id}")
    public Optional<Alumno> buscarPorId(@PathVariable Long id) {
        return alumnoService.obtenerPorId(id);
    }

    /**
     * Endpoint POST: Recibe un JSON en el cuerpo del request (@RequestBody)
     * y lo persiste en la base de datos.
     */
    @PostMapping
    public Alumno crear(@RequestBody Alumno alumno) {
        return alumnoService.guardar(alumno);
    }

    /**
     * Endpoint PUT: Actualización de registro existente.
     * Forzamos la asignación del ID recibido en la URL al objeto para asegurar coherencia.
     */
    @PutMapping("/{id}")
    public Alumno actualizar(@PathVariable Long id, @RequestBody Alumno alumno) {
        alumno.setId(id);
        return alumnoService.guardar(alumno);
    }

    /**
     * Endpoint DELETE: Remueve físicamente un registro por su identificador único.
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alumnoService.eliminar(id);
    }
}