package com.noxtec.spring_app.controller;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import com.noxtec.spring_app.domain.model.Contato;
import com.noxtec.spring_app.domain.model.User;
import com.noxtec.spring_app.domain.repository.ContatoRepository;
import com.noxtec.spring_app.domain.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
public class ContatoControllerTest {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder; 

    @Autowired
    private MockMvc mockMvc;

   // Variável para armazenar o valor do cookie JWT extraído no login
   private String jwtCookieValue;

    /* 
    * No seguinte contexto iniciamos um docker com postgres, no spring um banco de dados é "iniciado" para cada teste 
    */
    @SuppressWarnings("resource")
    @Container
    static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
            DockerImageName.parse("postgres:latest"))
            .withDatabaseName("desafio")
            .withUsername("user")
    .withPassword("password");

    
    /*
    * Definição das propriedades
    */
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }


    @BeforeAll
    static void beforeAll() {
        postgres.start();
    }


    @PostConstruct
    void setUp() throws Exception {
        userRepository.deleteAll();
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword( passwordEncoder.encode("admin123"));
        admin.setRole("ROLE_ADMIN");
        userRepository.save(admin); 
    }

    
    @BeforeEach
    public void setUpLogin() throws Exception {
        String userJson = """
            {
                "username": "admin",
                "password": "admin123"
            }
        """;

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
            .andExpect(status().isOk())
            .andReturn();

        // Extrai o cookie "jwt" da resposta
        Cookie jwtCookie = loginResult.getResponse().getCookie("jwt");
        if (jwtCookie != null) {
            jwtCookieValue = jwtCookie.getValue();
        } else {
            throw new IllegalStateException("JWT cookie não foi encontrado na resposta de login.");
        }
    }

    
   @AfterAll
   static void afterAll() {
       postgres.close();
   }


   @Test
   @Order(1)
   public void testContainerIsRunning() throws SQLException {
       try (Connection connection = DriverManager.getConnection(
               postgres.getJdbcUrl(),
               postgres.getUsername(),
               postgres.getPassword())) {
           assertNotNull(connection);
       }
    }

    
    @Test
    @Order(2)
    public void getContatosTest() throws Exception {

        mockMvc.perform(get("/contato")
            .param("page", "0")
            .param("size", "20")
            .header("Accept", "application/json")
            .cookie(new Cookie("jwt", jwtCookieValue)))
        .andExpect(status().isOk());
    }


    @Test
    @Order(3)
    public void testSearchByContatoEmail() throws Exception {
      
        Contato contato = new Contato();
        contato.setContatoEmail("teste@gmail.com");
        contato.setContatoNome("teste");
        contatoRepository.save(contato);
        
        mockMvc.perform(get("/contato/search/findByContatoEmail")
                .param("contatoEmail", "teste@gmail.com")
                .header("Accept", "application/json")
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isOk());
    }


    @Test
    @Order(4)
    public void testGetContatoById() throws Exception {
        // Cria um contato para obter seu ID
        String contatoJson = """
            {
                "contatoNome": "Teste Nome ID",
                "contatoEmail": "teste2@gmail.com",
                "contatoCelular": "12345678901",
                "contatoTelefone": "1234567890",
                "contatoSnFavorito": "S",
                "contatoSnAtivo": "S"
            }
            """;
        MvcResult postResult = mockMvc.perform(post("/contato")
                .contentType(MediaType.APPLICATION_JSON)
                .content(contatoJson)
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isCreated())
        .andReturn();
        

        String uri = postResult.getResponse().getRedirectedUrl();
        mockMvc.perform(get(uri)
                .header("Accept", "application/hal+json")
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isOk());
    }


    @Test
    @Order(5)
    public void testPutContato() throws Exception {
        // Cria um contato para atualização
        String contatoJson = """
            {
                "contatoNome": "Teste Nome PUT",
                "contatoEmail": "teste.put@gmail.com",
                "contatoCelular": "12345678901",
                "contatoTelefone": "1234567890",
                "contatoSnFavorito": "S",
                "contatoSnAtivo": "S"
            }
            """;
        MvcResult postResult = mockMvc.perform(post("/contato")
                .contentType(MediaType.APPLICATION_JSON)
                .content(contatoJson)
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isCreated())
            .andReturn();

        String uri = postResult.getResponse().getRedirectedUrl();
        String updatedContatoJson = """
            {
                "contatoNome": "Teste Nome Atualizado",
                "contatoEmail": "teste.atualizado@gmail.com",
                "contatoCelular": "10987654321",
                "contatoTelefone": "0987654321",
                "contatoSnFavorito": "N",
                "contatoSnAtivo": "S"
            }
            """;
        mockMvc.perform(put(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedContatoJson)
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isNoContent());
    }

    // DELETE /contato/{id}
    @Test
    @Order(6)
    public void testDeleteContato() throws Exception {
        // Cria um contato para exclusão
        String contatoJson = """
            {
                "contatoNome": "Teste Nome Delete",
                "contatoEmail": "teste.delete@gmail.com",
                "contatoCelular": "12345678901",
                "contatoTelefone": "1234567890",
                "contatoSnFavorito": "S",
                "contatoSnAtivo": "S"
            }
            """;
            
        MvcResult postResult = mockMvc.perform(post("/contato")
                .contentType(MediaType.APPLICATION_JSON)
                .content(contatoJson)
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isCreated())
            .andReturn();
        
        String uri = postResult.getResponse().getRedirectedUrl();

        mockMvc.perform(delete(uri)
                .cookie(new Cookie("jwt", jwtCookieValue)))
            .andExpect(status().isNoContent());
    }

    @Test
    @Order(7)
    public void testPostContato() throws Exception {
        String contatoJson = """
            {
                "contatoNome": "Teste Nome",
                "contatoEmail": "teste04@gmail.com",
                "contatoCelular": "12345678901",
                "contatoTelefone": "1234567890",
                "contatoSnFavorito": "S",
                "contatoSnAtivo": "S"
            }
            """;
        mockMvc.perform(post("/contato")
            .contentType(MediaType.APPLICATION_JSON)
            .content(contatoJson)
            .contentType(MediaType.APPLICATION_JSON)
            .cookie(new Cookie("jwt", jwtCookieValue)))
        .andExpect(status().isCreated())
        .andReturn();
    }
}
