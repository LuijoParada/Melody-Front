import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../../misc/avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AvatarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}
  
}
