import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contato } from '../models/Contato.model';
import { Login } from '../models/auth';
import { Router } from '@angular/router';

const ELEMENT_DATA: Contato[] = [
  {
    contato_id: 1,
    contato_nome: 'João Vitor',
    contato_email: 'joao.vitor@email.com',
    contato_celular: '11999999999',
    contato_telefone: '1133333333',
    contato_sn_favorito: 'S',
    contato_sn_ativo: 'S',
    contato_dh_cad: '2025-02-10T10:00:00'
  },
  {
    contato_id: 2,
    contato_nome: 'Maria Silva',
    contato_email: 'maria.silva@email.com',
    contato_celular: '11888888888',
    contato_telefone: '1122222222',
    contato_sn_favorito: 'N',
    contato_sn_ativo: 'S',
    contato_dh_cad: '2025-02-09T15:30:00'
  },
  {
    contato_id: 3,
    contato_nome: 'Carlos Souza',
    contato_email: 'carlos.souza@email.com',
    contato_celular: '11977777777',
    contato_telefone: '1123333333',
    contato_sn_favorito: 'S',
    contato_sn_ativo: 'S',
    contato_dh_cad: '2025-02-09T14:20:00'
  },
  {
    contato_id: 4,
    contato_nome: 'Zelda Costa',
    contato_email: 'zelda.costa@email.com',
    contato_celular: '11955555555',
    contato_telefone: '1134444444',
    contato_sn_favorito: 'N',
    contato_sn_ativo: 'S',
    contato_dh_cad: '2025-02-10T09:10:00'
  }
];


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl = 'http://localhost:8080/api/auth/login';
 
  constructor(private http: HttpClient, private router: Router) {}


  getData(): Observable<Contato[]> {
   
    return of(ELEMENT_DATA);
  }

  login(loginData: Login): void {

    const requestBody = {
      username: loginData.email,
      password: loginData.senha
    };

    this.http.post<{ mensagem: string; status: string }>(this.apiUrl, requestBody).subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          this.router.navigate(['/cadastrar-contato']);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          alert(error.error.mensagem);
        }
      }
    });
  }

  // getData(): Observable<Element[]> {
  //   return this.http.get<Element[]>(this.apiUrl);
  // }
}
