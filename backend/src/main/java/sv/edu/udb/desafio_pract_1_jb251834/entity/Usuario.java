package sv.edu.udb.desafio_pract_1_jb251834.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    // Almacenará la contraseña de forma encriptada (BCrypt) por seguridad
    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 30)
    private String role; // Ejemplo: "ROLE_USER" o "ROLE_ADMIN"

    public Usuario() {}

    // Getters y Setters públicos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}