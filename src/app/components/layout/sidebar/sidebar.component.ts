import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  items: any = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Libros',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Agregar',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate(['/books/add']);
            }
          },
          {
            label: 'Visualizar',
            icon: 'pi pi-eye',
            command: () => {
              this.router.navigate(['/books']);
            }
          },
          {
            label: 'Préstamos',
            icon: 'pi pi-shop',
            command: () => {
              this.router.navigate(['/loans']);
            }
          },
          {
            label: 'Devoluciones',
            icon: 'pi pi-replay',
            command: () => {
              this.router.navigate(['/returns']);
            }
          }
        ]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Agregar',
            icon: 'pi pi pi-plus',
            command: () => {
              this.router.navigate(['/users/add']);
            }
          },
          {
            label: 'Visualizar',
            icon: 'pi pi-eye',
            command: () => {
              this.router.navigate(['/users']);
            }
          }
        ]
      },
      {
        label: 'Historial',
        icon: 'pi pi-history',
        items: [
          {
            label: 'Visualizar',
            icon: 'pi pi-eye',
            command: () => {
              this.router.navigate(['/history']);
            }
          }
        ]
      }
    ]
  }

}
