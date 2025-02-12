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
import { MatDialog } from '@angular/material/dialog';
import { UpdateModelComponent } from '../update-model/update-model.component';
import { ContatoDisplay } from '../models/ContatoDisplay.model';


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
    'contato_telefone','contato_sn_favorito', 'contato_sn_ativo', 'actions'
  ];

  dataSource = new MatTableDataSource<ContatoDisplay>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private apiService : ApiService, private dialog: MatDialog){}


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

  atualizarContato(contato: String): void {
    
    const dialogRef = this.dialog.open(UpdateModelComponent, {

      width: '500px',
      data: contato,

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        console.log('Contato atualizado:', result);
      }
    });

  }

  deletarContato(contato: string): void {

    this.apiService.delete(contato);
    
  }

}
