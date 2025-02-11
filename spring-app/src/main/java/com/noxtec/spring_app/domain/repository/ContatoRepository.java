package com.noxtec.spring_app.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.noxtec.spring_app.domain.model.Contato;


@RepositoryRestResource(path = "contato")
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    Contato findByContatoEmail(String contatoEmail);

}
