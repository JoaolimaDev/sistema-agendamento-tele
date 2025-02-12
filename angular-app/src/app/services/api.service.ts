import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Contato } from '../models/Contato.model';
import { Login } from '../models/auth';
import { Router } from '@angular/router';
import { ContatoDisplay } from '../models/ContatoDisplay.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl = 'http://localhost:8080';
 
  constructor(private http: HttpClient, private router: Router) {}


  login(loginData: Login): void {

    const requestBody = {
      username: loginData.email,
      password: loginData.senha
    };

    this.http.post<{ mensagem: string; status: string }>(this.apiUrl + "/api/auth/login", requestBody, { withCredentials: true }).subscribe({
      next: (response) => {
        if (response.status === 'OK') {

          this.router.navigate(['/agenda']);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          alert(error.error.mensagem);
        }

        
      }
    });
  }

  logout(){

    this.http.post<{ mensagem: string; status: string }>(this.apiUrl + "/api/auth/logout", {}, { withCredentials: true }).subscribe({

      error: (error) => {
        if (error.status === 400) {
          alert(error.error.mensagem);
          this.router.navigate(['/login']);
        }
      }


    });

  }

  cadastro(Contato: Contato){

    const requestBody = {
      contatoNome: Contato.contato_nome,
      contatoEmail: Contato.contato_email,
      contatoCelular: Contato.contato_celular,
      contatoTelefone: Contato.contato_telefone,
      contatoSnFavorito: Contato.contato_sn_favorito,
      contatoSnAtivo: Contato.contato_sn_ativo
    };


    this.http.post(this.apiUrl + "/contato", requestBody, { withCredentials: true }).subscribe({
      next: (response) => {

        alert(requestBody.contatoEmail + " Cadastrado com sucesso!")
        this.router.navigate(['/agenda']);
      },
      error: (error) => {
        if (error.status === 401) {
          
          this.router.navigate(['/login']);
        }

        if (error.error) {
          const errorMessages = Object.values(error.error) as string[]; 
          errorMessages.forEach((message) => {
            alert(message); 
          });
        } 
        
      }
    });

  }

  getData(): Observable<ContatoDisplay[]> {
    return this.http.get<any>(this.apiUrl + "/contato", { withCredentials: true }).pipe(
      map(response => response._embedded.contatoes.map((contato: { _links: { self: { href: any; }; }; }) => ({
        ...contato,
        selfLink: contato._links.self.href 
      }))), 

      catchError(error => {
        if (error.status === 401) {
          
          this.router.navigate(['/login']);

        } 
      
        return of([]);
      })
      
    );
  }
  
  getContatoById(contatoUrl : string): Observable<ContatoDisplay> {
    return this.http.get<ContatoDisplay>(contatoUrl, { withCredentials: true });
  }


  updateContato(contatoUrl: string, contato: Contato){


    const requestBody = {
      contatoNome: contato.contato_nome,
      contatoEmail: contato.contato_email,
      contatoCelular: contato.contato_celular,
      contatoTelefone: contato.contato_telefone,
      contatoSnFavorito: contato.contato_sn_favorito,
      contatoSnAtivo: contato.contato_sn_ativo
    };

    
    this.http.put<Contato>(contatoUrl, requestBody, { withCredentials: true })
    .subscribe({
      next: (response) => {

        alert(requestBody.contatoEmail + " Cadastrado com sucesso!")
        window.location.reload();
      },
      error: (error) => {

        if (error.status === 401) {
          
          this.router.navigate(['/login']);
        }
       if (error.error) {
        const errorMessages = Object.values(error.error) as string[]; 
        errorMessages.forEach((message) => {
          alert(message); 
        });
      } 
        
      }
    });
  }


  delete(contatoUrl : string){


    this.http.delete(contatoUrl, { withCredentials: true }).subscribe({
      next: (response) => {
     
        alert('Contato deletado com sucesso!');
        window.location.reload();
        
      },
      error: (error) => {

        if (error.status === 401) {
          
           this.router.navigate(['/login']);
        }
        
        console.error(error);
      }
    });
  
  }
}
