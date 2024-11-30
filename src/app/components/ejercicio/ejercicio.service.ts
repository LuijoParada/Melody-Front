import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = 'http://localhost:8000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  obtenerEjercicio(nivel: number, ejercicio: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ejercicio/${nivel}/${ejercicio}`);
  }
}
