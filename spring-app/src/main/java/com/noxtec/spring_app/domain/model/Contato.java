package com.noxtec.spring_app.domain.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "contato")
@Data
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contato_id;

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    @Column(name = "contato_nome", nullable = false, length = 100)
    private String contatoNome;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "E-mail inválido.")
    @Size(max = 255, message = "O e-mail deve ter no máximo 255 caracteres.")
    @Column(name = "contato_email", nullable = false, unique = true, length = 255)
    private String contatoEmail;

    @Pattern(regexp = "\\d{11}", message = "O celular deve conter 11 dígitos.")
    @Column(name = "contato_celular", length = 11)
    private String contatoCelular;

    @Pattern(regexp = "\\d{10}", message = "O telefone deve conter 10 dígitos.")
    @Column(name = "contato_telefone", length = 10)
    private String contatoTelefone;

    @Pattern(regexp = "[SN]", message = "Favorito deve ser 'S' ou 'N'.")
    @Column(name = "contato_sn_favorito", columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String contatoSnFavorito = "N";

    @Pattern(regexp = "[SN]", message = "Ativo deve ser 'S' ou 'N'.")
    @Column(name = "contato_sn_ativo", columnDefinition = "CHAR(1) DEFAULT 'S'")
    private String contatoSnAtivo = "S";

    @Column(name = "contato_dh_cad")
    private LocalDateTime contatoDhCad = LocalDateTime.now();
    
}
