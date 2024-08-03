import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../../../api/books.service';
import { Libro } from '../../../models/libro';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [InputTextModule, SelectButtonModule, InputNumberModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css',
  providers: [MessageService]
})
export class AddBooksComponent implements OnInit {

  private readonly _booksService = inject(BooksService);

  bookForm!: FormGroup;
  book!: Libro;

  constructor(private messageService: MessageService, private router: Router) { }

  stateOptions: any[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  ngOnInit() {
    this.bookForm = new FormGroup({
        titulo: new FormControl('', Validators.required),
        autor: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        isAvailable: new FormControl('', Validators.required)
    });

    this.bookForm.reset();
  }

  onSubmit() {
    const titulo = this.bookForm.get('titulo')?.value;
    const autor = this.bookForm.get('autor')?.value;
    const year = this.bookForm.get('year')?.value;
    const isAvailable = !!this.bookForm.get('isAvailable')?.value;
    const bookActualStatusEnum = 'DEVUELTO';
    this.book = new Libro(titulo, autor, year, isAvailable, bookActualStatusEnum);
    this._booksService.createBook(this.book).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro agregado correctamente', life: 2000 });
        setTimeout(() => {
          this.bookForm.reset();
          this.router.navigate(['/books']);
        } , 2500);
        
      }
    });
  }

  onCancel() {
    this.bookForm.reset();
    this.router.navigate(['/books']);
  }

  onReset() {
    this.bookForm.reset();
  }

}
