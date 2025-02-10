import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { DataTableComponent } from "./data-table/data-table.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, DataTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
