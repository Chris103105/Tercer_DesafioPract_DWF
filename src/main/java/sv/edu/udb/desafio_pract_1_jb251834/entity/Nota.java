package sv.edu.udb.desafio_pract_1_jb251834.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "notas")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Una nota pertenece a un único alumno específico
    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    // Una nota corresponde a una única materia específica
    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    private Materia materia;

    @Column(nullable = false)
    private Double calificacion;

    public Nota() {}

    // Getters y Setters públicos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Alumno getAlumno() { return alumno; }
    public void setAlumno(Alumno alumno) { this.alumno = alumno; }
    public Materia getMateria() { return materia; }
    public void setMateria(Materia materia) { this.materia = materia; }
    public Double getCalificacion() { return calificacion; }
    public void setCalificacion(Double calificacion) { this.calificacion = calificacion; }
}