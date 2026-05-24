package sv.edu.udb.desafio_pract_1_jb251834.entity;

import jakarta.persistence.*;

// Le avisamos al programa que esta clase representa información real que vamos a guardar
@Entity
// Le indicamos exactamente en qué carpeta o tabla de la base de datos debe guardarse
@Table(name = "materia")
public class Materia {

    // Este es el número de control único de la materia
    @Id
    // Le decimos a la base de datos que se encargue de ir numerándolas solita (
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // el nombre no puede quedar en blanco y no debe pasar de 100 letras
    @Column(nullable = false, length = 100)
    private String nombre;

    //  "Muchas materias pueden ser dadas por un solo Profesor"
    @ManyToOne

    @JoinColumn(name = "id_profesor", nullable = false)
    private Profesor profesor;

    // El molde en blanco La herramienta de base de datos lo necesita para empezar a armar la información
    public Materia() {}




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
    public Profesor getProfesor() {
        return profesor;
    }
    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }
}