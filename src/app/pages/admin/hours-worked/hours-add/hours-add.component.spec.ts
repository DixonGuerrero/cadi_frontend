import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursAddComponent } from './hours-add.component';

describe('HoursAddComponent', () => {
  let component: HoursAddComponent;
  let fixture: ComponentFixture<HoursAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
