import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  contatoForm: FormGroup;

  
  constructor() {
    this.contatoForm = new FormGroup({
      contato_nome: new FormControl(''),
      contato_email: new FormControl(''),
      contato_celular: new FormControl(''),
      contato_telefone: new FormControl(''),
      contato_sn_favorito: new FormControl<'S' | 'N'>('S'),
      contato_sn_ativo: new FormControl<'S' | 'N'>('S')
    });
  }


  onSubmit() {
    console.log(this.contatoForm.value);
  }
}