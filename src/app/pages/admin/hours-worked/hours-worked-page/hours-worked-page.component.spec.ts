import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursWorkedPageComponent } from './hours-worked-page.component';

describe('HoursWorkedPageComponent', () => {
  let component: HoursWorkedPageComponent;
  let fixture: ComponentFixture<HoursWorkedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursWorkedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursWorkedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
