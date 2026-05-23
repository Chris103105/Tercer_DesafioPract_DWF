package sv.edu.udb.desafio_pract_1_jb251834.entity;

import jakarta.persistence.*;

// Le avisamos al programa que esta es una pieza de información principal que vamos a guardar
@Entity
// Le indicamos que guarde estos datos exactamente en el   tabla llamada "profesor"
@Table(name = "profesor")
public class Profesor {

    // Este es el número de identificación único del docente
    @Id
    // Le pedimos a la base de datos que vaya asignando estos números solita y en orden
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // No podemos guardar un profesor sin nombre y el texto no debe pasar de 100 letras
    @Column(nullable = false, length = 100)
    private String nombre;

    // El sistema lo usa por detrás para empezar a crear la ficha del maestro
    public Profesor() {

    }

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
}