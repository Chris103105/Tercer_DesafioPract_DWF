package sv.edu.udb.desafio_pract_1_jb251834.dto;

public class RegistroDto {
    private String username;
    private String password;
    private String role; // Ej. "ROLE_USER" o "ROLE_ADMIN"

    // Getters y Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}