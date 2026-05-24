package sv.edu.udb.desafio_pract_1_jb251834.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// Usamos @Controller en lugar de @RestController para que Spring sepa que devolveremos archivos HTML
@Controller
public class WebController {

    @GetMapping("/login")
    public String mostrarPantallaLogin() {
        // Esto le dice a Spring: "Ve a la carpeta resources/templates y devuelve el archivo login.html"
        return "login";
    }
}