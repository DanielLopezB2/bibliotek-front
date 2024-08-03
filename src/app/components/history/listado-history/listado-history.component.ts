import { Component, inject } from '@angular/core';
import { HistoryService } from '../../../api/history.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-history',
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule, DatePipe, RouterModule],
  templateUrl: './listado-history.component.html',
  styleUrl: './listado-history.component.css'
})
export class ListadoHistoryComponent {

  private readonly _historyService = inject(HistoryService);
  history$ = this._historyService.getAllHistory();

  lstHistory: any[] = [];

  ngOnInit(): void {
    this._historyService.getAllHistory().subscribe(histories => this.lstHistory = histories);
  }

  getSeverity(action: string) {
    switch (action) {
        case 'DEVOLUCION':
          return 'success';
        case 'PRESTAMO':
          return 'danger';
        default:
          return 'info';
    }
  }

  getLabel(action: string) {
    switch (action) {
        case 'DEVOLUCION':
          return 'Devolución';
        case 'PRESTAMO':
          return 'Préstamo';
        default:
          return 'No disponible';
    }
  }
}
