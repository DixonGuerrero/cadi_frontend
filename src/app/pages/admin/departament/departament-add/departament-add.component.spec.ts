import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentAddComponent } from './departament-add.component';

describe('DepartamentAddComponent', () => {
  let component: DepartamentAddComponent;
  let fixture: ComponentFixture<DepartamentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
