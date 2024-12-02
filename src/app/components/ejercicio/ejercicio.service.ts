import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = 'http://localhost:8000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  obtenerEjercicios(tipo: string, nivel: number): Observable<any[]> {
    const url = `${this.apiUrl}/ejercicio/${tipo}/${nivel}`;
    return this.http.get<any[]>(url);
  }
}
