import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Contato } from '../models/Contato.model';
import { ApiService } from '../services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,
  MatSortModule, MatPaginatorModule, MatSelectModule, MatIconModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {

  displayedColumns: string[] = [
    'contato_nome', 'contato_email', 'contato_celular', 
    'contato_sn_favorito', 'contato_sn_ativo', 'actions'
  ];

  dataSource = new MatTableDataSource<Contato>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private apiService : ApiService){}


  ngOnInit(): void {
    
    this.apiService.getData().subscribe((data) => {
      this.dataSource.data = data; 
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  atualizarContato(contato: Contato): void {
    console.log('Atualizar contato', contato);
  }

  // Função para o botão Deletar
  deletarContato(contato: Contato): void {
    console.log('Deletar contato', contato);
  }

}
