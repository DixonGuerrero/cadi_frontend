import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentCardComponent } from './departament-card.component';

describe('DepartamentCardComponent', () => {
  let component: DepartamentCardComponent;
  let fixture: ComponentFixture<DepartamentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
