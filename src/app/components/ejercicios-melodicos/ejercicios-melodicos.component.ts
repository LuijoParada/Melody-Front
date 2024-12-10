import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios-melodicos',
  standalone: true,
  imports: [],
  templateUrl: './ejercicios-melodicos.component.html',
  styleUrls: ['./ejercicios-melodicos.component.css']
})
export class EjerciciosMelodicosComponent {
  constructor(private router: Router) {}

  goToExercise(nivel: number): void {
    this.router.navigate(['/ejercicio', 'melodico', nivel]);
  }
  goToExercise2(nivel: number): void {
    this.router.navigate(['/ejercicio', 'tonal', nivel]);
  }
}
