import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contato } from '../models/Contato.model';

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


  private apiUrl = '';

  // constructor(private http: HttpClient) {}


  getData(): Observable<Contato[]> {
   
    return of(ELEMENT_DATA);
  }


  // getData(): Observable<Element[]> {
  //   return this.http.get<Element[]>(this.apiUrl);
  // }
}
