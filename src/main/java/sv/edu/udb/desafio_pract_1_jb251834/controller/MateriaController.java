package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.desafio_pract_1_jb251834.entity.Materia;
import sv.edu.udb.desafio_pract_1_jb251834.service.MateriaService;

import java.util.List;
import java.util.Optional;

/**
 * Controller de la API de Materias.
 * Expone endpoints para el catálogo de asignaturas académicas.
 */
@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    /**
     * Endpoint GET: Retorna la lista completa de materias disponibles.
     */
    @GetMapping
    public List<Materia> listarTodas() {
        return materiaService.obtenerTodas();
    }

    /**
     * Endpoint GET con PathVariable: Recupera una materia específica por su ID.
     * Utiliza Optional para asegurar un manejo robusto ante IDs inexistentes.
     */
    @GetMapping("/{id}")
    public Optional<Materia> buscarPorId(@PathVariable Long id) {
        return materiaService.obtenerPorId(id);
    }

    /**
     * Endpoint POST: Registra una nueva materia en el catálogo.
     */
    @PostMapping
    public Materia crear(@RequestBody Materia materia) {
        return materiaService.guardar(materia);
    }

    /**
     * Endpoint PUT: Actualiza la información de una materia existente.
     * Vinculamos el ID de la URL al objeto para asegurar la persistencia correcta.
     */
    @PutMapping("/{id}")
    public Materia actualizar(@PathVariable Long id, @RequestBody Materia materia) {
        materia.setId(id);
        return materiaService.guardar(materia);
    }

    /**
     * Endpoint DELETE: Elimina una materia del sistema de forma permanente.
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        materiaService.eliminar(id);
    }
}