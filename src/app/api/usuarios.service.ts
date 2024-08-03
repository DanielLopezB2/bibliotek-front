import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = environment.api_url;

  getAllUsers(): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl + '/usuarios');
  }

  getUserById(id: string): Observable<any> { 
    return this._http.get<any>(this._apiUrl + '/usuarios/' + id);
  }

  createUser(usuario: Usuario): Observable<any> { 
    return this._http.post<any>(this._apiUrl + '/usuarios', usuario);
  }

  updateUser(usuarioId: string, usuario: Usuario): Observable<any> { 
    return this._http.put<any>(this._apiUrl + '/usuarios/' + usuarioId, usuario);
  }

  deleteUser(usuarioId: string): Observable<any> { 
    return this._http.delete<any>(this._apiUrl + '/usuarios/' + usuarioId);
  }

  constructor() { }
}
