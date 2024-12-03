import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosMelodicosComponent } from './ejercicios-melodicos.component';

describe('EjerciciosMelodicosComponent', () => {
  let component: EjerciciosMelodicosComponent;
  let fixture: ComponentFixture<EjerciciosMelodicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerciciosMelodicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosMelodicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
