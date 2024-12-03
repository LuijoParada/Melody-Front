import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  favorites: any[] = [];
  userId: number = 32; // Aquí puedes setear el ID estático o dinámicamente

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites(this.userId).subscribe(
      (data) => {
        this.favorites = data;
      },
      (error) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }

  deleteFavorite(id: number): void {
    // Implementar eliminación si es necesario
    console.log('Delete favorite with id:', id);
  }
}