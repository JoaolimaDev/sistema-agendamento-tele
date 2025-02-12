import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { securityGuardGuard } from './security-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-contato', component: CadastroComponent, canActivate: [securityGuardGuard] },
  { path: 'agenda', component: DataTableComponent, canActivate: [securityGuardGuard] },
  { path: '**', redirectTo: 'login' }  
];
