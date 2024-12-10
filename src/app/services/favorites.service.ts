import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia esto si tu URL es diferente

  constructor(private http: HttpClient) {}

  getFavorites(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/${userId}`);
  }



}