import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = environment.api_url;

  getAllBooks(): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl + '/libros');
  }

  getBookById(id: string): Observable<any> {
    return this._http.get<any>(this._apiUrl + '/libros/' + id);
  }

  createBook(libro: Libro): Observable<any> { 
    return this._http.post<any>(this._apiUrl + '/libros', libro);
  }

  findByStatus(status: string): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl + '/libros/findByStatus/' + status);
  }

  updateBook(libroId: string, libro: Libro): Observable<any> {
    return this._http.put<any>(this._apiUrl + '/libros/' + libroId , libro);
  }

  deleteBook(libroId: string): Observable<any> {
    return this._http.delete<any>(this._apiUrl + '/libros/' + libroId);
  }

  constructor() { }
}
