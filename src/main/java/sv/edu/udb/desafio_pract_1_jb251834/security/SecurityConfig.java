package sv.edu.udb.desafio_pract_1_jb251834.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtTokenProvider tokenProvider) {
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
    }

    // Creamos el bean del Guardia de la puerta para que Spring lo conozca
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(tokenProvider, userDetailsService);
    }

    // Herramienta obligatoria para encriptar las contraseñas con el algoritmo BCrypt antes de guardarlas en MySQL
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Activamos CORS para que lea nuestro Bean de configuración en la parte inferior
                .cors(org.springframework.security.config.Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) // Desactivamos esto porque JWT es inmune a ataques CSRF
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Peticiones independientes
                .authorizeHttpRequests(auth -> auth
                        // ZONA PÚBLICA: Cualquiera puede registrarse o hacer login
                        .requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                        // ZONA PRIVADA: Cualquier otra ruta requiere autenticación previa
                        .anyRequest().authenticated()
                );

        // Le ordenamos a Spring que ejecute nuestro filtro JWT personalizado
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 2. El "Libro de Visitas" de CORS: Permitimos explícitamente a tu Frontend (Live Server) pasar la barrera
    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();

        // Puertos exactos desde donde accederá tu HTML con Live Server
        configuration.setAllowedOrigins(java.util.Arrays.asList("http://localhost:5500", "http://127.0.0.1:5500"));

        // Métodos permitidos para tu CRUD
        configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Cabeceras permitidas (imprescindible "Authorization" para el JWT)
        configuration.setAllowedHeaders(java.util.Arrays.asList("Authorization", "Content-Type"));

        configuration.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        // Aplicamos estas reglas a todas nuestras rutas /api/...
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}