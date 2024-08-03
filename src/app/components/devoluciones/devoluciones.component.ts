import { Component, inject, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { BooksService } from '../../api/books.service';
import { Libro } from '../../models/libro';
import { LibroHistorial } from '../../models/history';
import { Router } from '@angular/router';
import { HistoryService } from '../../api/history.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css',
  providers: [MessageService, ConfirmationService]
})
export class DevolucionesComponent implements OnInit {

  private readonly _booksService = inject(BooksService);
  private readonly _historyService = inject(HistoryService);

  lstBooks: Libro[] = [];

  book!: Libro;

  constructor(private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }
  
  ngOnInit(): void {
    this._booksService.findByStatus('PRESTADO').subscribe(books => this.lstBooks = books);
  }

  getSeverity(action: string) {
    switch (action) {
        case 'PRESTADO':
          return 'info';
        case 'DEVUELTO':
          return 'danger';
        default:
          return 'info';
    }
  }

  getLabel(action: string) {
    switch (action) {
        case 'PRESTADO':
          return 'Prestado';
        case 'DEVUELTO':
          return 'Devuelto';
        default:
          return 'No disponible';
    }
  }

  returnBook(id: string, libro: Libro) {
    const bookActualStatusEnum = 'DEVUELTO';

    const actionPerformedEnum = 'DEVOLUCION';
    const libroId = id;
    const usuarioId = '709f484b-29f0-4190-905d-4fdb579b7465';
    const transactionDate = new Date().toISOString();

    this.book = new Libro(libro.titulo, libro.autor, libro.year, libro.isAvailable, bookActualStatusEnum);
    this._booksService.updateBook(id, this.book).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro devuelto correctamente', life: 2000 });
        this._booksService.findByStatus('PRESTADO').subscribe(books => this.lstBooks = books);
        this._historyService.createHistory(new LibroHistorial(actionPerformedEnum, libroId, usuarioId, transactionDate)).subscribe(res => { });
      }
    });
  }

  confirm1(event: Event, id: string, libro: Libro) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Esta seguro que desea devolver el libro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.returnBook(id, libro);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la devolución', life: 3000 });
        }
    });
  }

}
