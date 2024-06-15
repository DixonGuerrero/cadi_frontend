import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAddComponent } from './license-add.component';

describe('LicenseAddComponent', () => {
  let component: LicenseAddComponent;
  let fixture: ComponentFixture<LicenseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
