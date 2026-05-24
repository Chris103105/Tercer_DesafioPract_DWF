package sv.edu.udb.desafio_pract_1_jb251834.entity;

import jakarta.persistence.*;
import java.util.List;

// Le decimos a Spring que esta clase es una entidad que debe guardarse en la base de datos
@Entity
// Nos aseguramos de que apunte exactamente a la tabla "alumno" que creamos en nuestro script SQL
@Table(name = "alumno")
public class Alumno {

    // Esta es nuestra Llave Primaria (Primary Key)
    @Id
    // Delega a la base de datos la creación del ID (es el equivalente a AUTO_INCREMENT)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // No aceptamos nombres vacíos (NOT NULL) y el límite es de 100 caracteres
    @Column(nullable = false, length = 100)
    private String nombre;

    // Igual para el apellido, aplicando la misma regla de seguridad para evitar datos en blanco
    @Column(nullable = false, length = 100)
    private String apellido;

    // Aquí está la magia principal: la relación de Muchos a Muchos con las materias
    @ManyToMany
    // Configuramos la tabla intermedia para que Spring haga los JOINs por nosotros
    @JoinTable(
            name = "alumno_materia", // Nombre de la tabla puente en nuestra base de datos SQL
            joinColumns = @JoinColumn(name = "id_alumno"), // Nuestra llave foránea en esa tabla
            inverseJoinColumns = @JoinColumn(name = "id_materia") // La llave foránea de la otra clase (Materia)
    )
    // Guardamos las materias del alumno en una lista para manejarla fácilmente desde Java
    private List<Materia> materias;

    // Hibernate lo usa como un molde en blanco para empezar a trabajar
    public Alumno() {
    }

    // --- GETTERS Y SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public List<Materia> getMaterias() {
        return materias;
    }

    public void setMaterias(List<Materia> materias) {
        this.materias = materias;
    }
}