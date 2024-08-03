import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { HistoryService } from '../../../api/history.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineModule, DatePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  id!: string | null;
  books: any[] = [];
  events: any[] = [];

  private readonly _historyService = inject(HistoryService);

  constructor(private route: ActivatedRoute) { 

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this._historyService.getHistoryByBookId(this.id!).subscribe(book => {
      this.books = book;
    });

  }
}
