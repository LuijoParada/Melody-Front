import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EjercicioService } from './ejercicio.service';

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  nivel: number = 0;
  ejercicioActual: number = 1;
  totalEjercicios: number = 10;
  pregunta: string | null = null;
  opciones: any[] = [];
  respuestaCorrecta: string | null = null;
  mostrarBoton: boolean = false;
  mensajeAlerta: string | null = null;

  constructor(private route: ActivatedRoute, private ejercicioService: EjercicioService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nivel = +params['nivel'];
      this.cargarEjercicio();
    });
  }

  cargarEjercicio() {
    this.ejercicioService.obtenerEjercicio(this.nivel, this.ejercicioActual).subscribe(data => {
      this.pregunta = data.pregunta;
      this.opciones = JSON.parse(data.opciones);
      this.respuestaCorrecta = data.respuesta_correcta;
      this.mensajeAlerta = null; // Limpiar mensaje de alerta
    });
  }

  seleccionarOpcion(opcion: any) {
    if (opcion.imagen === this.respuestaCorrecta) {
      this.mensajeAlerta = '¡Correcto!';
      this.mostrarBoton = true;
    } else {
      this.mensajeAlerta = 'Incorrecto, intenta de nuevo.';
    }
  }

  avanzarPregunta(): void {
    if (this.ejercicioActual < this.totalEjercicios) {
      this.ejercicioActual++;
      this.mostrarBoton = false;
      this.cargarEjercicio();
    } else {
      this.mensajeAlerta = '¡Has completado el nivel!';
    }
  }
}
