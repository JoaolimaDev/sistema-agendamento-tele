import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-contato', component: CadastroComponent },
  { path: 'agenda', component: DataTableComponent },
  { path: '**', redirectTo: 'login' }  
];
