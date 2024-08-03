import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../../api/books.service';


//PrimeNG
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-libros',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule, ToastModule, ConfirmDialogModule, RouterModule],
  templateUrl: './listado-libros.component.html',
  styleUrl: './listado-libros.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListadoLibrosComponent implements OnInit {

  private readonly _booksService = inject(BooksService);
  books$ = this._booksService.getAllBooks();

  lstBooks: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }
  
  ngOnInit(): void {
    this._booksService.getAllBooks().subscribe(books => this.lstBooks = books);
  }

  getSeverity(status: string) {
    switch (status) {
        case 'DEVUELTO':
          return 'success';
        case 'PRESTADO':
          return 'danger';
        default:
          return 'info';
    }
  }

  getLabel(status: string) {
    switch (status) {
        case 'DEVUELTO':
          return 'Disponible';
        case 'PRESTADO':
          return 'No disponible';
        default:
          return 'Sin estado';
    }
  }

  deleteBook(event: Event, id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Esta seguro que desea eliminar el libro definitivamente?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this._booksService.deleteBook(id).subscribe(res => { 
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'El libro ha sido eliminado', life: 3000 });
            this._booksService.getAllBooks().subscribe(books => this.lstBooks = books);
          });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la eliminación', life: 3000 });
        }
    });
  }
}
