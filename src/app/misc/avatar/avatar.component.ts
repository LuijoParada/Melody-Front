import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  isDropdownVisible: boolean = false;
  userName: string | null = null; // Esto puede venir de un servicio
  userEmail: string | null = null;
  admin: boolean = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  constructor(public authService: AuthService, public route: Router) {
    this.userName = authService.getUser()?.name;
    this.userEmail = authService.getUser()?.email;
    this.admin = authService.getUserRole() === 'admin' || authService.getUserRole() === 'master';
  }


  async onLogout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Error en el logout:', error);
    } 
  }
}

