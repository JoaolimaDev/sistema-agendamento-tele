import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../models/Contato.model';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-model',
  imports: [ ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule],
  standalone : true,
  templateUrl: './update-model.component.html',
  styleUrl: './update-model.component.css'
})
export class UpdateModelComponent {
  

  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Contato>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contatoForm = this.fb.group({
      contato_id: [{ value: data.contato_id, disabled: true }],
      contato_nome: [data.contato_nome, Validators.required],
      contato_email: [data.contato_email, [Validators.required, Validators.email]],
      contato_celular: [data.contato_celular, Validators.required],
      contato_telefone: [data.contato_telefone, Validators.required],
      contato_sn_favorito: [data.contato_sn_favorito, Validators.required],
      contato_sn_ativo: [data.contato_sn_ativo, Validators.required],
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      this.dialogRef.close(this.contatoForm.getRawValue());
    }
    
  }

  onCancel() {
    this.dialogRef.close();
  }

}
