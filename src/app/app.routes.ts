import { Routes } from '@angular/router';
import { ListadoLibrosComponent } from './components/libros/listado-libros/listado-libros.component';
import { AddBooksComponent } from './components/libros/add-books/add-books.component';
import { AddUsuariosComponent } from './components/usuarios/add-usuarios/add-usuarios.component';
import { ListadoUsuariosComponent } from './components/usuarios/listado-usuarios/listado-usuarios.component';
import { ListadoHistoryComponent } from './components/history/listado-history/listado-history.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { TimelineComponent } from './components/history/timeline/timeline.component';
import { EditBookComponent } from './components/libros/edit-book/edit-book.component';
import { EditUsuarioComponent } from './components/usuarios/edit-usuario/edit-usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'books/add', component: AddBooksComponent },
    { path: 'books', component: ListadoLibrosComponent },
    { path: 'books/edit/:id', component: EditBookComponent },
    { path: 'users/add', component: AddUsuariosComponent },
    { path: 'users/edit/:id', component: EditUsuarioComponent },
    { path: 'users', component: ListadoUsuariosComponent },
    { path: 'history', component: ListadoHistoryComponent },
    { path: 'loans', component: PrestamosComponent },
    { path: 'returns', component: DevolucionesComponent },
    { path: 'timeline/:id', component: TimelineComponent },
    { path: '**', redirectTo: '/books', pathMatch: 'full' }
];
