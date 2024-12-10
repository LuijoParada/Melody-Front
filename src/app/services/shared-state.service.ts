import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  userCount: number = 0; // Variable compartida

  constructor( private auth: AuthService,) { 
  }
  //setea el valor de userCount
  setUserCount(userCount: number): void {
    this.userCount = userCount;
  }
  //incrementa el valor de userCount
  incrementUserCount(): void {
    this.userCount += 1;
  }
  //decrementa el valor de userCount
  decrementUserCount(): void {
    this.userCount -= 1;
  }
  getUserCount(): number {
    return this.userCount;
  }
  
}
