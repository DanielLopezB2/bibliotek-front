import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UsuariosService } from '../../../api/usuarios.service';
import { RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule, RouterModule,ConfirmDialogModule, ToastModule],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListadoUsuariosComponent implements OnInit {

  lstUsuarios: any[] = [];

  private readonly _usersService = inject(UsuariosService);
  users$ = this._usersService.getAllUsers();

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._usersService.getAllUsers().subscribe(users => this.lstUsuarios = users);
  }

  deleteUser(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que desea eliminar el usuario definitivamente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._usersService.deleteUser(id).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'El usuario ha sido eliminado', life: 3000 });
          this._usersService.getAllUsers().subscribe(users => this.lstUsuarios = users);
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la eliminación', life: 3000 });
      }
    });
  }

}
