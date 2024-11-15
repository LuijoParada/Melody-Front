import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosTonalesComponent } from './ejercicios-tonales.component';

describe('EjerciciosTonalesComponent', () => {
  let component: EjerciciosTonalesComponent;
  let fixture: ComponentFixture<EjerciciosTonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerciciosTonalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosTonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
