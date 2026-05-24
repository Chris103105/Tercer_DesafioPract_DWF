package sv.edu.udb.desafio_pract_1_jb251834.repository;

import sv.edu.udb.desafio_pract_1_jb251834.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

// Creamos nuestro contrato (interfaz) para las calificaciones.
// Al heredar de "JpaRepository", Spring Boot nos regala todo el código SQL necesario.
// Solo le damos las dos reglas básicas a este nuevo asistente:
// 1. Vas a trabajar exclusivamente con los expedientes de la entidad "Nota".
// 2. Su identificador único (ID) es un número de tipo "Long".
public interface NotaRepository extends JpaRepository<Nota, Long> {

    // Las llaves van vacías. No tenemos que escribir los "INSERT" o "SELECT" a mano,
    // el sistema ya sabe cómo guardar, buscar, actualizar y eliminar las notas de los alumnos.
}