package sv.edu.udb.desafio_pract_1_jb251834.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// @Component le dice a Spring que esta clase es una herramienta que usaremos en varias partes
@Component
public class JwtTokenProvider {

    // Traemos la llave secreta que pusiste en el application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;

    // Traemos el tiempo de vida (las 24 horas)
    @Value("${jwt.expiration}")
    private int jwtExpirationInMs;

    // Genera el Token cuando el usuario hace login con éxito
    public String generarToken(Authentication authentication) {
        String username = authentication.getName();
        Date fechaActual = new Date();
        Date fechaExpiracion = new Date(fechaActual.getTime() + jwtExpirationInMs);

        // Convertimos tu texto secreto en una llave criptográfica real
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(fechaExpiracion)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extrae el nombre de usuario de adentro del token
    public String obtenerUsernameDelToken(String token) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // Verifica que el token sea auténtico y no esté vencido o hackeado
    public boolean validarToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // Si el token es falso, caducado o está mal formado, cae aquí
            System.out.println("Token JWT no válido: " + ex.getMessage());
        }
        return false;
    }
}