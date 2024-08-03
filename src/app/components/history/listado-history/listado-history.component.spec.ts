import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHistoryComponent } from './listado-history.component';

describe('ListadoHistoryComponent', () => {
  let component: ListadoHistoryComponent;
  let fixture: ComponentFixture<ListadoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
