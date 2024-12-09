import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia esto si tu URL es diferente 

  constructor(private http: HttpClient) { }

  allUsers(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/userlist/${userId}`);
  }
  alladmins(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/adminlist/${userId}`);
  }

}
