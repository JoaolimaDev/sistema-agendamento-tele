package com.noxtec.spring_app.repository;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.noxtec.spring_app.domain.model.Contato;
import com.noxtec.spring_app.domain.repository.ContatoRepository;



@ExtendWith(MockitoExtension.class) 
public class ContatoRepositoryTest {


    @Mock
    private ContatoRepository contatoRepository;

    @Test
    public void whenFindByContatoEmail_thenReturnContato() {
        // Configuração do mock
        Contato contato = new Contato();
        contato.setContato_id(1L);
        contato.setContatoNome("João Silva");
        contato.setContatoEmail("joao.silva@example.com");
        contato.setContatoCelular("11987654321");
        contato.setContatoTelefone("1133334444");
        contato.setContatoSnFavorito("S");
        contato.setContatoSnAtivo("S");
        contato.setContatoDhCad(LocalDateTime.now());

 
        when(contatoRepository.findByContatoEmail("joao.silva@example.com")).thenReturn(contato);

        Contato found = contatoRepository.findByContatoEmail("joao.silva@example.com");

        // Verificação
        assertNotNull(found);
        assertEquals("João Silva", found.getContatoNome());
        assertEquals("joao.silva@example.com", found.getContatoEmail());

        // Verifica se o método do repositório foi chamado
        verify(contatoRepository, times(1)).findByContatoEmail("joao.silva@example.com");
    }

    @Test
    public void whenFindByContatoEmail_thenReturnNull() {
        // Configuração do mock
        when(contatoRepository.findByContatoEmail("unknown@example.com")).thenReturn(null);

       
        Contato found = contatoRepository.findByContatoEmail("unknown@example.com");

    
        assertNull(found);

        
        verify(contatoRepository, times(1)).findByContatoEmail("unknown@example.com");
    }


    @Test
    public void whenDeleteContato_thenVerifyDeletion() {
        // Configuração do mock
        Contato contato = new Contato();
        contato.setContato_id(1L);
        contato.setContatoNome("João Silva");
        contato.setContatoEmail("joao.silva@example.com");

        // Execução do teste
        contatoRepository.delete(contato);

        // Verificação
        verify(contatoRepository, times(1)).delete(contato); // Verifica se o método delete foi chamado
    }

    @Test
    public void whenUpdateContato_thenReturnUpdatedContato() {
        // Configuração do mock
        Contato contato = new Contato();
        contato.setContato_id(1L);
        contato.setContatoNome("João Silva");
        contato.setContatoEmail("joao.silva@example.com");

        // Simula o comportamento do método save (atualização)
        when(contatoRepository.save(contato)).thenReturn(contato);

        // Modifica o contato para simular uma atualização
        contato.setContatoNome("João da Silva");

        // Execução do teste
        Contato updatedContato = contatoRepository.save(contato);

        // Verificação
        assertNotNull(updatedContato);
        assertEquals("João da Silva", updatedContato.getContatoNome()); // Verifica se o nome foi atualizado
        verify(contatoRepository, times(1)).save(contato); // Verifica se o método save foi chamado
    }

}
