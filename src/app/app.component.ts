import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MusictopartitureComponent } from './components/musictopartiture/musictopartiture.component';
import { LearnpathComponent } from './components/learnpath/learnpath.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChallengesComponent,
    FooterComponent, 
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MusictopartitureComponent,
    LearnpathComponent,
    NotfoundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: '../output.css'
})
export class AppComponent implements OnInit{
  
  ngOnInit() {
  //   // Si no existe la cookie de CSRF, la obtenemos
  //   if (!this.getCookie('XSRF-TOKEN')) {
  //     axios.get('http://localhost:8000/sanctum/csrf-cookie',{
  //       withCredentials: true
  //     }).then(response => {
        
  //       console.log('Cookie CSRF obtenida:', response);
  //     }).catch(error => {
  //       console.error('Error obteniendo la cookie CSRF:', error);
  //     });
  //   }
  // }
  // Función para obtener una cookie por su nombre
  // getCookie(name: string): string | null {
  //   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  //   if (match) return match[2];
  //   return null;
   }
}
