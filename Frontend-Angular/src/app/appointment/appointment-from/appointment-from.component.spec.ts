import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFromComponent } from './appointment-from.component';

describe('AppointmentFromComponent', () => {
  let component: AppointmentFromComponent;
  let fixture: ComponentFixture<AppointmentFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
