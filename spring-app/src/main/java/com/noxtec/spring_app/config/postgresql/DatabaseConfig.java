package com.noxtec.spring_app.config.postgresql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.noxtec.spring_app.domain.model.User;
import com.noxtec.spring_app.domain.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DatabaseConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @PostConstruct
    public void init() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");

            userRepository.save(admin);
        }
    }
}
