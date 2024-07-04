import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentPageComponent } from './departament-page.component';

describe('DepartamentPageComponent', () => {
  let component: DepartamentPageComponent;
  let fixture: ComponentFixture<DepartamentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
