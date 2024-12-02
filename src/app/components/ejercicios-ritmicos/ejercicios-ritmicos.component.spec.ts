import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosRitmicosComponent } from './ejercicios-ritmicos.component';

describe('EjerciciosRitmicosComponent', () => {
  let component: EjerciciosRitmicosComponent;
  let fixture: ComponentFixture<EjerciciosRitmicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerciciosRitmicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosRitmicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
