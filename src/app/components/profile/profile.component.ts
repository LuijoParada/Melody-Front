import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios from 'axios';
import { SharedStateService } from '../../services/shared-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  favorites: any[] = [];
  userId: number = NaN ; // Aquí puedes setear el ID estático o dinámicamente
  userName: string | null = null; // Esto puede venir de un servicio
  userEmail: string | null = null;
  public userCount: any | null = null;
  modal: boolean = false;

  constructor(private favoritesService: FavoritesService, private auth: AuthService, private sanitizer: DomSanitizer, private sharedState: SharedStateService) {
    this.userName = this.auth.getUser().name;
    this.userEmail = this.auth.getUser().email;
    this.userCount = this.sharedState.setUserCount(this.auth.getUser().numberOfFavorites);
  }


  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.userId = this.auth.getUser().id;
    this.favoritesService.getFavorites(this.userId).subscribe(
      (data) => {
        this.favorites = data;
        console.log('Favorites:', this.favorites);
      },
      (error) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }
  toggleModal(): void {
    this.modal = !this.modal;
  }
  deleteFavorite(id: number): void {
    axios.delete(`http://localhost:8000/api/favorite/delete/${id}`).then(//se usa el id del favorito para eliminarlo
            (response) => {
        console.log('Favorite deleted:', response);
        this.loadFavorites();
        //actualizar la cantidad de favoritos, cambiando el valor en la cookie del local storage
        this.userCount = this.userCount - 1;

      },
      (error) => {
        console.error('Error deleting favorite:', error);
      }
    );
  }

  downloadFile(fileName: string) {
    const url = `'http://localhost:8000/public/favorites/${fileName}`; // Ajusta esta ruta según tu backend
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // El nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  downLoadAudioFile(fileName: string) {
    const url = `'http://localhost:8000/public/favorites/${fileName}`; // Ajusta esta ruta según tu backend
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // El nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}