# Sistema de Agendamento Telefônico

Este projeto é uma aplicação completa para gerenciamento de contatos, focada em um sistema de agendamento telefônico. A ideia central é oferecer uma interface robusta e moderna que integra funcionalidades essenciais para o controle de contatos, permitindo a comunicação eficiente entre o front-end e o back-end.

## Funcionalidades

- **Cadastro de Contatos:**  
  Validação para impedir a duplicidade de contatos com base no número de celular.

- **Consulta de Contatos:**  
  Permite a busca e visualização dos contatos cadastrados.

- **Atualização e Inativação de Contatos:**  
  Possibilita editar as informações dos contatos e inativá-los quando necessário.

- **Favoritos:**  
  Permite marcar um contato como favorito para facilitar o acesso.

- **Comunicação via API:**  
  A comunicação entre o front-end e o back-end é realizada por meio de uma API REST.  
  - **Back-end:** Desenvolvido com Java e Spring Boot.  
  - **Front-end:** Desenvolvido com Angular , utilizando Guards para proteção de rotas.

- **Organização do Projeto:**  
  Estrutura organizada e coerente, com implementação de testes unitários tanto para o front-end quanto para o back-end.

- **Banco de Dados:**  
  Utiliza PostgreSQL, com o seguinte modelo de dados:

  ```sql
  create schema desafio;
  create table desafio.coontato( 
      contato_id serial primary key, 
      contato_nome varchar(100), 
      contato_email varchar(255), 
      contato_celular varchar(11), 
      contato_telefone varchar(10), 
      contato_sn_favorito character(1), 
      contato_sn_ativo character(1), 
      contato_dh_cad timestamp without time zone 
  )

## Diagrama da API (Baseado na definição OpenAPI)

graph TD;
    A[API Root] -->|GET| B[Obter Contatos /contato];
    A -->|POST| C[Criar Contato /contato];
    A -->|GET| D[Buscar por Email /contato/search/findByContatoEmail];
    A -->|GET| E[Obter Contato por ID /contato/{id}];
    A -->|PUT| F[Atualizar Contato /contato/{id}];
    A -->|DELETE| G[Deletar Contato /contato/{id}];
    A -->|PATCH| H[Editar Contato /contato/{id}];
    A -->|GET| I[Perfil /profile];
    A -->|GET| J[Perfil Contato /profile/contato];
    A -->|POST| K[Login /api/auth/login];
    A -->|POST| L[Logout /api/auth/logout];


    ## Como utilizar

```bash
    git clone https://github.com/JoaolimaDev/sistema-agendamento-tele.git
    sudo docker-compose up --build
    sudo docker-compose exec postgres psql -U postgres -d bolsa -f /docker-entrypoint-initdb.d/bolsa.bkp
```


1. **SWAGGER DISPONÍVEL**
   - **URL:** http://localhost:8080/swagger-ui/index.html

1. **Front-end**
   - **URL:**  http://localhost:4200/


<p align="left">
  💌 Contatos: ⤵️
</p>

<p align="left">
  <a href="mailto:ozymandiasphp@gmail.com" title="Gmail">
  <img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white&link=LINK-DO-SEU-GMAIL" alt="Gmail"/></a>
  <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-de-lima-74441b1b1/" title="LinkedIn">
  <img src="https://img.shields.io/badge/-Linkedin-0e76a8?style=flat-square&logo=Linkedin&logoColor=white&link=LINK-DO-SEU-LINKEDIN" alt="LinkedIn"/></a>
  <a href="https://wa.me/5581989553431" title="WhatsApp">
  <img src="https://img.shields.io/badge/-WhatsApp-25d366?style=flat-square&labelColor=25d366&logo=whatsapp&logoColor=white&link=API-DO-SEU-WHATSAPP" alt="WhatsApp"/></a>
</p>

