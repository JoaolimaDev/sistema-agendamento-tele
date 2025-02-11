package com.noxtec.spring_app.config.utilities;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    public final JwtUtilities jwtUtil;
    private final com.noxtec.spring_app.service.userService userService;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
        throws ServletException, IOException {

        String jwt = extractJwtFromCookie(request);
        String username = (jwt != null) ? jwtUtil.extractUsername(jwt) : null;
    
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && isValidToken(jwt, username)) {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, userDetails(username).getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

    
        filterChain.doFilter(request, response);

    }

    private String extractJwtFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue(); 
                }
            }
        }
        return null;
    }
    private UserDetails userDetails(String username){
        return userService.loadUserByUsername(username);
    }
    
    private boolean isValidToken(String jwt, String username) {
        if (jwt != null && username != null) {
           
            return jwtUtil.validateToken(jwt, userDetails(username));
        }
        return false;
    }
    
}
