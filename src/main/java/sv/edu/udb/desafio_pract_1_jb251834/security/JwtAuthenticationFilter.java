package sv.edu.udb.desafio_pract_1_jb251834.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, CustomUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Extraemos el token que viene escondido en la cabecera de la petición
        String token = _obtenerJwtDeLaPeticion(request);

        // 2. Si hay un token y la máquina de credenciales dice que es válido...
        if (StringUtils.hasText(token) && tokenProvider.validarToken(token)) {
            // Reclamamos el nombre de usuario de adentro del token
            String username = tokenProvider.obtenerUsernameDelToken(token);

            // Buscamos sus datos en la base de datos
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Le damos luz verde en el contexto de seguridad de Spring
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // Dejamos que la petición continúe su camino hacia los controladores
        filterChain.doFilter(request, response);
    }

    // Herramienta auxiliar para cortar el texto de la cabecera "Bearer eyJhbGci..." y sacar solo el token limpio
    private String _obtenerJwtDeLaPeticion(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}