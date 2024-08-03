import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { BooksService } from '../../../api/books.service';
import { Libro } from '../../../models/libro';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [InputTextModule, SelectButtonModule, InputNumberModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
  providers: [MessageService]
})
export class EditBookComponent implements OnInit {

  private readonly _booksService = inject(BooksService);

  bookForm!: FormGroup;
  book!: Libro;
  id!: string | null;

  stateOptions: any[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  constructor(private messageService: MessageService, private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {

    this._booksService.getBookById(this.id!).subscribe(book => {
      this.book = book;
      this.bookForm.patchValue({
        titulo: book.titulo,
        autor: book.autor,
        year: book.year,
        isAvailable: book.isAvailable
      });
    });

    this.bookForm = new FormGroup({
        titulo: new FormControl('', Validators.required),
        autor: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        isAvailable: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const titulo = this.bookForm.get('titulo')?.value;
    const autor = this.bookForm.get('autor')?.value;
    const year = this.bookForm.get('year')?.value;
    const isAvailable = !!this.bookForm.get('isAvailable')?.value;
    const bookActualStatusEnum = this.book.bookActualStatusEnum;
    this.book = new Libro(titulo, autor, year, isAvailable, bookActualStatusEnum);
    this._booksService.updateBook(this.id!, this.book).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro modificado correctamente', life: 2000 });
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
