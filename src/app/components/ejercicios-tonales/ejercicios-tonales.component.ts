import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios-tonales',
  standalone: true,
  imports: [],
  templateUrl: './ejercicios-tonales.component.html',
  styleUrls: ['./ejercicios-tonales.component.css']
})
export class EjerciciosTonalesComponent {
  constructor(private router: Router) {}

  goToExercise(nivel: number): void {
    this.router.navigate(['/ejercicio', 'tonal', nivel]);
  }
}

