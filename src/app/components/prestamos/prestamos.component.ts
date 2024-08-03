import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { HistoryService } from '../../api/history.service';
import { Router } from '@angular/router';
import { LibroHistorial } from '../../models/history';
import { UsuariosService } from '../../api/usuarios.service';
import { BooksService } from '../../api/books.service';
import { Libro } from '../../models/libro';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [ ButtonModule, ReactiveFormsModule, ToastModule, AutoCompleteModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css',
  providers: [MessageService]
})
export class PrestamosComponent implements OnInit {

  private readonly _historyService = inject(HistoryService);
  private readonly _usersService = inject(UsuariosService);
  private readonly _booksService = inject(BooksService);

  historyFormGroup! : FormGroup;
  history!: LibroHistorial;

  lstUsers: Usuario[] = [];
  lstBooks: Libro[] = [];


  filteredUsers: any[] | undefined;
  filteredBooks: any[] | undefined;

  userId: string = '';
  libroId: string = '';

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {

    this._usersService.getAllUsers().subscribe(res => {
      this.lstUsers = res;
    });

    this._booksService.findByStatus('DEVUELTO').subscribe(res => {
      this.lstBooks = res;
    });

    this.historyFormGroup = new FormGroup({
        user: new FormControl<Usuario | null>(null),
        book: new FormControl<Libro | null>(null)
      });
  }

  filterUser(event: AutoCompleteCompleteEvent) {
    let userFiltered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.lstUsers as any[]).length; i++) {
      let user = (this.lstUsers as any[])[i];
      if (user.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        userFiltered.push(user);
      }
    }
    this.filteredUsers = userFiltered;
    
  }

  filterBook(event: AutoCompleteCompleteEvent) {
    let bookFiltered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.lstBooks).length; i++) {
      let book = (this.lstBooks)[i];
      if (book.titulo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        bookFiltered.push(book);
      }
    }
    this.filteredBooks = bookFiltered;
  }

  onSubmit() {

    const usuario = this.historyFormGroup.get('user')?.value;
    const libro = this.historyFormGroup.get('book')?.value;
    const actionPerformedEnum = 'PRESTAMO';
    const transactionDate = new Date().toISOString();

    if (usuario == null || libro == null) { 
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, rellene todos los campos', life: 2000 });
    }

    this.history = new LibroHistorial(actionPerformedEnum, this.libroId, this.userId, transactionDate);
    
    this._historyService.createHistory(this.history).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Préstamo registrado correctamente', life: 2000 });
        setTimeout(() => {
          this.historyFormGroup.reset();
          this.router.navigate(['/history']);
        } , 2500);
      }
    });
  }

  onCancel() {
    this.historyFormGroup.reset();
    this.router.navigate(['/history']);
  }

  onClear() {
    this.historyFormGroup.reset();
  }

  onUserSelect(event: any) {
    let selectedUser = event.value;
    let userId = selectedUser.id;
    this.userId = userId;
  }

  onBookSelect(event: any) {
    let selectedBook = event.value;
    let bookId = selectedBook.id; 
    this.libroId = bookId;
  }

}
