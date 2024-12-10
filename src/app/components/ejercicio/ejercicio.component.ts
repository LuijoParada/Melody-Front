import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Importa DomSanitizer
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
  ejercicios: any[] = [];
  ejercicioActual: number = 0; // Índice del ejercicio actual en la lista
  pregunta: SafeHtml | null = null; // Cambia a SafeHtml
  opciones: any[] = [];
  respuestaCorrecta: string | null = null;
  mostrarBoton: boolean = false;
  mensajeAlerta: string | null = null;
  tipo: string = ''; // Tipo de ejercicio
  totalEjercicios: number = 0; // Total de ejercicios para el nivel actual
  nivelRuta: string = ''; // Ruta para redirigir a la selección de niveles
  mostrarBotonFinal: boolean = false; // Propiedad para mostrar el botón final
  opcionesDeshabilitadas: boolean = false; // Propiedad para deshabilitar opciones después de la respuesta correcta
  intentosFallidos: number = 0; // Contador de intentos fallidos

  constructor(private route: ActivatedRoute, private router: Router, private ejercicioService: EjercicioService, private sanitizer: DomSanitizer) {} // Añade DomSanitizer

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nivel = +params['nivel'];
      this.tipo = params['tipo']; // Obtener el tipo de ejercicio de los parámetros de la ruta
      if (!this.tipo) {
        console.error('Tipo de ejercicio no definido');
        return;
      }
      this.establecerNivelRuta();
      this.cargarEjercicios();
    });
  }

  establecerNivelRuta() {
    if (this.tipo === 'ritmico') {
      this.nivelRuta = '/ritmicos';
    } else if (this.tipo === 'melodico') {
      this.nivelRuta = '/melodicos';
    } else {
      this.nivelRuta = '/tonales';
    }
  }

  cargarEjercicios() {
    this.ejercicioService.obtenerEjercicios(this.tipo, this.nivel).subscribe(data => {
      if (data.length > 0) {
        this.ejercicios = data;
        this.totalEjercicios = data.length;
        this.mostrarEjercicio(0); // Mostrar el primer ejercicio
      } else {
        console.error('No se encontraron ejercicios:', data);
        this.mensajeAlerta = 'Error cargando los ejercicios. Inténtalo de nuevo más tarde.';
      }
    }, error => {
      console.error('Error cargando los ejercicios:', error);
    });
  }

  mostrarEjercicio(index: number) {
    if (this.ejercicios[index]) {
      const ejercicio = this.ejercicios[index];
      this.pregunta = this.sanitizer.bypassSecurityTrustHtml(ejercicio.pregunta); // Usamos el sanitizer
      this.opciones = JSON.parse(ejercicio.opciones);
      this.respuestaCorrecta = ejercicio.respuesta_correcta;
      this.ejercicioActual = index + 1; // Ajustar a 1-indexed para mostrar al usuario
      this.mostrarBoton = false;
      this.mostrarBotonFinal = false; // Asegurarse de que el botón de selección de niveles esté oculto
      this.opcionesDeshabilitadas = false; // Habilitar las opciones para el nuevo ejercicio
      this.intentosFallidos = 0; // Reiniciar el contador de intentos fallidos
      this.mensajeAlerta = null; // Limpiar mensaje de alerta
    } else {
      console.error('Ejercicio no encontrado:', index);
      this.mensajeAlerta = 'Error cargando el ejercicio. Inténtalo de nuevo más tarde.';
    }
  }

  seleccionarOpcion(opcion: any) {
    if (opcion.imagen === this.respuestaCorrecta) {
      this.mensajeAlerta = '¡Correcto!';
      this.mostrarBoton = true;
      this.opcionesDeshabilitadas = true; // Deshabilitar las opciones después de la respuesta correcta
    } else {
      this.intentosFallidos++;
      if (this.intentosFallidos === 1) {
        this.mensajeAlerta = 'Incorrecto, intenta de nuevo.';
      } else {
        this.mensajeAlerta = 'Incorrecto otra vez, ¡sigue intentando!';
      }
    }
  }

  avanzarPregunta(): void {
    if (this.ejercicioActual < this.totalEjercicios) {
      this.mostrarEjercicio(this.ejercicioActual);
    } else {
      this.mensajeAlerta = '¡Has completado el nivel!';
      this.mostrarBoton = false; // Ocultar el botón de avanzar
      this.mostrarBotonFinal = true; // Mostrar el botón de finalizar
    }
  }

  // Método para redirigir a la selección de niveles
  redirigirSeleccionNiveles(): void {
    this.router.navigate([this.nivelRuta]);
  }
}
