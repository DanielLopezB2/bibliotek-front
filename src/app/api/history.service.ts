import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LibroHistorial } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = environment.api_url;

  getAllHistory(): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl + '/historial');
  }

  createHistory(history: LibroHistorial): Observable<any> { 
    return this._http.post<any>(this._apiUrl + '/historial', history);
  }

  getHistoryByBookId(bookId: string): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl + '/historial/findByLibroId/' + bookId);
  }

  constructor() { }
}
