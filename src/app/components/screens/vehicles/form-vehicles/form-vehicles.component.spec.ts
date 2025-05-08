import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVehiclesComponent } from './form-vehicles.component';

describe('FormVehiclesComponent', () => {
  let component: FormVehiclesComponent;
  let fixture: ComponentFixture<FormVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
