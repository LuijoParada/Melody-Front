import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios-ritmicos',
  standalone: true,
  imports: [],
  templateUrl: './ejercicios-ritmicos.component.html',
  styleUrls: ['./ejercicios-ritmicos.component.css']
})
export class EjerciciosRitmicosComponent {
  constructor(private router: Router) {}

  goToExercise(nivel: number): void {
    this.router.navigate(['/ejercicio', 'ritmico', nivel]);
  }
}
